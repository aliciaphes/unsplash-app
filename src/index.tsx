import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { photoStore } from './store/store';
import { ConnectedApp } from './ConnectedApp';
import { Provider } from 'react-redux';

const rootEl = document.querySelector('#root');
ReactDOM.render(
  <Provider store={photoStore}>
    <ConnectedApp />
  </Provider>,
  rootEl,
);
