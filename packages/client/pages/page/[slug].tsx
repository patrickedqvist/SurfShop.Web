import React from 'react';
import { useSelector } from 'react-redux';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { find } from 'lodash/fp'

// typeDefs
import { Store } from '../../typeDefs/store';

// Components
import { PageLayout } from '../../components/PageLayout';
import { Head } from '../../components/Head';
import { Hero } from '../../components/Hero';

const Page: NextPage = () => {
    const router = useRouter();
    const slug = router.query.slug as string;

    return (
        <PageLayout>
            <Head title={`${slug} | SurfShop`} description={'Start coding'} />
            <Hero title={slug} backgroundImage={'/static/images/windsurfing.jpg'} />
        </PageLayout>
    );
}

export default Page