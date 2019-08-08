import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

// Components
import { TopBar } from '../TopBar';
import { Header } from '../Header';

// Redux
import { getCart } from '../../redux/actions/cart';

// Styles
import './page-layout.scss'

// Types
interface Props {
    children: React.ReactNode[],
    headerFixed?: boolean
}

export const PageLayout = (props: Props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCart())
    }, [])

    const classes = classNames('page');

    return (
        <div className={classes}>
            <TopBar />
            <Header fixed={props.headerFixed} />
            <main className={'main'}>
                {props.children}
            </main>
            <footer className={'footer'}></footer>
        </div>
    )
}

PageLayout.defaultProps = {
    headerFixed: false
}