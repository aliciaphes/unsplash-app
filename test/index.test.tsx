import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactTestUtils, { act } from 'react-dom/test-utils';
import { ConnectedApp } from '../src/ConnectedApp';
import { photoStore } from '../src/store/store';

let container: any;

beforeEach(() => {
  container = document.createElement('div');
  container.setAttribute('id', 'root');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders the initial state, with search field and button', () => {
  act(() => {
    ReactDOM.render(
      <Provider store={photoStore}>
        <ConnectedApp />
      </Provider>,
      container,
    );
  });

  const label = container.querySelector('label');
  expect(label.textContent).toBe('Search: ');

  const input = container.querySelector('input');
  expect(input).toBeTruthy();

  const button = container.querySelector('button');
  expect(button.textContent).toBe('clear');
});

it('triggers the search for photos', () => {
  const spy = jest.spyOn(React, 'useEffect');

  act(() => {
    ReactDOM.render(
      <Provider store={photoStore}>
        <ConnectedApp />
      </Provider>,
      container,
    );
  });

  const input = container.querySelector('input');

  act(() => {
    input.dispatchEvent(new InputEvent('lovebirds'));
  });

  expect(spy).toHaveBeenCalledTimes(1);
  spy.mockRestore();
});
