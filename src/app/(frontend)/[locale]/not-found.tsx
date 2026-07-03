import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="container pt-32 pb-28 flex flex-col items-center justify-center text-center">
      <h1
        className="text-8xl md:text-9xl text-[#BC8D6C] mb-4"
        style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 300 }}
      >
        404
      </h1>
      <h2
        className="text-2xl md:text-3xl text-[#32312E] mb-3"
        style={{ fontFamily: 'var(--font-roboto, Roboto, sans-serif)', fontWeight: 500 }}
      >
        Page not found
      </h2>
      <p className="text-sm text-[#32312E]/70 mb-8 max-w-md leading-relaxed">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium border-2 border-[#32312E] text-[#32312E] hover:opacity-70 transition-opacity"
      >
        Back to home
      </Link>
    </div>
  )
}
