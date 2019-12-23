import React from 'react'

import './page-header.scss'

interface Props {
  title: string;
  preamble?: string;
}

export const PageHeader: React.FC<Props> = ({ title, preamble }) => {
  return (
    <div className='page-header'>
      <h1 className='page-header__title'>{title}</h1>
      {preamble && <p className='page-header__preamble'>{preamble}</p>}
    </div>
  )
}
