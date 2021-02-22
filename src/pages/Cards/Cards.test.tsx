import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr, storeFactory } from '../../test';
import Cards from './Cards.page';
import { Provider } from 'react-redux';

const setup = () => {
  const store = storeFactory();
  const wrapper = mount(
    <Provider store={store}>
      <Cards />
    </Provider>
  );
  return wrapper;
};

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
  useLocation: () => ({
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: '5nvxpbdafa',
  }),
}));

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-cards');
  expect(component.length).toBe(1);
});
