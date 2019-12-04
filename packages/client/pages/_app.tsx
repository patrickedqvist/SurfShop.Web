/* eslint-disable react/jsx-props-no-spreading */

import App from 'next/app'
import React from 'react'
import { Store } from 'redux'
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'

// Redux
import { initializeStore } from '../redux/store'

interface Props {
  store: Store
}

class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}
    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withRedux(initializeStore)(MyApp)
