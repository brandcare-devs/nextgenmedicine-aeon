'use client'

import { useState } from 'react'

export default function FAQBlock({ title, subtitle, description, faqs }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="container py-20">
      <h2>{title}</h2>

      {subtitle && <p>{subtitle}</p>}

      {description && <p>{description}</p>}

      <div className="mt-10">
        {faqs?.map((item, index) => (
          <div key={index} className="border-b py-5">
            <button
              onClick={() =>
                setOpen(open === index ? null : index)
              }
              className="flex w-full justify-between"
            >
              <span>{item.question}</span>

              <span>{open === index ? '−' : '+'}</span>
            </button>

            {open === index && (
              <div className="mt-4">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}