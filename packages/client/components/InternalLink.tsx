import React from 'react';
import Link from 'next/link';

export type PageType = 'page' | 'product' | 'root';

interface IProps {    
    type: PageType,
    url: string,
    title: string,
    children: React.ReactText    
}

const getServerPage = (type: PageType) => {
    switch (type) {

        case 'page':
            return '/page/[slug]';
        
        case 'product':
            return '/product/[slug]';

        default:
            return null;
    }
}

export const InternalLink = (props: IProps) => {
    const href = getServerPage(props.type);

    if ( !href ) {
        return (
            <Link as={props.url} passHref>
                <a title={props.title}>{props.children}</a>
            </Link>
        )
    }

    return (
        <Link href={href} as={props.url} passHref>
            <a title={props.title}>{props.children}</a>
        </Link>
    )
}