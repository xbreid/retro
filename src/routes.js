import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';
import App from './App';
import Vault from './views/vault';
import Notes from './views/notes';
import Home from './views/home';
import Tools from './views/tools';
import Settings from './views/settings';
import Page404 from './views/pages/404';
import Callback from './callback/Callback';
import { requireAuth } from './auth/AuthService';

export default (
  <Route>
    <Route component={App} path='/'>
      <IndexRoute component={Home}/>
      <Route path='vault' component={Vault} onEnter={requireAuth}/>
      <Route path='notes' component={Notes} onEnter={requireAuth}/>
      <Route path='tools' component={Tools} onEnter={requireAuth}/>
      <Route path='settings' component={Settings} onEnter={requireAuth}/>
    </Route>
    <Route path="callback" component={Callback}/>
    <Route path="404" component={Page404}/>
    <Redirect from="*" to="404"/>
  </Route>
);