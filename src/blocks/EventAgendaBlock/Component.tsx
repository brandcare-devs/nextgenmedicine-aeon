'use client'

import React, { useRef, useState } from 'react'
import type { EventAgendaBlockType, Media } from '@/payload-types'
import RichText from '@/components/RichText'
import { renderText } from '@/utilities/renderText'

type Session = NonNullable<NonNullable<EventAgendaBlockType['days']>[number]['sessions']>[number]
type Track = NonNullable<NonNullable<EventAgendaBlockType['days']>[number]['tracks']>[number]

type Props = EventAgendaBlockType & {
  className?: string
}

const SessionRow: React.FC<{ session: Session }> = ({ session }) => {
  if (session.isTheme) {
    if (!session.themeText) return null
    return (
      <p
        className="text-[#32312E] text-base lg:text-[1.4rem] tracking-wide uppercase mt-6 text-right ml-auto lg:max-w-[50%]"
        style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 500 }}
      >
        {renderText(session.themeText)}
      </p>
    )
  }

  if (session.isBreak) {
    return (
      <div className="flex items-center gap-4 lg:gap-8 py-3">
        <div className="w-[140px] lg:w-[180px] shrink-0">
          {session.showTime && session.timeStart && session.timeEnd && (
            <span className="text-[#9E8C80] font-medium text-xs lg:text-sm whitespace-nowrap">
              {session.timeStart} – {session.timeEnd}
            </span>
          )}
        </div>
        <div className="flex-1">
          <div className="bg-[#F0EBE6] rounded-xl px-5 py-3.5 agenda-richtext agenda-richtext--break">
            {session.content && (
              <RichText data={session.content} enableGutter={false} enableProse={false} />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start my-3">
      {/* Time pill — self-contained rounded pill */}
      <div
        className="shrink-0 w-[130px] lg:w-[200px] bg-[#F9F2EF] flex items-center justify-center py-3"
        style={{ borderRadius: '16px 0 0 16px' }}
      >
        <span className="text-[#BC8D6C] font-medium text-xs lg:text-sm whitespace-nowrap">
          {session.timeStart} – {session.timeEnd}
        </span>
      </div>
      {/* Content area — flat top-left, rounded other corners */}
      <div
        className="flex-1 min-w-0 bg-[#F9F2EF] px-5 lg:px-7 py-5 agenda-richtext"
        style={{ borderRadius: '0 16px 16px 16px' }}
      >
        {session.content && (
          <RichText data={session.content} enableGutter={false} enableProse={false} />
        )}
        {session.moderator && (
          <p className="text-[#9E8C80] text-xs lg:text-sm mt-2 font-medium">
            {renderText(session.moderator)}
          </p>
        )}
      </div>
    </div>
  )
}

const TrackSection: React.FC<{ track: Track; index: number }> = ({ track, index }) => {
  const isEven = index % 2 === 0

  return (
    <div className="mt-8">
      <div
        className={`rounded-2xl px-6 py-6 lg:px-8 lg:py-8 ${
          isEven ? 'bg-[#9E8C80]' : 'bg-[#9E8C80]'
        }`}
      >
        <h2
          className="text-white text-3xl lg:text-5xl leading-tight mb-2"
          style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 200 }}
        >
          {renderText(track.name)}
        </h2>
        <h3
          className="text-white text-xl lg:text-[1.75rem] leading-snug"
          style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 500 }}
        >
          {renderText(track.title)}
        </h3>
        {track.moderator && (
          <p
            className="text-white text-base mt-2"
            style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 500 }}
          >{renderText(track.moderator)}</p>
        )}
      </div>

      <div className="mt-4">
        {track.sessions?.map((session, j) => (
          <SessionRow key={j} session={session} />
        ))}
      </div>
    </div>
  )
}

const DayTabs: React.FC<{
  days: NonNullable<EventAgendaBlockType['days']>
  activeIndex: number
  onChange: (i: number) => void
}> = ({ days, activeIndex, onChange }) => (
  <div className="flex items-center justify-center gap-2 lg:gap-4 flex-wrap">
    {days.map((day, i) => (
      <button
        key={i}
        onClick={() => onChange(i)}
        className={`rounded-full px-6 lg:px-14 py-2.5 text-sm font-medium tracking-wide transition-all whitespace-nowrap ${
          i === activeIndex
            ? 'bg-[#BC8D6C] text-white'
            : 'bg-white text-[#BC8D6C] hover:opacity-70'
        }`}
      >
        {day.label}
      </button>
    ))}
  </div>
)

export const EventAgendaBlockComponent: React.FC<Props> = ({ days, pdfDownload, pdfButtonLabel, subtitleLeft, subtitleRight }) => {
  const [activeDay, setActiveDay] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)

  const handleDayChange = (i: number) => {
    setActiveDay(i)
    const el = rootRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }

  if (!days || days.length === 0) return null

  const day = days[activeDay]
  if (!day) return null

  const pdf = typeof pdfDownload === 'object' ? (pdfDownload as Media) : null

  return (
    <>
      <style>{`
        .agenda-richtext h2,
        .agenda-richtext h3,
        .agenda-richtext h4 {
          font-family: var(--font-roboto, Roboto, sans-serif);
          font-weight: 300;
          color: #32312E;
          line-height: 1.3;
        }
        .agenda-richtext h2 {
          font-size: 1.35rem;
        }
        .agenda-richtext h3 {
          font-size: 1.1rem;
        }
        .agenda-richtext h4 {
          font-size: 0.95rem;
        }
        .agenda-richtext h2 strong,
        .agenda-richtext h3 strong,
        .agenda-richtext h4 strong {
          font-weight: 500;
        }
        @media (min-width: 1024px) {
          .agenda-richtext h2 {
            font-size: 1.5rem;
          }
        }
        .agenda-richtext p {
          font-size: 0.8rem;
          color: rgba(50, 49, 46, 0.65);
          line-height: 1.5;
          margin: 0;
        }
        .agenda-richtext p strong {
          color: #32312E;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          font-size: 0.75rem;
        }
        .agenda-richtext ul {
          margin: 0.25rem 0 0 0;
          padding-left: 1rem;
          font-size: 0.8rem;
          color: rgba(50, 49, 46, 0.65);
        }
        .agenda-richtext--break p {
          font-size: 0.875rem;
          color: #32312E;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        @media (min-width: 1024px) {
          .agenda-richtext h3 {
            font-size: 1.25rem;
          }
          .agenda-richtext h4 {
            font-size: 1.05rem;
          }
        }
      `}</style>
      <div ref={rootRef} className="container scroll-mt-24">
        {/* Subtitles + PDF download */}
        {(subtitleLeft || subtitleRight) && (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-10 items-start">
            {subtitleLeft && (
              <p
                className="flex-1 text-[#32312E] text-xl lg:text-2xl leading-snug"
                style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 300 }}
              >
                {renderText(subtitleLeft)}
              </p>
            )}
            {subtitleRight && (
              <p className="flex-1 text-[#32312E]/80 text-sm lg:text-base leading-relaxed">
                {renderText(subtitleRight)}
              </p>
            )}
          </div>
        )}

        <DayTabs days={days} activeIndex={activeDay} onChange={handleDayChange} />

        {/* Day header card */}
        <div className="mt-8 lg:mt-10 bg-[#F9F2EF] rounded-2xl px-6 py-6 lg:px-10 lg:py-8 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-24">
          <div className="shrink-0">
            <h2 className="text-[#BC8D6C] text-3xl lg:text-4xl font-medium">{day.label}</h2>
            <p className="text-[#32312E]/50 text-sm mt-0.5">{day.date}</p>
          </div>
          <div>
            <h3 className="text-[#32312E] text-2xl lg:text-[2.25rem] leading-[1.2] font-medium">
              {day.title ? renderText(day.title) : null}
            </h3>
            {day.moderator && (
              <p className="text-[#9E8C80] text-sm lg:text-base mt-2 font-medium">
                {renderText(day.moderator)}
              </p>
            )}
          </div>
        </div>

        {day.theme && (
          <p
            className="text-[#32312E] text-base lg:text-[1.4rem] tracking-wide uppercase mt-6 text-right ml-auto lg:max-w-[50%]"
            style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 500 }}
          >
            {renderText(day.theme)}
          </p>
        )}

        <div className="mt-6">
          {day.sessions?.map((session, i) => (
            <SessionRow key={i} session={session} />
          ))}
        </div>

        {day.tracks?.map((track, i) => (
          <TrackSection key={i} track={track} index={i} />
        ))}

        <div className="mt-12 flex flex-col items-center gap-6">
          <DayTabs days={days} activeIndex={activeDay} onChange={handleDayChange} />
          {pdf?.url && (
            <a
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide border-2 border-[#32312E] text-[#32312E] hover:opacity-70 transition-opacity"
            >
              {pdfButtonLabel || 'Download Full Agenda (PDF)'}
            </a>
          )}
        </div>
      </div>
    </>
  )
}
