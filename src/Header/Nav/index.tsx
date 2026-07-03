'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

interface NavProps {
  data: HeaderType
  mobile?: boolean
  ctaOnly?: boolean
  onLinkClick?: () => void
}

export const HeaderNav: React.FC<NavProps> = ({ data, mobile, ctaOnly, onLinkClick }) => {
  const navItems = data?.navItems || []
  const ctaButtons = data?.ctaButtons || []

  if (mobile) {
    return <MobileNav navItems={navItems} ctaButtons={ctaButtons} onLinkClick={onLinkClick} />
  }

  if (ctaOnly) {
    return ctaButtons.length > 0 ? (
      <div className="hidden lg:flex items-center gap-3">
        {ctaButtons.map(({ link }, i) => {
          const isOutline = link.appearance === 'outline'
          return (
            <CMSLink
              key={i}
              {...link}
              appearance="inline"
              className={`inline-flex items-center justify-center rounded-full px-7 py-2.5 text-sm font-medium tracking-wide whitespace-nowrap transition-colors ${
                isOutline
                  ? 'border-2 border-[#32312E] text-[#32312E] hover:opacity-70 max-[1225px]:hidden'
                  : 'bg-[linear-gradient(270deg,#32312E_0%,#745D4D_20.52%,#BC8D6C_100%)] text-white hover:opacity-90'
              }`}
            />
          )
        })}
      </div>
    ) : null
  }

  return (
    <nav className="hidden lg:flex items-center gap-8">
      {navItems.map((item, i) => {
        const hasChildren = item.children && item.children.length > 0

        if (hasChildren) {
          return <DesktopDropdown key={i} item={item} />
        }

        return (
          <CMSLink
            key={i}
            {...item.link}
            appearance="inline"
            className="text-sm font-normal tracking-widest uppercase text-[#313131] hover:opacity-70 transition-opacity"
          />
        )
      })}
    </nav>
  )
}

/* Desktop dropdown item */
const DesktopDropdown: React.FC<{
  item: NonNullable<HeaderType['navItems']>[number]
}> = ({ item }) => {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="text-sm font-normal tracking-widest uppercase text-[#313131] hover:opacity-70 transition-opacity flex items-center gap-1"
        onClick={() => setOpen((prev) => !prev)}
      >
        {item.link.label}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className={`
          absolute top-full left-1/2 -translate-x-1/2 pt-3
          transition-all duration-200
          ${open ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'}
        `}
      >
        <div
          className="rounded-2xl py-3 px-2 min-w-[200px]"
          style={{
            backgroundColor: 'rgba(253, 253, 253, 0.9)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          }}
        >
          {item.children!.map(({ link }, j) => (
            <CMSLink
              key={j}
              {...link}
              appearance="inline"
              className="block px-4 py-2.5 text-sm text-[#32312E] hover:bg-[#f0ebe6] rounded-lg transition-colors whitespace-nowrap"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* Mobile nav with accordion */
const MobileNav: React.FC<{
  navItems: NonNullable<HeaderType['navItems']>
  ctaButtons: NonNullable<HeaderType['ctaButtons']>
  onLinkClick?: () => void
}> = ({ navItems, ctaButtons, onLinkClick }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <nav className="flex flex-col h-full">
      <div className="flex flex-col gap-1">
        {navItems.map((item, i) => {
          const hasChildren = item.children && item.children.length > 0
          const isExpanded = expandedIndex === i

          if (hasChildren) {
            return (
              <div key={i} className="border-b border-[#d9d4cd]">
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : i)}
                  className="flex items-center justify-between w-full py-3 text-base font-normal tracking-[0.15em] uppercase text-[#32312E]"
                >
                  {item.link.label}
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 10 6"
                    fill="none"
                    className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                  >
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isExpanded ? 'max-h-96 pb-2' : 'max-h-0'
                  }`}
                >
                  {item.children!.map(({ link }, j) => (
                    <div key={j} onClick={onLinkClick}>
                      <CMSLink
                        {...link}
                        appearance="inline"
                        className="block py-2.5 pl-4 text-sm text-[#5a5751] hover:text-[#32312E] transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          }

          return (
            <div key={i} onClick={onLinkClick}>
              <CMSLink
                {...item.link}
                appearance="inline"
                className="block py-3 text-base font-normal tracking-[0.15em] uppercase text-[#32312E] border-b border-[#d9d4cd]"
              />
            </div>
          )
        })}
      </div>
      {ctaButtons.length > 0 && (
        <div className="flex flex-col gap-3 mt-8">
          {ctaButtons.map(({ link }, i) => {
            const isOutline = link.appearance === 'outline'
            return (
              <div key={i} onClick={onLinkClick}>
                <CMSLink
                  {...link}
                  appearance="inline"
                  className={`inline-flex w-full items-center justify-center rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-colors ${
                    isOutline
                      ? 'border border-[#32312E] text-[#32312E]'
                      : 'bg-[linear-gradient(270deg,#32312E_0%,#745D4D_20.52%,#BC8D6C_100%)] text-white'
                  }`}
                />
              </div>
            )
          })}
        </div>
      )}
    </nav>
  )
}
