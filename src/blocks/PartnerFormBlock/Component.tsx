'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { getClientSideURL } from '@/utilities/getURL'
import { renderText } from '@/utilities/renderText'

import { partnerTypeOptions, type PartnerTypeValue } from './options'

type PartnerType = {
  value: PartnerTypeValue
  benefitsTitle: string
  benefitsDescription?: string | null
}

type Props = {
  title: string
  subtitle?: string | null
  descriptionLeft?: string | null
  descriptionRight?: string | null
  formTitle?: string | null
  types: PartnerType[]
  submitButtonText?: string | null
  successTitle?: string | null
  successMessage?: string | null
}

const labelFor = (value: PartnerTypeValue | undefined): string =>
  partnerTypeOptions.find((o) => o.value === value)?.label || ''

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
          {renderText(title)}
        </h3>
        <p className="text-sm text-[#32312E]/70 mb-6">{renderText(message)}</p>
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

export const PartnerFormBlockComponent: React.FC<Props> = ({
  title,
  subtitle,
  descriptionLeft,
  descriptionRight,
  formTitle,
  types,
  submitButtonText,
  successTitle,
  successMessage,
}) => {
  const [selectedTypeId, setSelectedTypeId] = useState<PartnerTypeValue | ''>(
    types?.[0]?.value || '',
  )
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [submitting, setSubmitting] = useState(false)
  const [modal, setModal] = useState<{ open: boolean; isError: boolean }>({ open: false, isError: false })

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const uniqueTypes = types?.filter(
    (t, i, arr) => arr.findIndex((u) => u.value === t.value) === i,
  )

  const activeType = uniqueTypes?.find((t) => t.value === selectedTypeId) || uniqueTypes?.[0]

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setSubmitting(true)

      const form = e.currentTarget
      const data = {
        firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
        lastName: (form.elements.namedItem('lastName') as HTMLInputElement).value,
        email: (form.elements.namedItem('email') as HTMLInputElement).value,
        companyName: (form.elements.namedItem('companyName') as HTMLInputElement).value,
        type: selectedTypeId,
        message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      }

      try {
        const res = await fetch(`${getClientSideURL()}/api/partnership-submissions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        if (!res.ok) throw new Error('Submission failed')

        form.reset()
        setSelectedTypeId(types?.[0]?.value || '')
        window.location.href = 'https://www.next-generationmedicine.com/en/thankyou'
        return
      } catch {
        setModal({ open: true, isError: true })
        setSubmitting(false)
      }
    },
    [selectedTypeId, types],
  )

  return (
    <div className="container">
      {/* Header */}
      <div className="text-center mb-10">
        <h2
          className="text-3xl md:text-4xl text-[#BC8D6C] mb-4"
          style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 500 }}
        >
          {renderText(title)}
        </h2>
        {subtitle && (
          <p className="text-sm text-[#32312E]/80 max-w-xl mx-auto leading-relaxed">{renderText(subtitle)}</p>
        )}
      </div>

      {/* Two-column descriptions */}
      {(descriptionLeft || descriptionRight) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {descriptionLeft && (
            <p className="text-sm text-[#32312E]/80 leading-relaxed">{renderText(descriptionLeft)}</p>
          )}
          {descriptionRight && (
            <p className="text-sm text-[#32312E]/80 leading-relaxed">{renderText(descriptionRight)}</p>
          )}
        </div>
      )}

      {/* Form card */}
      <div className="bg-[#F9F2EF] rounded-2xl p-6 md:p-10">
        <form onSubmit={handleSubmit}>
          {/* Form header row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            {formTitle && (
              <h3
                className="text-2xl md:text-3xl text-[#32312E]"
                style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 500 }}
              >
                {renderText(formTitle)}
              </h3>
            )}
            <div ref={dropdownRef} className="relative min-w-[160px]">
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="w-full px-5 py-3 rounded-full bg-white text-sm text-[#32312E] outline-none focus:ring-2 focus:ring-[#BC8D6C]/40 transition-shadow cursor-pointer text-left flex items-center justify-between gap-2"
              >
                <span>{activeType ? labelFor(activeType.value) : 'Select type'}</span>
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  className={`shrink-0 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                >
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="#32312E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {dropdownOpen && (
                <ul className="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-lg border border-black/5 py-1 z-50 overflow-hidden">
                  {uniqueTypes?.map((t) => {
                    const isSelected = t.value === selectedTypeId
                    return (
                      <li key={t.value}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTypeId(t.value)
                            setDropdownOpen(false)
                          }}
                          className={`w-full text-left px-5 py-2.5 text-sm transition-colors ${
                            isSelected
                              ? 'bg-[#BC8D6C]/10 text-[#32312E] font-medium'
                              : 'text-[#32312E]/80 hover:bg-[#BC8D6C]/5'
                          }`}
                        >
                          {labelFor(t.value)}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Benefits section */}
          {activeType && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {activeType.benefitsTitle && (
                <p className="text-sm font-medium text-[#32312E]">{renderText(activeType.benefitsTitle)}</p>
              )}
              {activeType.benefitsDescription && (
                <p className="text-sm text-[#32312E]/80 leading-relaxed">
                  {renderText(activeType.benefitsDescription)}
                </p>
              )}
            </div>
          )}

          {/* Form fields */}
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

          <div className="mb-4">
            <input
              name="companyName"
              type="text"
              placeholder="Company name"
              required
              className={inputClasses}
            />
          </div>

          <div className="mb-6">
            <textarea
              name="message"
              placeholder="Message or notes"
              rows={5}
              className="w-full px-5 py-4 rounded-2xl bg-white text-sm text-[#32312E] placeholder-[#32312E]/40 outline-none focus:ring-2 focus:ring-[#BC8D6C]/40 transition-shadow resize-none"
            />
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium border-2 border-[#32312E] text-[#32312E] hover:opacity-70 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : renderText(submitButtonText || 'Become a Partner')}
            </button>
          </div>
        </form>
      </div>

      {/* Error modal */}
      <Modal
        open={modal.open && modal.isError}
        onClose={() => setModal({ open: false, isError: false })}
        title="Something went wrong"
        message="There was an error submitting your inquiry. Please try again."
        isError
      />
    </div>
  )
}
