import React from 'react'
import NextHead from 'next/head'
import { map, isEmpty } from 'lodash/fp'

// Types
interface MetaTag {
  [key: string]: string
}

interface Props {
  title: string
  description: string
  canonical?: string
  metaTags?: MetaTag[]
  children?: React.ReactNode | React.ReactNode[]
}

export const Head: React.SFC<Props> = ({
  title,
  description,
  canonical,
  metaTags,
  children,
}) => {
  const metaKeys = Object.keys(metaTags || {})
  const meta = !isEmpty(metaTags)
    ? map(
        (tag: string) => <meta key={tag} name={tag} content={metaTags[tag]} />,
        metaKeys
      )
    : null

  return (
    <NextHead>
      <meta charSet='UTF-8' />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta httpEquiv='x-ua-compatible' content='ie=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />

      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/favicon/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon/favicon-16x16.png'
      />
      <link rel='manifest' href='/favicon/site.webmanifest' />
      <link
        rel='mask-icon'
        href='/favicon/safari-pinned-tab.svg'
        color='#000000'
      />
      <link rel='shortcut icon' href='/favicon/favicon.ico' />
      <meta name='msapplication-TileColor' content='#000000' />
      <meta name='msapplication-config' content='/favicon/browserconfig.xml' />
      <meta name='theme-color' content='#000' />

      {meta}
      {canonical && <link href={canonical} rel='canonical' />}
      <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
        type='text/css'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Yrsa&display=swap'
        rel='stylesheet'
      />
      {children}
    </NextHead>
  )
}

Head.defaultProps = {
  metaTags: [],
  canonical: '',
  children: null,
}
