import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import ListStudent from '../pages/Student/List';
import StoreStudent from '../pages/Student/Store';
import StorePlan from '../pages/Plan/Store';
import ListPlan from '../pages/Plan/List';
import RegisterStore from '../pages/Register/Store';
import RegisterList from '../pages/Register/List';
import HelpOrder from '../pages/HelpOrder';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/Student/list" isPrivate component={ListStudent} />
      <Route path="/Student/store" isPrivate component={StoreStudent} />

      <Route path="/Plan/list" isPrivate component={ListPlan} />
      <Route path="/plan/store" isPrivate component={StorePlan} />

      <Route path="/Register/list/" isPrivate component={RegisterList} />
      <Route path="/Register/store" isPrivate component={RegisterStore} />

      <Route path="/helpOrder" isPrivate component={HelpOrder} />
      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
