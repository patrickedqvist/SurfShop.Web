import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Components
import { TopBar } from '../TopBar';
import { Header } from '../Header';

// Redux
import { getCart } from '../../redux/actions/cart';

// Styles
import './page-layout.scss'

// Types
interface Props {
    children: React.ReactNode[]
}

export const PageLayout = (props: Props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCart())
    }, [])

    return (
        <div className={'page'}>
            <TopBar />
            <Header />
            <main className={'main'}>
                {props.children}
            </main>
            <footer className={'footer'}></footer>
        </div>
    )
}