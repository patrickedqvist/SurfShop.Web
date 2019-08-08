import { map, isEmpty } from 'lodash/fp';
import React from 'react';

// Components
import { ProductCard } from '../ProductCard';

// Styles
import './product-list.scss'

// Types
import { Product } from '../../typeDefs/product';

interface IProps {
    products?: Product[];
}

export const ProductList = (props: IProps) => {

    if ( isEmpty(props.products) ) {
        return null;
    }

    const products = map(
        product => (
            <div className={'product-list-item'} key={product.slug}>
                <ProductCard product={product} />
            </div>
        ),
        props.products
    );

    return <div className={'product-list'}>{products}</div>;
};