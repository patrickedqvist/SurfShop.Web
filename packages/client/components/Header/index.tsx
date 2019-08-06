import React, { memo } from 'react';

// Styling
import './header.scss';
import { MiniCart } from './MiniCart';

const HeaderComponent = () => {
    return (
        <header className={'site-header'}>
            <h1>SurfShop</h1>
            <MiniCart />
        </header>
    )
}

export const Header = memo(HeaderComponent);