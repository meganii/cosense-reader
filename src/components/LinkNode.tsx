import React from 'react'
import type { LinkNode as LinkNodeType } from '@progfay/scrapbox-parser'
import Link from 'next/link'

export const LinkNode = (props: LinkNodeType) => {
  switch (props.pathType) {
    case 'root':
    case 'relative':
      return <InternalLink {...props} />
    case 'absolute':
      return <ExternalLink {...props} />
  }
}

const InternalLink = (props: LinkNodeType) => {
    const project = 'villagepump'
    const href =
    props.pathType === 'relative' ? `/${project}/${props.href}` : props.href

  return (
    <Link href={encodeURIComponent(props.href)} className='text-blue-600'>
      {props.href}
    </Link>
  )
}

const ExternalLink = (props: LinkNodeType) => (
  <a href={props.href} rel="noopener noreferrer" target="_blank" className='underline'>
    {props.content || props.href}
  </a>
)