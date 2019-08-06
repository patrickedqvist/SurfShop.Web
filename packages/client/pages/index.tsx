import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { setViewstate } from '../redux/actions/viewstate';

// typeDefs
import { Store } from '../typeDefs/store';

// Components
import { PageLayout } from '../components/PageLayout';
import { Head } from '../components/Head';


const Home = () => {
  const dispatch = useDispatch();
  const viewstate = useSelector((store: Store) => store.viewstate);

  const handleOnClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    dispatch(setViewstate('enabled', !viewstate.enabled));
  }

  return (
    <PageLayout>
      <Head title={'Welcome to Next.js!'} description={'Start coding'} />
      <h1>Welcome to Next.js!</h1>
      <code>
        <pre>{JSON.stringify(viewstate)}</pre>
      </code>
      <button onClick={handleOnClick}>Toggle</button>
    </PageLayout>
  );
}

export default Home