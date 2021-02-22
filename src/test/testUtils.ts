import { initial_state } from './../state/reducers/cards.reducer';
import { ReactWrapper, ShallowWrapper } from 'enzyme';
import { createStore } from 'redux';
import { bindMiddlewares } from './../state';
import rootReducer, { RootState } from './../state/reducers';

export const storeFactory = (
  initialState: RootState = { cards: initial_state }
) => {
  return createStore(rootReducer, initialState, bindMiddlewares());
};

export const dummyCards = [
  {
    id: '5ce27b5b89230f002e13f607',
    name: 'little',
    imageUrl:
      'https://static.streamloots.com/e19c7bf6-ca3e-49a8-807e-b2e9a1a47524/9f9e1020-55fa-445b-a68d-e8c9ebda55be.png',
    count: {
      total: 0,
    },
  },
  {
    id: '5ce27b5b89230f002e13f608',
    name: 'Guide me',
    imageUrl:
      'https://static.streamloots.com/e19c7bf6-ca3e-49a8-807e-b2e9a1a47524/6d8d9eab-54f4-43c7-b4d6-eb7c942aec4b.png',
    count: {
      total: 0,
    },
  },
];

export const findByTestAttr = (
  wrapper: ShallowWrapper | ReactWrapper,
  val: string
) => {
  return wrapper.find(`[data-test="${val}"]`);
};
