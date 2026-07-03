'use client'

import React, { useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { getClientSideURL } from '@/utilities/getURL'

const Modal: React.FC<{
  open: boolean
  onClose: () => void
  title: string
  message: string
  isError?: boolean
}> = ({ open, onClose, title, message, isError }) => {
  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-8 max-w-md w-full text-center">
        <div
          className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${isError ? 'bg-red-100' : 'bg-[#BC8D6C]/10'}`}
        >
          {isError ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#BC8D6C" strokeWidth="2" strokeLinecap="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          )}
        </div>
        <h3
          className="text-xl text-[#32312E] mb-2"
          style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 500 }}
        >
          {title}
        </h3>
        <p className="text-sm text-[#32312E]/70 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="inline-flex items-center justify-center rounded-full px-8 py-2.5 text-sm font-medium border-2 border-[#32312E] text-[#32312E] hover:opacity-70 transition-opacity"
        >
          Close
        </button>
      </div>
    </div>,
    document.body,
  )
}

type Props = {
  placeholder: string
  successMessage: string
  errorMessage: string
  className?: string
  inputClassName?: string
  buttonClassName?: string
}

export const NewsletterForm: React.FC<Props> = ({
  placeholder,
  successMessage,
  errorMessage,
  className,
  inputClassName,
  buttonClassName,
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [modal, setModal] = useState<{ open: boolean; isError: boolean; isDuplicate: boolean }>({ open: false, isError: false, isDuplicate: false })

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setSubmitting(true)

      const form = e.currentTarget
      const email = (form.elements.namedItem('email') as HTMLInputElement).value

      try {
        const res = await fetch(`${getClientSideURL()}/api/newsletter-submissions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })

        if (!res.ok) {
          const data = await res.json().catch(() => null)
          const isDuplicate = data?.errors?.some((err: { message?: string }) =>
            err.message?.toLowerCase().includes('unique'),
          ) || res.status === 400
          throw new Error(isDuplicate ? 'duplicate' : 'failed')
        }

        setModal({ open: true, isError: false, isDuplicate: false })
        form.reset()
      } catch (err) {
        const isDuplicate = err instanceof Error && err.message === 'duplicate'
        setModal({ open: true, isError: true, isDuplicate })
      } finally {
        setSubmitting(false)
      }
    },
    [],
  )

  return (
    <>
      <form onSubmit={handleSubmit} className={className}>
        <input
          name="email"
          type="email"
          required
          placeholder={placeholder}
          className={inputClassName}
        />
        <button
          type="submit"
          disabled={submitting}
          className={buttonClassName}
        >
          {submitting ? '...' : 'Subscribe'}
        </button>
      </form>

      <Modal
        open={modal.open && !modal.isError}
        onClose={() => setModal({ open: false, isError: false, isDuplicate: false })}
        title="Thank you!"
        message={successMessage}
      />
      <Modal
        open={modal.open && modal.isError}
        onClose={() => setModal({ open: false, isError: false, isDuplicate: false })}
        title={modal.isDuplicate ? 'Already subscribed' : 'Oops!'}
        message={modal.isDuplicate ? 'This email is already subscribed to our newsletter.' : errorMessage}
        isError
      />
    </>
  )
}
