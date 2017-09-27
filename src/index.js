import React from 'react';
import ReactDOM from 'react-dom';
import {Router, useRouterHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';

const history = useRouterHistory(createBrowserHistory)({
  basename: '/'
});

ReactDOM.render(
  <Router history={history} routes={routes}/>,
  document.getElementById('root')
);

registerServiceWorker();
