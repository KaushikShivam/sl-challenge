import React from 'react';
import { mount } from 'enzyme';
import { dummyCards, findByTestAttr, storeFactory } from '../../test';
import CardEdit from './CardEdit.component';
import { Provider } from 'react-redux';

const setup = () => {
  const store = storeFactory();
  const wrapper = mount(
    <Provider store={store}>
      <CardEdit card={dummyCards[0]} />
    </Provider>
  );
  return wrapper;
};

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-card-edit');
  expect(component.length).toBe(1);
});

describe('edit inputs', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-card-edit');

  describe('name input', () => {
    test('renders without error', () => {
      const nameInput = findByTestAttr(component, 'component-input__name');
      expect(nameInput.length).toBe(1);
    });

    test('renders no error when input is not empty', () => {
      const nameInput = findByTestAttr(wrapper, 'component-input__name');
      expect(nameInput.length).toBe(1);
      nameInput.simulate('change', { target: { name: 'name', value: 'text' } });
      const nameError = findByTestAttr(wrapper, 'component-error__name');
      expect(nameError.length).toBe(0);
    });

    test('renders error when input is empty', () => {
      const nameInput = findByTestAttr(wrapper, 'component-input__name');
      expect(nameInput.length).toBe(1);
      nameInput.simulate('change', { target: { name: 'name', value: '' } });
      const nameError = findByTestAttr(wrapper, 'component-error__name');
      expect(nameError.length).toBe(1);
    });
  });

  describe('url input', () => {
    test('renders without error', () => {
      const urlInput = findByTestAttr(component, 'component-input__url');
      expect(urlInput.length).toBe(1);
    });

    test('renders no error when input is not empty', () => {
      const urlInput = findByTestAttr(wrapper, 'component-input__name');
      expect(urlInput.length).toBe(1);
      urlInput.simulate('change', {
        target: { name: 'imageUrl', value: 'text' },
      });
      const urlError = findByTestAttr(wrapper, 'component-error__url');
      expect(urlError.length).toBe(0);
    });

    test('renders error when input is empty', () => {
      const urlInput = findByTestAttr(wrapper, 'component-input__url');
      expect(urlInput.length).toBe(1);
      urlInput.simulate('change', { target: { name: 'imageUrl', value: '' } });
      const urlError = findByTestAttr(wrapper, 'component-error__name');
      expect(urlError.length).toBe(1);
    });
  });
});
