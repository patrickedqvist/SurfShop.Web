import React, { memo } from 'react'
import classNames from 'classnames'

// Style
import './widget.scss'

// Types
interface Props {
  title?: string
  className?: string
  type: string
  children?: React.ReactNode[] | React.ReactNode
}

export const WidgetComponent: React.SFC<Props> = ({
  title,
  className,
  type,
  children,
}) => {
  const classes = classNames('widget', className, {
    [`widget--${type}`]: type,
  })

  return (
    <div className={classes}>
      {title && <h3 className='widget-title'>{title}</h3>}
      {children && <div className='widget-content'>{children}</div>}
    </div>
  )
}

export const Widget = memo(WidgetComponent)
