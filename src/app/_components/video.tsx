'use client'

import type { FC, ReactNode } from 'react'

export const Video: FC<{ src: string; caption?: ReactNode }> = ({
  src,
  caption
}) => {
  return (
    <div>
      <div style={{ paddingBottom: '1em' }} />
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
