import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { SocialIcon } from './SocialIcon'
import { NewsletterForm } from './NewsletterForm'
import { renderText } from '@/utilities/renderText'

export async function Footer({ locale }: { locale: string }) {
  const footerData = (await getCachedGlobal('footer', 1, locale)()) as Footer

  const navItems = footerData?.navItems || []
  const socialLinks = footerData?.socialLinks || []
  const newsletterHeading = footerData?.newsletterHeading || 'SIGN-UP FOR UPDATES'
  const newsletterPlaceholder = footerData?.newsletterPlaceholder || 'YOUR EMAIL HERE'
  const newsletterSuccessMessage = footerData?.newsletterSuccessMessage || 'Thank you for subscribing!'
  const newsletterErrorMessage = footerData?.newsletterErrorMessage || 'Something went wrong. Please try again.'
  const copyright = footerData?.copyright || '© NGM all right reserved 2023.'

  const LEGAL_LINK_CLASS = 'text-xs font-medium tracking-[0.1em] uppercase text-[#5a5751] hover:opacity-70 transition-opacity'
  const LEGAL_LINK_CLASS_MOBILE = 'text-sm font-medium tracking-[0.1em] uppercase text-[#5a5751]'

  return (
    <footer className="mt-auto">
      {/* Image wrapper */}
      <div>
        <img
          src="/footer_backdrop.png"
          alt=""
          className="w-full h-auto pointer-events-none select-none blur-[4px]"
        />

        {/* Frosted glass div — pulled up over the image */}
        <div
          className="relative -mt-[13vw] pt-[4vw] bg-[#EDE7E4]/25 backdrop-blur-md"
          style={{ WebkitBackdropFilter: 'blur(12px)' }}
        >
          {/* Top section: Socials | Newsletter | Logo */}
          <div className="container">
            {/* Desktop layout */}
            <div className="hidden lg:grid lg:grid-cols-[1fr_2fr_1fr] items-start gap-8 pb-10">
              {/* Social links */}
              <div>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#32312E] mb-4">
                  Stay Connected
                </p>
                <div className="flex items-center gap-4">
                  {socialLinks.map((social, i) => (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9F928B] hover:opacity-70 transition-opacity"
                    >
                      <SocialIcon platform={social.platform} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#32312E] mb-4">
                  {newsletterHeading}
                </p>
                <NewsletterForm
                  placeholder={newsletterPlaceholder}
                  successMessage={newsletterSuccessMessage}
                  errorMessage={newsletterErrorMessage}
                  className="flex items-center bg-white rounded-full overflow-hidden border border-[#d9d4cd]"
                  inputClassName="flex-1 px-6 py-3 bg-transparent text-sm text-[#32312E] placeholder:text-[#8a857e] placeholder:tracking-wider placeholder:text-xs focus:outline-none"
                  buttonClassName="px-6 py-3 bg-[linear-gradient(270deg,#32312E_0%,#745D4D_20.52%,#BC8D6C_100%)] text-white text-sm font-medium rounded-full m-1 hover:opacity-90 transition-opacity"
                />
              </div>

              {/* Logo */}
              <div className="flex justify-end">
                <Link href={`/${locale}`}>
                  <Logo />
                </Link>
              </div>
            </div>

            {/* Mobile layout */}
            <div className="lg:hidden pt-10 pb-6">
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-[#32312E] mb-4 text-center">
                {newsletterHeading}
              </p>
              <NewsletterForm
                placeholder={newsletterPlaceholder}
                successMessage={newsletterSuccessMessage}
                errorMessage={newsletterErrorMessage}
                className="flex items-center bg-white rounded-full overflow-hidden border border-[#d9d4cd]"
                inputClassName="flex-1 px-5 py-3 bg-transparent text-sm text-[#32312E] placeholder:text-[#8a857e] placeholder:tracking-wider placeholder:text-xs focus:outline-none"
                buttonClassName="px-5 py-3 bg-[linear-gradient(270deg,#32312E_0%,#745D4D_20.52%,#BC8D6C_100%)] text-white text-sm font-medium rounded-full m-1 hover:opacity-90 transition-opacity"
              />
            </div>

            {/* Divider */}
            <div className="hidden lg:block border-t border-[#c9c4bd]" />

            {/* Desktop: copyright | nav links | CTA + legal */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-8 py-10">
              <div className="flex flex-col items-start gap-2">
                <p className="text-sm text-[#5a5751] font-normal">{renderText(copyright)}</p>
                {footerData?.contactEmailLabel && footerData?.contactEmailUrl && (
                  <a
                    href={footerData.contactEmailUrl}
                    className="text-sm text-[#5a5751] font-normal hover:opacity-70 transition-opacity"
                  >
                    {footerData.contactEmailLabel}
                  </a>
                )}
              </div>

              <div>
                <div className="grid grid-cols-3 gap-x-8 gap-y-3">
                  {navItems.map(({ link }, i) => (
                    <CMSLink
                      key={i}
                      {...link}
                      appearance="inline"
                      className="text-sm font-normal text-[#32312E] hover:opacity-70 transition-opacity"
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end gap-4">
                {footerData?.ctaLink && (
                  <CMSLink
                    {...footerData.ctaLink}
                    appearance="inline"
                    className="inline-flex items-center justify-center px-10 py-3 rounded-full border-2 border-[#32312E] text-[#32312E] text-base font-medium hover:opacity-70 transition-opacity"
                  />
                )}
                <div className="flex items-center gap-6">
                  {footerData?.termsLink && (
                    <CMSLink
                      {...footerData.termsLink}
                      appearance="inline"
                      className={LEGAL_LINK_CLASS}
                    />
                  )}
                  {footerData?.privacyLink && (
                    <CMSLink
                      {...footerData.privacyLink}
                      appearance="inline"
                      className={LEGAL_LINK_CLASS}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Mobile bottom */}
            <div className="lg:hidden">
              <div className="border-t border-[#c9c4bd] py-8">
                <div className="grid grid-cols-2 gap-x-8 gap-y-5 px-4">
                  {navItems.map(({ link }, i) => (
                    <CMSLink
                      key={i}
                      {...link}
                      appearance="inline"
                      className="text-base font-medium uppercase tracking-wider text-[#32312E]"
                    />
                  ))}
                </div>
              </div>

              <div className="border-t border-[#c9c4bd] py-6">
                <p className="text-sm font-semibold tracking-[0.15em] uppercase text-[#32312E] mb-4 text-center">
                  Stay Connected
                </p>
                <div className="flex items-center justify-center gap-5">
                  {socialLinks.map((social, i) => (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9F928B] hover:opacity-70 transition-opacity"
                    >
                      <SocialIcon platform={social.platform} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#c9c4bd] py-6 flex flex-col items-center gap-3">
                {footerData?.ctaLink && (
                  <CMSLink
                    {...footerData.ctaLink}
                    appearance="inline"
                    className="text-sm font-semibold tracking-[0.1em] uppercase text-[#32312E]"
                  />
                )}
                {footerData?.termsLink && (
                  <CMSLink
                    {...footerData.termsLink}
                    appearance="inline"
                    className={LEGAL_LINK_CLASS_MOBILE}
                  />
                )}
                {footerData?.privacyLink && (
                  <CMSLink
                    {...footerData.privacyLink}
                    appearance="inline"
                    className={LEGAL_LINK_CLASS_MOBILE}
                  />
                )}
              </div>

              <div className="border-t border-[#c9c4bd] py-6 flex flex-col items-center gap-2">
                <p className="text-sm text-[#5a5751] font-normal text-center">{renderText(copyright)}</p>
                {footerData?.contactEmailLabel && footerData?.contactEmailUrl && (
                  <a
                    href={footerData.contactEmailUrl}
                    className="text-sm text-[#5a5751] font-normal text-center hover:opacity-70 transition-opacity"
                  >
                    {footerData.contactEmailLabel}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
