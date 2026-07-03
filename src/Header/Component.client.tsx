'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const { locale } = useParams()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    setMobileOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const toggleMobile = useCallback(() => setMobileOpen((prev) => !prev), [])

  const isDark = theme === 'dark'

  return (
    <>
      {/* Mobile menu — rendered before header so header bar stays on top */}
      <div
        className={`
          lg:hidden fixed inset-0 z-40
          transition-all duration-300 ease-in-out
          ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
        style={{
          backgroundColor: 'rgba(237, 231, 228, 0.75)',
          backdropFilter: 'saturate(180%) blur(24px)',
          WebkitBackdropFilter: 'saturate(180%) blur(24px)',
        }}
      >
        <div
          className={`
            px-6 pt-28 pb-10 h-full flex flex-col
            transition-transform duration-300 ease-in-out
            ${mobileOpen ? 'translate-y-0' : '-translate-y-4'}
          `}
        >
          <HeaderNav data={data} mobile onLinkClick={() => setMobileOpen(false)} />
        </div>
      </div>

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled && !mobileOpen
            ? 'bg-[rgba(253,253,253,0.5)] backdrop-blur-[18px] shadow-sm'
            : 'bg-transparent'
        } ${isDark && !scrolled ? 'text-white' : 'text-foreground'}`}
      >
        <div className="w-full px-4 md:px-8 lg:px-10">
          <div className="flex items-center justify-between h-20 lg:h-24 relative">
            {/* Logo */}
            <Link href={`/${locale}`} className="shrink-0">
              <Logo loading="eager" priority="high" />
            </Link>

            {/* Desktop nav — centered */}
            <div className="hidden lg:flex absolute inset-x-0 justify-center pointer-events-none">
              <div className="pointer-events-auto">
                <HeaderNav data={data} />
              </div>
            </div>

            {/* Desktop CTA buttons — right aligned */}
            <HeaderNav data={data} ctaOnly />

            {/* Mobile hamburger */}
            <button
              onClick={toggleMobile}
              className="lg:hidden p-2"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <Image src="/hamburger_icon.svg" alt="" width={40} height={12} />
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
