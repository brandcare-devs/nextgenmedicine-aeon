'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { ProgramBlock as ProgramBlockProps, Media } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { renderText } from '@/utilities/renderText'

type Props = ProgramBlockProps & {
  className?: string
}

const CARD_BG = 'rgba(255,255,255,0.55)'
const CTA_CLASS = 'inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-[#32312E] text-[#32312E] text-sm font-medium hover:opacity-70 transition-opacity'

export const ProgramBlockComponent: React.FC<Props> = ({
  title,
  description,
  backgroundImage,
  tabs,
  links,
}) => {
  const [activeTab, setActiveTab] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!tabs || tabs.length === 0) return null

  const currentTab = tabs[activeTab]
  const bgImage = backgroundImage as Media | undefined

  const goNext = () => setActiveTab((prev) => (prev + 1) % tabs.length)
  const goPrev = () => setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length)

  return (
    <section ref={sectionRef}>
      {/* Header */}
      <div
        className={`
          container flex flex-col items-center text-center lg:text-left lg:items-start lg:flex-row lg:justify-between gap-4 lg:gap-8 mb-8 lg:mb-12
          transition-all duration-300
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}
      >
        <h2
          className="shrink-0"
          style={{
            color: '#BC8D6C',
            fontWeight: 500,
            fontSize: '40px',
            lineHeight: '105%',
            letterSpacing: '-0.04em',
          }}
        >
          {title ? renderText(title) : null}
        </h2>
        {description && (
          <p className="text-sm md:text-base text-[#5a5751] max-w-xl leading-relaxed">
            {renderText(description)}
          </p>
        )}
        {/* Desktop top CTA — first link only */}
        {links && links.length > 0 && (
          <div className="hidden lg:block shrink-0">
            <CMSLink
              {...links[0]!.link}
              appearance="inline"
              className={CTA_CLASS}
            />
          </div>
        )}
      </div>

      {/* Full-bleed background image area */}
      <div
        className={`
          relative w-full overflow-hidden
          transition-all duration-300 delay-200
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        {/* Background image */}
        {bgImage?.url && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url("${bgImage.url}")` }}
          >
            <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(to bottom, #EDE7E4, transparent)' }} />
            <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(to top, #EDE7E4, transparent)' }} />
          </div>
        )}

        {/* Fallback warm bg */}
        {!bgImage?.url && <div className="absolute inset-0 bg-[#f0ebe6]" />}

        {/* Content layer */}
        <div className="relative z-10 container">
          {/* Desktop layout */}
          <div className="hidden md:flex flex-col">
            {/* Tabs + card wrapper — centered with arrows on sides */}
            <div className="flex items-center">
              {/* Left arrow */}
              <button
                onClick={goPrev}
                aria-label="Previous day"
                className="shrink-0 hover:opacity-70 transition-opacity mr-4"
              >
                <img
                  src="/next_circle_filled_icon.svg"
                  alt=""
                  className="w-12 h-12 rotate-180"
                />
              </button>

              {/* Tabs + card column */}
              <div className="flex-1 flex flex-col py-8">
                {/* Tab row */}
                <div className="flex items-end pl-8">
                  {tabs.map((tab, index) => {
                    const isActive = index === activeTab
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        style={{
                          height: '52px',
                          padding: '0 40px',
                          fontSize: '20px',
                          fontWeight: isActive ? 500 : 400,
                          color: isActive ? '#BC8D6C' : '#9F8E82',
                          background: isActive ? CARD_BG : 'transparent',
                          borderRadius: '16px 16px 0 0',
                          letterSpacing: '-0.02em',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          border: 'none',
                          transition: 'color 0.2s, background 0.2s',
                        }}
                      >
                        {tab.label}
                      </button>
                    )
                  })}
                </div>

                {/* Card — fills remaining height */}
                <div
                  className="rounded-2xl"
                  style={{
                    backgroundColor: CARD_BG,
                    padding: '40px',
                  }}
                >
                  <div className="flex gap-12">
                    {/* Theme title */}
                    {currentTab?.themeTitle && (
                      <div className="w-1/3 flex items-start">
                        <h3
                          style={{
                            fontWeight: 300,
                            fontSize: 'clamp(20px, 2.5vw, 28px)',
                            lineHeight: '130%',
                            color: '#32312E',
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {renderText(currentTab.themeTitle)}
                        </h3>
                      </div>
                    )}

                    {/* Numbered items */}
                    {currentTab?.items && currentTab.items.length > 0 && (
                      <div className="flex-1 flex flex-col justify-start gap-5">
                        {currentTab.items.map((item, index) => (
                          <div key={index} className="flex gap-4 items-start">
                            <span
                              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                              style={{ backgroundColor: '#9F8E82' }}
                            >
                              {index + 1}
                            </span>
                            <p
                              className="text-sm leading-relaxed pt-1"
                              style={{ color: '#32312E', fontWeight: 400 }}
                            >
                              {item.text ? renderText(item.text) : null}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right arrow */}
              <button
                onClick={goNext}
                aria-label="Next day"
                className="shrink-0 hover:opacity-70 transition-opacity ml-4"
              >
                <img
                  src="/next_circle_filled_icon.svg"
                  alt=""
                  className="w-12 h-12"
                />
              </button>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="flex md:hidden flex-col py-6">
            {/* Day header with arrows */}
            <div className="flex items-center justify-between mb-4 px-2">
              <button onClick={goPrev} aria-label="Previous day" className="shrink-0">
                <img src="/next_circle_filled_icon.svg" alt="" className="w-10 h-10 rotate-180" />
              </button>
              <h3
                style={{
                  color: '#BC8D6C',
                  fontWeight: 500,
                  fontSize: '28px',
                  lineHeight: '105%',
                  letterSpacing: '-0.02em',
                }}
              >
                {currentTab?.label ? renderText(currentTab.label) : null}
              </h3>
              <button onClick={goNext} aria-label="Next day" className="shrink-0">
                <img src="/next_circle_filled_icon.svg" alt="" className="w-10 h-10" />
              </button>
            </div>

            {/* Card */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: CARD_BG }}
            >
              {currentTab?.themeTitle && (
                <h3
                  className="text-center mb-6"
                  style={{
                    fontWeight: 300,
                    fontSize: '22px',
                    lineHeight: '130%',
                    color: '#32312E',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {renderText(currentTab.themeTitle)}
                </h3>
              )}

              {currentTab?.items && currentTab.items.length > 0 && (
                <div className="space-y-5">
                  {currentTab.items.map((item, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <span
                        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                        style={{ backgroundColor: '#9F8E82' }}
                      >
                        {index + 1}
                      </span>
                      <p
                        className="text-sm leading-relaxed pt-1"
                        style={{ color: '#32312E', fontWeight: 400 }}
                      >
                        {item.text ? renderText(item.text) : null}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTAs */}
      {links && links.length > 0 && (
        <div
          className={`
            container flex flex-col md:flex-row items-center justify-center gap-4 mt-10
            transition-all duration-300 delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          {links.map(({ link }, i) => (
            <CMSLink
              key={i}
              {...link}
              appearance="inline"
              className={`${CTA_CLASS} w-full md:w-auto`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
