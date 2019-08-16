import React, { memo } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

// Styling
import './header.scss';
import { MiniCart } from './MiniCart';

// Types
interface IProps {
    fixed?: boolean
}

const HeaderComponent = ({ fixed }: IProps) => {

    const classes = classNames('site-header', {
        'site-header--fixed': fixed
    });

    return (
        <header className={classes}>
            <Link href={'/'} passHref>
                <a title={'Home'}>
                    <h1>SurfShop</h1>
                </a>                
            </Link>
            <MiniCart />
        </header>
    )
}

HeaderComponent.defaultProps = {
    fixed: false,
}

export const Header = memo(HeaderComponent);