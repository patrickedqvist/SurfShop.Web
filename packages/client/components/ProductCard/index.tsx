import React, { memo } from 'react';
import classNames from 'classnames'
import { get, map, isEmpty } from 'lodash/fp';
import Link from 'next/link';

// Styles
import './product-card.scss'

// Types
import { Product } from '../../typeDefs/product';

interface IProps {
    product: Product,
    highlight?: boolean
}

export const ProductCardComponent = ({ product, highlight }: IProps) => {

    const classes = classNames('product-card', {
        'product-card--highlight': highlight
    })

    const backgroundUrl = get('images[0].src', product);
    const imageStyle = backgroundUrl ? {
        backgroundImage: `url(${backgroundUrl})`
    } : {};

    const labels = !isEmpty(product.labels) ? map((label) => (
        <span key={label.id} className={'product-card-label'}>{label.title}</span>
    ), product.labels) : null;

    return (
        <div className={classes}>
            
            <Link href={'/product/[pslug]'} as={`/product/${product.slug}`} passHref>
                <a title={get('images[0].alt', product)}>
                    <div className={'product-card-image'} style={imageStyle} />
                </a>
            </Link>
            
            <div className={'product-card-content'}>
                <Link href={'/product/[pslug]'} as={`/product/${product.slug}`} passHref>
                    <a className={'product-card-title'} title={product.title}>{product.title}</a>
                </Link>
                <p className={'product-card-excerpt'}>{product.excerpt}</p>
                <p className={'product-card-price'}>{`${product.price} kr`}</p>
            </div>

            {!isEmpty(product.labels) && <div className={'product-card-labels'}>
                {labels}
            </div>}
            
        </div>
    )
}

ProductCardComponent.defaultProps = {
    highlight: false
}

export const ProductCard = memo(ProductCardComponent);
ProductCard.displayName = 'ProductCardMemo'