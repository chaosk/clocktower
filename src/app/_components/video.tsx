'use client'

import type { FC, ReactNode } from 'react'

export const Video: FC<{ src: string; caption?: ReactNode; ratio: number }> = ({
  src,
  caption,
  ratio
}) => {
  return (
    <div>
      <div style={{ paddingBottom: ratio * 100 + '%' }} />
      <video
	    controls
        muted
      >
        <source src={src} type="video/mp4" />
      </video>
      {caption && (
        <figcaption style={{ fontSize: '.9rem', textAlign: 'center' }}>
          {caption}
        </figcaption>
      )}
    </div>
  )
}
