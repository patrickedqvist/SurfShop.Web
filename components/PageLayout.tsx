import React from 'react';

interface Props {
    children: React.ReactNode[]
}

export const PageLayout = (props: Props) => (
    <div className={'page'}>
        <div className={'top-bar'}></div>
        <header className={'header'}></header>
        <main className={'main'}>
            {props.children}
        </main>
        <footer className={'footer'}></footer>
    </div>
)