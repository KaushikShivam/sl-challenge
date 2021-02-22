import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr, storeFactory } from '../../test';
import CardDetail from './CardDetail.page';
import { Provider } from 'react-redux';

const setup = () => {
  const store = storeFactory();
  const wrapper = mount(
    <Provider store={store}>
      <CardDetail />
    </Provider>
  );
  return wrapper;
};

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
    location: { pathname: '' },
  }),
  useLocation: () => ({
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: '5nvxpbdafa',
  }),
  useParams: () => ({ id: 'dsd' }),
}));

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-card-detail');
  expect(component.length).toBe(1);
});
