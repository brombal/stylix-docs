import 'react-hot-loader';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '@app/App';

const HotApp = hot(App);
ReactDOM.render(
  <Router>
    <HotApp />
  </Router>,
  document.getElementById('root'),
);
