import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import { take, size } from 'lodash/fp'
import Link from 'next/link'

// Components
import { Portal } from '../Portal'
import { ProductList } from '../ProductList'

// Redux
import { getSearchResultFor } from '../../redux/actions/search'
import { REQUEST_SUCCESS } from '../../redux/definitions'

// typeDefs
import { Store } from '../../typeDefs/store'

// Styling
import './header-search.scss'

interface Props {
  visible: boolean;
}

export const HeaderSearch: React.FC<Props> = ({ visible }) => {
  const dispatch = useDispatch()

  const searchResultProducts = useSelector((store: Store) => take(4, store.search.data.results))
  const searchResultsTotal = useSelector((store: Store) => size(store.search.data.results))
  const searchStatus = useSelector((store: Store) => store.search.status.status)
  const searchQuery = useSelector((store: Store) => store.search.data.searchString)

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(getSearchResultFor(event.target.value))
  }

  const classes = classNames('quick-search', {
    'is-visible': visible,
  })

  const classesSuggestion = classNames('search-suggestions', {
    'is-visible': visible,
  })

  const showSearchResultsTotal = searchResultProducts.length < searchResultsTotal && searchResultProducts.length !== 0
  const isSuccess = searchStatus === REQUEST_SUCCESS

  return (
    <>
      <div className={classes}>
        <form>
          <input
            type='search'
            placeholder='Sök...'
            name='searchQuery'
            value={searchQuery}
            onChange={handleOnInputChange}
          />
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
      </div>

      <Portal>
        <div className={classesSuggestion}>
          <div className='search-suggestions__results'>
            <h3>Search results</h3>
            {isSuccess && <ProductList products={searchResultProducts} presentAs='list' />}
            {showSearchResultsTotal && <p>{`showing ${searchResultProducts.length} of ${searchResultsTotal}`}</p>}
            {showSearchResultsTotal && (
              <Link href={`/search?searchQuery=${encodeURI(searchQuery)}`} passHref>
                <a title='Visa alla resultat'>Visa alla</a>
              </Link>
            )}
          </div>

          <div className='search-suggestions__links'>
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
      </Portal>
    </>
  )
}
