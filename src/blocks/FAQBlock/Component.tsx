'use client'

import { useState } from 'react';
import { RichText } from '@payloadcms/richtext-lexical/react';

import type { FAQBlockType } from '@/payload-types';

export function FAQBlockComponent({ title, subtitle, description, faqs }: FAQBlockType) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container py-20">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900">{title}</h2>

        {subtitle && (
          <p className="mt-3 text-lg text-neutral-600">{subtitle}</p>
        )}

        {description && (
          <p className="mt-2 text-neutral-500">{description}</p>
        )}
      </div>

      <div className="max-w-3xl mx-auto rounded-3xl bg-[#EFE7DF] p-4 sm:p-6">
        {faqs?.map((item, index) => {
          const isOpen = open === index;

          return (
            <div
              key={item.id ?? index}
              className={`border-b border-neutral-300 last:border-b-0 ${
                index === 0 ? '' : ''
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
              >
                <span className="text-base sm:text-lg font-medium text-neutral-900">
                  {item.question}
                </span>

                <span
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#C08552] text-white transition-transform duration-300 ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>

              <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="text-neutral-600 leading-relaxed prose prose-neutral max-w-none">
                    <RichText data={item.answer} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
