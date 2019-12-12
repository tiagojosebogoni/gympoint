import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import DefaultLayout from '../pages/_layouts/default';
import AuthLayout from '../pages/_layouts/auth';

import { store } from '../store';

export default function RouterWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const { signed } = store.getState().auth;
  // const signed = false;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}
