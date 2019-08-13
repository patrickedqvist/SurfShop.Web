import React, { memo } from 'react';
import classNames from 'classnames';

// Style
import './widget.scss'

// Types
interface IProps {
    title?: string
    className?: string
    type: string
    children: React.ReactNode[] | React.ReactNode
}

export const WidgetComponent = ({ title, className, type, children }: IProps) => {

    const classes = classNames('widget', className, {
        [`widget--${type}`]: type
    });

    return (
        <div className={classes}>
            {title && <h3 className={'widget-title'}>{title}</h3>}
            <div className={'widget-content'}>
                {children}
            </div>
        </div>
    )
}

export const Widget = memo(WidgetComponent);