import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../test';
import Button, { Props } from './Button.component';

const setup = (props: Props) => {
  const setupProps = { ...props };
  return shallow(<Button {...setupProps} />);
};

const defaultProps: Props = {
  logLevel: 'info',
  category: 'card',
  prefix: 'delete',
  log: 'dummy',
  text: 'Delete',
};

test('renders without error', () => {
  const wrapper = setup(defaultProps);
  const component = findByTestAttr(wrapper, 'component-button');
  expect(component.length).toBe(1);
});

test('calls the analytic function', () => {
  const wrapper = setup(defaultProps);
  const component = findByTestAttr(wrapper, 'component-button');
  console.log = jest.fn();
  component.simulate('click');

  const { text, ...eventProperties } = defaultProps;

  expect(console.log).toHaveBeenCalledWith('analytics 1', {
    eventName: text,
    eventProperties,
  });
});

test('calls the onClick function', () => {
  const onClick = jest.fn();

  const wrapper = setup({ ...defaultProps, onClick });
  const component = findByTestAttr(wrapper, 'component-button');
  component.simulate('click');

  expect(onClick).toHaveBeenCalledTimes(1);
});
