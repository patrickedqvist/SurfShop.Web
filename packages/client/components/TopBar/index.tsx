import React, { memo } from 'react'

// Style
import './top-bar.scss'

const TopBarComponent = () => {
  return (
    <div className='top-bar'>
      <div>
        <div>Fri frakt på alla ordrar | 2-5 dagars leverans </div>
      </div>
    </div>
  )
}

export const TopBar = memo(TopBarComponent)
