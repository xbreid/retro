import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import App from './App';
import Vault from './views/vault';
import Home from './views/home';
import Generator from './views/generator';
import Page404 from './views/pages/404';
import Callback from './callback/Callback';
import { requireAuth } from './auth/AuthService';

export default (
  <Route>
    <Route component={App} path='/'>
      <IndexRoute component={Home}/>
      <Route path='vault' component={Vault} onEnter={requireAuth}/>
      <Route path='generator' component={Generator} onEnter={requireAuth}/>
    </Route>
    <Route path="callback" component={Callback}/>
    <Route path="404" component={Page404}/>
    <Redirect from="*" to="404"/>
  </Route>
);