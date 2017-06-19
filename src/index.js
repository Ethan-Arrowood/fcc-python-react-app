import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';


const history = createBrowserHistory()

ReactDOM.render(
  <Router basename='/fcc-python-react-app/' history={history}>
    <App />
  </Router>, document.getElementById('root'));
registerServiceWorker();
