import React from 'react'
import classNames from 'classnames'

interface Props {
  visible: boolean;
}

export const HeaderSearch: React.FC<Props> = ({ visible }) => {
  const classes = classNames('cd-main-search', {
    'is-visible': visible,
  })

  return (
    <div id='search' className={classes}>
      <form>
        <input type='search' placeholder='Search...' />
        <div className='cd-select'>
          <span>in</span>
          <select name='select-category'>
            <option value='all-categories'>all Categories</option>
            <option value='category1'>Category 1</option>
            <option value='category2'>Category 2</option>
            <option value='category3'>Category 3</option>
          </select>
          <span className='selected-value'>all Categories</span>
        </div>
      </form>

      <div className='cd-search-suggestions'>
        <div className='news'>
          <h3>News</h3>
          <ul>
            <li>
              <a className='image-wrapper' href='#0'>
                <img src='img/placeholder.png' alt='News placeholder' />
              </a>
              <h4>
                <a className='cd-nowrap' href='#0'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </a>
              </h4>
              <time dateTime='2016-01-12'>Feb 03, 2016</time>
            </li>
            <li>
              <a className='image-wrapper' href='#0'>
                <img src='img/placeholder.png' alt='News placeholder' />
              </a>
              <h4>
                <a className='cd-nowrap' href='#0'>
                  Incidunt voluptatem adipisci voluptates fugit beatae culpa eum, distinctio, assumenda est ad
                </a>
              </h4>
              <time dateTime='2016-01-12'>Jan 28, 2016</time>
            </li>
            <li>
              <a className='image-wrapper' href='#0'>
                <img src='img/placeholder.png' alt='News placeholder' />
              </a>
              <h4>
                <a className='cd-nowrap' href='#0'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, esse.
                </a>
              </h4>
              <time dateTime='2016-01-12'>Jan 12, 2016</time>
            </li>
          </ul>
        </div>
        <div className='quick-links'>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href='#0'>Find a store</a>
            </li>
            <li>
              <a href='#0'>Accessories</a>
            </li>
            <li>
              <a href='#0'>Warranty info</a>
            </li>
            <li>
              <a href='#0'>Support</a>
            </li>
            <li>
              <a href='#0'>Contact us</a>
            </li>
          </ul>
        </div>
      </div>
      <a href='#0' className='close cd-text-replace'>
        Close Form
      </a>
    </div>
  )
}
