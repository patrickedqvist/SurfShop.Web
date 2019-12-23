import React, { memo } from 'react'
import classNames from 'classnames'

// Styling
import './hero.scss'

// Types
interface Props {
  title: string;
  subtitle?: string;
  content?: string;
  backgroundImage?: string;
  children?: React.ReactNode | React.ReactNode[];
}

const HeroComponent: React.FC<Props> = (props) => {
  const classes = classNames('hero', {
    'hero--backgroundImage': props.backgroundImage,
  })

  const style = {
    backgroundImage: `url(${props.backgroundImage})`,
  }

  return (
    <div className={classes} style={style}>
      <div className='hero-inner'>
        <h1 className='hero-title'>{props.title}</h1>
        {props.subtitle && <h2 className='hero-subtitle'>{props.subtitle}</h2>}
        {props.content && <p className='hero-content'>{props.content}</p>}
        {props.children && <div className='hero-children'>{props.children}</div>}
      </div>
    </div>
  )
}

export const Hero = memo(HeroComponent)
