/* eslint-disable react/no-danger */
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { get, debounce } from 'lodash/fp'
import Error from 'next/error'

// Redux
import { getPageBySlug } from '../redux/actions/pages'
import { PAGE_RECEIVE } from '../redux/definitions'

// typeDefs
import { Store, RequestStatus } from '../typeDefs/store'
import { Page } from '../typeDefs/page'

// Components
import { PageLayout } from '../components/PageLayout'
import { Head } from '../components/Head'

// Utils
import { setServerResponseStatusCode } from '../utils/server-side'
import { PageHeader } from '../components/PageHeader'
import { getSearchResultFor } from '../redux/actions/search'
import { ProductList } from '../components/ProductList'

const SearchPage: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { slug } = router.query

  const [searchQuery, setSearchQuery] = useState('')

  const searchResultProducts = useSelector((store: Store) => store.search.data)

  const handleOnSearch = (searchString: string) => {
    dispatch(getSearchResultFor(searchString))
  }

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    handleOnSearch(event.target.value)
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
