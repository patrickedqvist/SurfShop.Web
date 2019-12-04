import React from 'react'
import { map, sortBy } from 'lodash/fp'
import classNames from 'classnames'

interface SizesAttributesProps {
  title: string
  options: string[]
  selectedOption: string
  onChange: (option: string) => void
}

interface SizeAttributeProps {
  label: string
  onClick: (label: string) => void
  selected: boolean
}

const definedOrder = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']

const SizeAttribute = ({ label, onClick, selected }: SizeAttributeProps) => {
  const handleOnClick = () => {
    onClick(label)
  }

  const classes = classNames(
    'productAttributes-option productAttributes-option--size',
    {
      'productAttributes-option--selected': selected,
    }
  )

  return (
    <button type='button' className={classes} onClick={handleOnClick}>
      {label}
    </button>
  )
}

export const SizesAttributes = ({
  title,
  options,
  selectedOption,
  onChange,
}: SizesAttributesProps) => {
  const sortedAttributes = sortBy(
    (a, b) => definedOrder.indexOf(a) - definedOrder.indexOf(b),
    options
  )

  return (
    <div className='productAttributes'>
      <h4 className='productAttributes-title'>{title}</h4>
      <div className='productAttributes-options'>
        {map(
          (option) => (
            <SizeAttribute
              key={option}
              label={option}
              onClick={onChange}
              selected={option === selectedOption}
            />
          ),
          sortedAttributes
        )}
      </div>
    </div>
  )
}
