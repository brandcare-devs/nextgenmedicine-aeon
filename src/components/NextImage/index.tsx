import NextImage, { type ImageProps } from 'next/image'
import React from 'react'

export type { ImageProps }

export default function Image(props: ImageProps) {
  return <NextImage unoptimized {...props} />
}
