import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker/registerServiceWorker';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
