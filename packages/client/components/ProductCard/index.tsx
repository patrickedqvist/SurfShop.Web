import React, { memo } from 'react';
import classNames from 'classnames'
import { get } from 'lodash/fp';

// Styles
import './product-card.scss'

// Utils
import { getVariationPrices } from '../../utils/prices';

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

    const imageStyle = {
        backgroundImage: `url(${get('featuredMedia.url', product)})`
    }

    const prices = getVariationPrices(product.variants);

    return (
        <div className={classes}>
            <div className={'product-card-image'} style={imageStyle} />
            <div className={'product-card-content'}>
                <span className={'product-card-label'}>{get('label', product)}</span>
                <h1 className={'product-card-title'}>{product.title}</h1>
                <p className={'product-card-excerpt'}>{product.excerpt}</p>
                {prices && <span className={'product-card-price'}>{`${prices.min}-${prices.max} kr`}</span>}
            </div>
            
        </div>
    )
}

ProductCardComponent.defaultProps = {
    highlight: false
}

export const ProductCard = memo(ProductCardComponent);