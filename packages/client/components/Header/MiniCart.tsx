import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Types
import { Store } from '../../typeDefs/store';

const MiniCartComponent = () => {

    const cart = useSelector((store: Store) => store.cart);

    return (
        <div className={'mini-cart'}>
            <span>{cart.totalAmount} kr</span>
            <img src={'/static/icon-bag.svg'} alt={'bag'} />
        </div>
    )
}

export const MiniCart = memo(MiniCartComponent);