import { dummyCards } from '../../test';
import { ActionTypes } from '../actionTypes';
import cardsReducer, { initial_state } from './cards.reducer';

test('returns default state when no action is provided', () => {
  const newState = cardsReducer(undefined, null);
  expect(newState).toEqual(initial_state);
});

test('returns state with loading to true upon receiving an action of type `FETCH_CARDS_START`', () => {
  const newState = cardsReducer(undefined, {
    type: ActionTypes.FETCH_CARDS_START,
  });
  expect(newState.loading).toBe(true);
});

test('returns state with loading to true upon receiving an action of type `FETCH_CARD_START`', () => {
  const newState = cardsReducer(undefined, {
    type: ActionTypes.FETCH_CARD_START,
  });
  expect(newState.loading).toBe(true);
});

test('returns state with cards to an array of Cards upon receiving an action of type `FETCH_CARDS_SUCCESS`', () => {
  const newState = cardsReducer(undefined, {
    type: ActionTypes.FETCH_CARDS_SUCCESS,
    payload: dummyCards,
  });
  expect(newState.cards).toEqual(dummyCards);
  expect(newState.cards.length).toBe(dummyCards.length);
});

test('returns state with an empty cards array upon receiving an action of type `CLEAR_CARDS`', () => {
  const state = { ...initial_state, cards: dummyCards };
  const newState = cardsReducer(state, {
    type: ActionTypes.CLEAR_CARDS,
  });
  expect(newState.cards).toEqual([]);
  expect(newState.cards.length).toBe(0);
});

test('returns state with a null selectedCard upon receiving an action of type `CLEAR_CARD`', () => {
  const state = {
    ...initial_state,
    selectedCard: dummyCards[0],
  };
  const newState = cardsReducer(state, {
    type: ActionTypes.CLEAR_CARD,
  });
  expect(newState.selectedCard).toBeNull();
});

test('returns state with a selectedCard upon receiving an action of type `FETCH_CARD_SUCCESS`', () => {
  const newState = cardsReducer(initial_state, {
    type: ActionTypes.FETCH_CARD_SUCCESS,
    payload: dummyCards[0],
  });
  expect(newState.selectedCard).toEqual(dummyCards[0]);
});

test('returns state with an error upon receiving an action of type `FETCH_CARD_ERROR`', () => {
  const newState = cardsReducer(initial_state, {
    type: ActionTypes.FETCH_CARD_ERROR,
    payload: 'Error message',
  });
  expect(newState.error).toBeDefined();
  expect(newState.error).toEqual('Error message');
});

test('returns state with an error upon receiving an action of type `FETCH_CARDS_ERROR`', () => {
  const newState = cardsReducer(initial_state, {
    type: ActionTypes.FETCH_CARDS_ERROR,
    payload: 'Error message',
  });
  expect(newState.error).toBeDefined();
  expect(newState.error).toEqual('Error message');
});

test('returns state when the delete card is remvoed from cards array upon receiving an action of type `DELETE_CARD_SUCCESS`', () => {
  const state = { ...initial_state, cards: dummyCards };
  const newState = cardsReducer(state, {
    type: ActionTypes.DELETE_CARD_SUCCESS,
    payload: dummyCards[0].id,
  });
  expect(newState.cards).not.toContain(dummyCards[0]);
});

test('returns state with an error upon receiving an action of type `DELETE_CARD_ERROR`', () => {
  const newState = cardsReducer(initial_state, {
    type: ActionTypes.DELETE_CARD_ERROR,
    payload: 'Error message',
  });
  expect(newState.error).toBeDefined();
  expect(newState.error).toEqual('Error message');
});

test('returns state when the edited card in the cards array upon receiving an action of type `EDIT_CARD_SUCCESS`', () => {
  const state = { ...initial_state, cards: dummyCards };

  const editData = { name: 'New Card' };
  const editedCard = { ...dummyCards[0], ...editData };

  const newState = cardsReducer(state, {
    type: ActionTypes.EDIT_CARD_SUCCESS,
    payload: editedCard,
  });
  expect(newState.cards).toContain(editedCard);
});

test('returns state with an error upon receiving an action of type `EDIT_CARD_ERROR`', () => {
  const newState = cardsReducer(initial_state, {
    type: ActionTypes.EDIT_CARD_ERROR,
    payload: 'Error message',
  });
  expect(newState.error).toBeDefined();
  expect(newState.error).toEqual('Error message');
});

test('returns state with a keyword upon receiving an action of type `SEARCH_CARDS`', () => {
  const newState = cardsReducer(initial_state, {
    type: ActionTypes.SEARCH_CARDS,
    payload: 'keyword',
  });
  expect(newState.keyword).toBeDefined();
  expect(newState.keyword).toBe('keyword');
});
