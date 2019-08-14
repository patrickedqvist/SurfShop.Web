import React from 'react';
import { useSelector } from 'react-redux';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { get } from 'lodash/fp'
import Error from 'next/error'

// Redux
import { getPageBySlug } from '../../redux/actions/pages';
import { PAGE_RECEIVE } from '../../redux/definitions';

// typeDefs
import { Store, RequestStatus } from '../../typeDefs/store';
import { Page } from '../../typeDefs/page';

// Components
import { PageLayout } from '../../components/PageLayout';
import { Head } from '../../components/Head';
import { Hero } from '../../components/Hero';

// Utils
import { setServerResponseStatusCode } from '../../utils/server-side';


const StandardPage: NextPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    const page: Page = useSelector((store: Store) => get(slug, store.pages.data))
    const pageStatus: RequestStatus = useSelector((store: Store) => get(slug, store.pages.status))

    if (get('statusCode', pageStatus) !== 200) {
        return <Error statusCode={get('statusCode', pageStatus)} />
    }

    const body = { __html: page.content.body }

    return (
        <PageLayout>
            <Head title={`${page.content.title} | SurfShop`} description={'Start coding'} />
            <article className={'page-article'}>
                <h1 className={'page-article-title'}>{page.content.title}</h1>
                <div className={'page-article-content'} dangerouslySetInnerHTML={body} />
            </article>
        </PageLayout>
    );
}

StandardPage.getInitialProps = async (ctx) => {

    const slug = ctx.query.slug as string
    ctx.store.dispatch(getPageBySlug(slug));

    if (ctx.isServer) {
        await setServerResponseStatusCode({
            context: ctx,
            waitForActions: [PAGE_RECEIVE],
            statusLocation: ['pages', 'status', slug]
        })
    }

    return {}
}

export default StandardPage