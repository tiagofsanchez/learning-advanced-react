/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import '../components/styles/nprogress.css';

import Page from '../components/Page';
import withData from '../lib/withData';
import { CartStateProvider } from '../hooks/cartState';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps, apollo }) => (
  <ApolloProvider client={apollo}>
    <CartStateProvider>
      <Page>
        <Component {...pageProps} />
      </Page>
    </CartStateProvider>
  </ApolloProvider>
);

// if any of the components needs initialProps to start with
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
