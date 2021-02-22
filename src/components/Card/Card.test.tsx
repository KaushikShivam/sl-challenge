import React from 'react';
import { mount } from 'enzyme';
import { dummyCards, findByTestAttr, storeFactory } from '../../test';
import Card from './Card.component';
import { Provider } from 'react-redux';

const setup = () => {
  const store = storeFactory();
  const wrapper = mount(
    <Provider store={store}>
      <Card card={dummyCards[0]} />
    </Provider>
  );
  return wrapper;
};

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-card');
  expect(component.length).toBe(1);
});

test('renders the card img', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-card');
  const img = findByTestAttr(component, 'component-card__img');
  expect(img.length).toBe(1);
});

test('renders the card heading', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-card');
  const heading = findByTestAttr(component, 'component-card__heading');
  expect(heading.text()).toBe(dummyCards[0].name);
});

test('renders children buttons', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-card');
  const btns = findByTestAttr(component, 'component-card__btns');
  expect(btns.children().length).toBe(2);
});
