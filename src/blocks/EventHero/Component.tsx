import React from 'react'
import Image from '@/components/NextImage'

import type { EventHeroBlock as EventHeroBlockType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Countdown } from './Countdown'
import type { Media as MediaType } from '@/payload-types'

function getImageUrl(media: MediaType): string {
  return media.url || ''
}

type Props = EventHeroBlockType & {
  className?: string
}

export const EventHeroBlock: React.FC<Props> = (props) => {
  const {
    backgroundVideo,
    poweredByLabel,
    poweredByLogo,
    eventDate,
    venue,
    showCountdown,
    countdownDate,
    countdownLabel,
    ctaLink,
  } = props

  const sponsorLogo = typeof poweredByLogo === 'object' ? poweredByLogo : null
  const videoMedia = typeof backgroundVideo === 'object' ? backgroundVideo : null
  const videoUrl = videoMedia?.url || ''
  const videoMimeType = videoMedia?.mimeType || 'video/mp4'

  return (
    <section className="container">
      <div className="relative mx-auto">
        {/* Video container */}
        <div
          className="relative rounded-[clamp(12px,2vw,30px)] overflow-hidden md:aspect-[1440/644] aspect-[4/3]"
        >
          {videoUrl && (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={videoUrl} type={videoMimeType} />
            </video>
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(360deg, #77604F 0%, #9F8E82 33.68%, rgba(115, 106, 102, 0) 75.32%), linear-gradient(0deg, rgba(190, 154, 125, 0.1), rgba(190, 154, 125, 0.1)), linear-gradient(0deg, rgba(188, 141, 108, 0.29), rgba(188, 141, 108, 0.29))',
              backgroundBlendMode: 'normal, color, color',
            }}
          />

          {/* Logo — mobile: centered, md: smaller, lg+: full size */}
          <div
            className="absolute inset-0 flex items-center justify-center md:justify-start px-6 md:px-0 lg:pl-14"
            style={{ paddingBottom: '18%' }}
          >
            <Image
              src="/ngm_logo.svg"
              alt="Next Generation Medicine"
              width={560}
              height={170}
              className="brightness-0 invert w-[80%] md:w-[340px] lg:w-[560px]"
              style={{ height: 'auto', paddingLeft: undefined }}
              priority
            />
          </div>

          {/* Date & venue — bottom-right on mobile & md, bottom-left offset on lg+ */}
          <div
            className="absolute right-4 bottom-4 text-right md:right-6 md:bottom-6 lg:right-auto lg:text-left lg:max-w-[45%] lg:left-[7rem] lg:bottom-[3rem]"
          >
            <p className="text-white font-medium leading-[1.05] tracking-[-0.04em] text-lg md:text-xl lg:text-[1.75rem]">
              {eventDate}
            </p>
            <div className="flex items-center gap-2 mt-2 justify-end lg:justify-start">
              <svg
                viewBox="0 0 27 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-auto shrink-0 w-[14px] lg:w-[18px]"
              >
                <path
                  d="M13.435 0C6.01 0 0 6.01 0 13.435C0 23.51 13.435 32.84 13.435 32.84C13.435 32.84 26.87 23.51 26.87 13.435C26.87 6.01 20.86 0 13.435 0ZM13.435 18.23C10.79 18.23 8.64 16.08 8.64 13.435C8.64 10.79 10.79 8.64 13.435 8.64C16.08 8.64 18.23 10.79 18.23 13.435C18.23 16.08 16.08 18.23 13.435 18.23Z"
                  fill="white"
                />
              </svg>
              <span className="text-white font-normal leading-[1.3] text-xs md:text-sm lg:text-base">
                {venue}
              </span>
            </div>
          </div>

          {/* Powered by — md+ only */}
          {sponsorLogo && (
            <div
              className="absolute hidden md:flex items-center gap-2"
              style={{ bottom: '38%', right: '1.5rem' }}
            >
              {poweredByLabel && (
                <span className="text-[#726965] text-[0.875rem] font-normal">
                  {poweredByLabel}
                </span>
              )}
              <Image
                src={getImageUrl(sponsorLogo)}
                alt={sponsorLogo.alt || 'Sponsor'}
                width={113}
                height={30}
                style={{ height: '22px', width: 'auto' }}
              />
            </div>
          )}

        </div>

        {/* Bottom-right cutout — outside overflow-hidden so all 6 corners can be rounded */}
        <div
          className="absolute bottom-0 right-0 z-[1] bg-[#EDE7E4] hidden lg:block pointer-events-none"
          style={{
            width: '51%',
            height: '35.4%',
            borderTopLeftRadius: 'clamp(12px, 2vw, 30px)',
          }}
        >
          {/* Inverse rounded corner — top-right (corner 3) */}
          <svg
            className="absolute block"
            style={{
              top: 'calc(-1 * clamp(12px, 2vw, 30px))',
              right: '-1px',
              width: 'calc(clamp(12px, 2vw, 30px) + 1px)',
              height: 'calc(clamp(12px, 2vw, 30px) + 1px)',
            }}
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 1 0 A 1 1 0 0 1 0 1 L 1 1 Z" fill="#EDE7E4" />
          </svg>
          {/* Inverse rounded corner — bottom-left (corner 5) */}
          <svg
            className="absolute block"
            style={{
              bottom: '-1px',
              left: 'calc(-1 * clamp(12px, 2vw, 30px))',
              width: 'calc(clamp(12px, 2vw, 30px) + 1px)',
              height: 'calc(clamp(12px, 2vw, 30px) + 1px)',
            }}
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 0 0 H 1 V 1 H 0 Z M 0 1 A 1 1 0 0 0 1 0 L 0 0 Z" fill="#EDE7E4" fillRule="evenodd" />
          </svg>
        </div>

        {/* Countdown card — sits in the cutout on lg+ */}
        <div
          className="lg:absolute lg:bottom-0 lg:right-0 lg:z-[2] lg:w-[51%] lg:h-[35.4%] mt-3 lg:mt-0"
        >
          <div
            className="lg:absolute lg:inset-0 flex flex-col lg:pl-[14px]"
            style={{
              paddingTop: '14px',
            }}
          >
            <div
              className="bg-[#F9F2EF] flex-1 flex flex-col justify-center"
              style={{
                borderRadius: '30px',
                padding: '1rem 2rem 1rem 1.5rem',
              }}
            >
              {showCountdown && countdownLabel && (
                <p
                  className="text-[#32312E] font-medium text-center"
                  style={{
                    fontSize: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  {countdownLabel}
                </p>
              )}
              <div className={`flex items-center ${showCountdown ? 'flex-col md:flex-row justify-between gap-4' : 'justify-center'}`}>
                {showCountdown && countdownDate && (
                  <Countdown targetDate={countdownDate} />
                )}
                {ctaLink && (
                  <CMSLink
                    {...ctaLink}
                    appearance="inline"
                    className={`inline-flex items-center justify-center whitespace-nowrap font-medium bg-[linear-gradient(270deg,#32312E_0%,#745D4D_20.52%,#BC8D6C_100%)] text-white hover:opacity-90 transition-opacity rounded-full ${showCountdown ? 'text-[0.875rem] px-6 py-3.5' : 'text-lg px-10 py-5 w-full'}`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
