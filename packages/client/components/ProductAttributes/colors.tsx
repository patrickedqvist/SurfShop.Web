import React from 'react'
import { map, find } from 'lodash/fp'
import classNames from 'classnames'

import './product-attributes.scss'

interface ColorsAttributesProps {
  title: string
  options: string[]
  selectedOption: string
  onChange: (option: string) => void
}

interface ColorAttributeProps {
  label: string
  onClick: (label: string) => void
  selected: boolean
}

const COLOR_CODES = [
  {
    colors: ['Black', 'True Black'],
    hex: '#00111A',
  },
  {
    colors: ['Green'],
    hex: '#173F35',
  },
  {
    colors: ['Red'],
    hex: '#8F5461',
  },
  {
    colors: ['Ground Grey'],
    hex: '#A2AAAD',
  },
  {
    colors: ['Bucket Blue'],
    hex: '#041C2C',
  },
]

const ColorAttribute = ({ label, onClick, selected }: ColorAttributeProps) => {
  const handleOnClick = () => {
    onClick(label)
  }

  const classes = classNames('productAttributes-option productAttributes-option--color', {
    'productAttributes-option--selected': selected,
  })

  const colorCode = find((code) => code.colors.includes(label), COLOR_CODES)

  const style = {
    backgroundColor: colorCode ? colorCode.hex : '',
  }

  return (
    <button type='button' className={classes} onClick={handleOnClick} style={style}>
      {label}
    </button>
  )
}

export const ColorsAttributes = ({ title, options, selectedOption, onChange }: ColorsAttributesProps) => {
  return (
    <div className='productAttributes'>
      <h4 className='productAttributes-title'>{title}</h4>
      <div className='productAttributes-options'>
        {map(
          (option) => (
            <ColorAttribute key={option} label={option} onClick={onChange} selected={option === selectedOption} />
          ),
          options
        )}
      </div>
    </div>
  )
}
