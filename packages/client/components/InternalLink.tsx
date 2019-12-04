import React from 'react'
import Link from 'next/link'

export type PageType = 'page' | 'product' | 'root' | 'category'

interface Props {
  type: PageType
  url: string
  title: string
  children: React.ReactText
  className?: string
}

const getServerPage = (type: PageType) => {
  switch (type) {
    case 'category':
      return '/category/[slug]'

    case 'page':
      return '/page/[slug]'

    case 'product':
      return '/product/[slug]'

    default:
      return null
  }
}

export const InternalLink: React.SFC<Props> = (props) => {
  const href = getServerPage(props.type)

  if (!href) {
    return (
      <Link as={props.url} href={props.url} passHref>
        <a className={props.className} title={props.title}>
          {props.children}
        </a>
      </Link>
    )
  }

  return (
    <Link href={href} as={props.url} passHref>
      <a className={props.className} title={props.title}>
        {props.children}
      </a>
    </Link>
  )
}
