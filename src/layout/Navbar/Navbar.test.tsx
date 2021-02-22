import { Provider } from 'react-redux';
import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr, storeFactory } from '../../test';
import Navbar from './Navbar.component';

const setup = () => {
  const store = storeFactory();
  const wrapper = mount(
    <Provider store={store}>
      <Navbar />
    </Provider>
  );
  return wrapper;
};

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-navbar');
  expect(component.length).toBe(1);
});

test('calls keyword state on input change', () => {
  const wrapper = setup();
  const navInput = findByTestAttr(wrapper, 'component-search');
  navInput.simulate('change', { target: { value: 'text' } });

  wrapper.update();
  expect(navInput.getDOMNode<HTMLInputElement>().value).toBe('text');
});
