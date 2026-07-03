'use client'

import React, { useState, useCallback } from 'react'
import Image from '@/components/NextImage'

import type { Media } from '@/payload-types'
import { getClientSideURL } from '@/utilities/getURL'
import { renderText } from '@/utilities/renderText'

type Props = {
  detailsTitle: string
  detailsDescription?: string | null
  address?: string | null
  phone?: string | null
  email?: string | null
  image?: Media | string | null
  formTitle?: string | null
  submitButtonText?: string | null
  successTitle?: string | null
  successMessage?: string | null
}

const inputClasses =
  'w-full px-5 py-3 rounded-full bg-white text-sm text-[#32312E] placeholder-[#32312E]/40 outline-none focus:ring-2 focus:ring-[#BC8D6C]/40 transition-shadow'

const Modal: React.FC<{
  open: boolean
  onClose: () => void
  title: string
  message: string
  isError?: boolean
}> = ({ open, onClose, title, message, isError }) => {
  if (!open) return null

  return (
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
    </div>
  )
}

export const ContactBlockComponent: React.FC<Props> = ({
  detailsTitle,
  detailsDescription,
  address,
  phone,
  email,
  image,
  formTitle,
  submitButtonText,
  successTitle,
  successMessage,
}) => {
  const img = typeof image === 'object' && image ? image : null
  const [submitting, setSubmitting] = useState(false)
  const [modal, setModal] = useState<{ open: boolean; isError: boolean }>({ open: false, isError: false })

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    const form = e.currentTarget
    const data = {
      firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
      lastName: (form.elements.namedItem('lastName') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch(`${getClientSideURL()}/api/contact-submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Submission failed')

      setModal({ open: true, isError: false })
      form.reset()
    } catch {
      setModal({ open: true, isError: true })
    } finally {
      setSubmitting(false)
    }
  }, [])

  return (
    <div className="container">
      {/* Contact details + image row */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mb-4">
        {/* Contact details card */}
        <div className="bg-[#F9F2EF] rounded-2xl p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2
                className="text-2xl md:text-3xl text-[#32312E] mb-4"
                style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 500 }}
              >
                {renderText(detailsTitle)}
              </h2>
              {detailsDescription && (
                <p className="text-sm text-[#32312E]/70 leading-relaxed">{renderText(detailsDescription)}</p>
              )}
            </div>

            <div className="flex flex-col gap-5">
              {address && (
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#BC8D6C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <p className="text-sm text-[#32312E] leading-relaxed whitespace-pre-line">{address}</p>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#BC8D6C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-sm text-[#32312E] hover:opacity-70 transition-opacity">
                    {phone}
                  </a>
                </div>
              )}
              {email && (
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="#BC8D6C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <a href={`mailto:${email}`} className="text-sm text-[#32312E] hover:opacity-70 transition-opacity">
                    {email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Image card */}
        {img?.url && (
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src={img.url}
              alt={img.alt || ''}
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
        )}
      </div>

      {/* Contact form card */}
      <div className="bg-[#F9F2EF] rounded-2xl p-6 md:p-10">
        <form onSubmit={handleSubmit}>
          {formTitle && (
            <h3
              className="text-2xl md:text-3xl text-[#32312E] mb-8"
              style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 500 }}
            >
              {renderText(formTitle)}
            </h3>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              name="firstName"
              type="text"
              placeholder="First name"
              required
              className={inputClasses}
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last name"
              required
              className={inputClasses}
            />
            <input
              name="email"
              type="email"
              placeholder="Email address"
              required
              className={inputClasses}
            />
          </div>

          <div className="mb-6">
            <textarea
              name="message"
              placeholder="Your message"
              rows={5}
              className="w-full px-5 py-4 rounded-2xl bg-white text-sm text-[#32312E] placeholder-[#32312E]/40 outline-none focus:ring-2 focus:ring-[#BC8D6C]/40 transition-shadow resize-none"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium border-2 border-[#32312E] text-[#32312E] hover:opacity-70 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? 'Sending...' : submitButtonText || 'Send a message'}
            </button>
          </div>
        </form>
      </div>

      <Modal
        open={modal.open && !modal.isError}
        onClose={() => setModal({ open: false, isError: false })}
        title={successTitle || 'Thank you!'}
        message={successMessage || "Your message has been received. We'll be in touch shortly."}
      />
      <Modal
        open={modal.open && modal.isError}
        onClose={() => setModal({ open: false, isError: false })}
        title="Something went wrong"
        message="There was an error sending your message. Please try again."
        isError
      />
    </div>
  )
}
