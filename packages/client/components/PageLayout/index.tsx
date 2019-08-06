import React from 'react';

// Components
import { TopBar } from '../TopBar';

// Styles
import './page-layout.scss'

// Types
interface Props {
    children: React.ReactNode[]
}

export const PageLayout = (props: Props) => (
    <div className={'page'}>
        <TopBar />
        <header className={'header'}></header>
        <main className={'main'}>
            {props.children}
        </main>
        <footer className={'footer'}></footer>
    </div>
)