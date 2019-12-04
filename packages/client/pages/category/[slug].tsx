import React from 'react'
import { useSelector } from 'react-redux'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { get, filter } from 'lodash/fp'
import Error from 'next/error'
import { waitFor } from 'redux-wait-for-ssr'
import { createSelector } from 'reselect'

// Redux
import { getPageBySlug } from '../../redux/actions/pages'
import { PAGE_RECEIVE, PRODUCTS_RECEIVE } from '../../redux/definitions'
import { getProducts } from '../../redux/actions/products'

// typeDefs
import { Store, RequestStatus } from '../../typeDefs/store'
import { Page } from '../../typeDefs/page'
import { Product } from '../../typeDefs/product'

// Components
import { PageLayout } from '../../components/PageLayout'
import { Head } from '../../components/Head'
import { ProductList } from '../../components/ProductList'
import { PageHeader } from '../../components/PageHeader'


const getProductsByCategorySlug = createSelector(
    (state: Store) => state.products.data,
    (_: void, categorySlug: string) => categorySlug,
    (products, categorySlug) => filter(product => product.categories.find((category) => category.slug === categorySlug), products)
)


const CategoryPage: NextPage = () => {
    const router = useRouter()
    const { slug } = router.query
    const page: Page = useSelector((store: Store) => get(slug, store.pages.data))
    const products: Product[] = useSelector((store: Store & void) => 
        getProductsByCategorySlug(store, slug as string)
    )
    const pageStatus: RequestStatus = useSelector((store: Store) =>
        get(slug, store.pages.status)
    )

    if (get('statusCode', pageStatus) !== 200) {
        return <Error statusCode={get('statusCode', pageStatus)} />
    }

    return (
      <PageLayout>
        <Head
          title={`${page.content.title} | SurfShop`}
          description='Start coding'
        />
        <article className='page-category'>
          <PageHeader title={page.content.title} preamble={page.content.preamble} />
          <ProductList products={products} />
        </article>            
      </PageLayout>
    )
}

CategoryPage.getInitialProps = async (ctx) => {
    const slug = ctx.query.slug as string    
    ctx.store.dispatch(getPageBySlug(slug))    
    ctx.store.dispatch(getProducts())    

    if (ctx.isServer) {
        
        try {
            await ctx.store.dispatch(waitFor([PAGE_RECEIVE, PRODUCTS_RECEIVE]))
        } catch (e) {
            // eslint-disable-next-line
            console.log('CategoryPage Error -->', e);
        }        

    }

    return {}
}

export default CategoryPage
