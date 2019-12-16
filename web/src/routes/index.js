import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import ListStudent from '../pages/Student/List';
import StoreStudent from '../pages/Student/Store';
import StorePlan from '../pages/Plan/Store';
import ListPlan from '../pages/Plan/List';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route
        path="/Student/store/:id/:mode"
        isPrivate
        component={StoreStudent}
      />
      <Route path="/Student/list" isPrivate component={ListStudent} />
      <Route path="/plan/store/:id/:mode" isPrivate component={StorePlan} />
      <Route path="/Plan/list" isPrivate component={ListPlan} />
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
