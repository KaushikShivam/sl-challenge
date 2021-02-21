import moxios from 'moxios';
import { initial_state } from '../reducers/cards.reducer';
import { storeFactory, dummyCards } from './../../test';
import { ActionTypes } from './../actionTypes';
import {
  fetchCards,
  clearCards,
  fetchCard,
  clearCard,
  deleteCard,
  searchCards,
  editCard,
} from './cards.creator';

describe('Cards action creator', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test('should fetch all cards successfully', () => {
    expect.assertions(1);

    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: dummyCards,
      });
    });

    return store.dispatch<any>(fetchCards()).then(() => {
      const newState = store.getState();
      expect(newState.cards.cards).toEqual(dummyCards);
    });
  });

  test('clear cards on clear cards creator', () => {
    const action = clearCards();
    expect(action).toEqual({
      type: ActionTypes.CLEAR_CARDS,
    });
  });

  test('should fetch a single card successfully', () => {
    expect.assertions(1);

    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: dummyCards[0],
      });
    });

    return store.dispatch<any>(fetchCard(dummyCards[0].id)).then(() => {
      const newState = store.getState();
      expect(newState.cards.selectedCard).toEqual(dummyCards[0]);
    });
  });

  test('clear card on clear card creator', () => {
    const action = clearCard();
    expect(action).toEqual({
      type: ActionTypes.CLEAR_CARD,
    });
  });

  test('should delete a single card successfully', () => {
    expect.assertions(1);
    const store = storeFactory({
      cards: { ...initial_state, cards: dummyCards },
    });

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
      });
    });

    return store.dispatch<any>(deleteCard(dummyCards[0].id)).then(() => {
      const newState = store.getState();
      expect(newState.cards.cards).not.toEqual(dummyCards[0]);
    });
  });

  test('should edit a single card successfully', () => {
    expect.assertions(1);
    const store = storeFactory({
      cards: { ...initial_state, cards: dummyCards },
    });

    const editedCard = { ...dummyCards[0], name: 'edited' };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: editedCard,
      });
    });

    return store.dispatch<any>(editCard(editedCard.id, editedCard)).then(() => {
      const newState = store.getState();
      expect(newState.cards.cards).toContain(editedCard);
    });
  });

  test('returns an action with correct search keyword', () => {
    const keyword = 'cards';
    const action = searchCards(keyword);
    expect(action).toEqual({
      type: ActionTypes.SEARCH_CARDS,
      payload: keyword,
    });
  });
});
