import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import ListStudent from '../pages/Student/List';
import StoreStudent from '../pages/Student/Store';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/storeStudent" isPrivate component={StoreStudent} />
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
