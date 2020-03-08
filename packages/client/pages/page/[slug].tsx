/* eslint-disable react/no-danger */
import React from 'react';
import { useSelector } from 'react-redux';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { get, has } from 'lodash/fp';
import Error from 'next/error';

// Redux
import { getPageBySlug } from '../../redux/actions/pages';
import { PAGE_RECEIVE } from '../../redux/definitions';

// typeDefs
import { Store, RequestStatus } from '../../typeDefs/store';
import { Page } from '../../typeDefs/page';

// Components
import { PageLayout } from '../../components/PageLayout';
import { Head } from '../../components/Head';

// Utils
import { setServerResponseStatusCode } from '../../utils/server-side';
import { PageHeader } from '../../components/PageHeader';

const StandardPage: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const page: Page = useSelector((store: Store) => get(slug, store.pages.data));
  const pageStatus: RequestStatus = useSelector((store: Store) => get(slug, store.pages.status));

  if (get('statusCode', pageStatus) !== 200) {
    return <Error statusCode={get('statusCode', pageStatus)} />;
  }

  const body = has('content.body', page) ? { __html: page.content.body } : null;

  return (
    <PageLayout>
      <Head title={page.content.title} description={page.content.preamble} />
      <article className='page-article'>
        <PageHeader title={page.content.title} preamble={page.content.preamble} />
        {body && <div dangerouslySetInnerHTML={body} />}
      </article>
    </PageLayout>
  );
};

StandardPage.getInitialProps = async (ctx) => {
  const slug = ctx.query.slug as string;
  ctx.store.dispatch(getPageBySlug(slug));

  if (ctx.isServer) {
    await setServerResponseStatusCode({
      context: ctx,
      waitForActions: [PAGE_RECEIVE],
      statusLocation: ['pages', 'status', slug],
    });
  }

  return {};
};

export default StandardPage;
