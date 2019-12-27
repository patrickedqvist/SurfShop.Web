/* eslint-disable react/no-danger */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from 'next'

// Redux
import { getSearchResultFor } from '../redux/actions/search'

// typeDefs
import { Store } from '../typeDefs/store'

// Components
import { PageLayout } from '../components/PageLayout'
import { Head } from '../components/Head'
import { ProductList } from '../components/ProductList'
import { PageHeader } from '../components/PageHeader'

const SearchPage: NextPage = () => {
  const dispatch = useDispatch()

  const searchResultProducts = useSelector((store: Store) => store.search.data.results)
  const searchQuery = useSelector((store: Store) => store.search.data.searchString)

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(getSearchResultFor(event.target.value))
  }

  return (
    <PageLayout>
      <Head title='Search' description='Search Results' />
      <article className='page-article'>
        <PageHeader title='Search' />
        <input type='search' value={searchQuery} onChange={handleOnInputChange} />
        <ProductList products={searchResultProducts} />
      </article>
    </PageLayout>
  )
}

export default SearchPage
