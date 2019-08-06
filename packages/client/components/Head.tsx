import React from 'react'
import NextHead from 'next/head'
import { map, isEmpty } from 'lodash/fp';

// Types
interface MetaTag { 
    [key: string]: string 
}

interface IProps {
    title: string
    description: string
    canonical?: string
    metaTags?: MetaTag[]
}

export const Head = ({ title, description, canonical, metaTags }: IProps) => {

    const metaKeys = Object.keys(metaTags || {});
    const meta = !isEmpty(metaTags) ? map((tag: string) => <meta key={tag} name={tag} content={metaTags[tag]} />, metaKeys) : null;

    return (
        <NextHead>
            <meta charSet="UTF-8" />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
            <link rel="apple-touch-icon" href="/static/touch-icon.png" />
            <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
            <link rel="icon" href="/static/favicon.ico" />
            {meta}
            {canonical && <link href={canonical} rel="canonical" />}
            
        </NextHead>
    )
}

Head.defaultProps = {    
    metaTags: [],
    canonical: ''
}