import { ActionTypes } from '../actionTypes';
import { Action } from '../actions';
import { Card, CARDS_LIMIT } from './../../api';

interface CardsState {
  loading: boolean;
  error: string | null;
  cards: Card[];
  keyword: string;
  selectedCard: Card | null;
  hasMore: boolean;
}

export const initial_state: CardsState = {
  loading: false,
  error: null,
  cards: [],
  keyword: '',
  selectedCard: null,
  hasMore: false,
};

const reducer = (
  state: CardsState = initial_state,
  action: Action | null
): CardsState => {
  if (!action) return state;
  switch (action.type) {
    case ActionTypes.FETCH_CARDS_START:
    case ActionTypes.FETCH_CARD_START:
      return { ...state, loading: true };
    case ActionTypes.FETCH_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        cards: [...state.cards, ...action.payload],
        hasMore: action.payload.length === CARDS_LIMIT,
      };
    case ActionTypes.CLEAR_CARDS:
      return {
        ...state,
        cards: [],
      };
    case ActionTypes.CLEAR_CARD:
      return {
        ...state,
        selectedCard: null,
      };
    case ActionTypes.FETCH_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedCard: action.payload,
      };
    case ActionTypes.FETCH_CARDS_ERROR:
    case ActionTypes.FETCH_CARD_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ActionTypes.DELETE_CARD_SUCCESS:
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.payload),
      };
    case ActionTypes.DELETE_CARD_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ActionTypes.EDIT_CARD_SUCCESS:
      return {
        ...state,
        cards: state.cards.map((card) => {
          return card.id === action.payload.id ? action.payload : card;
        }),
      };
    case ActionTypes.EDIT_CARD_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ActionTypes.SEARCH_CARDS:
      return { ...state, keyword: action.payload };
    default:
      return state;
  }
};

export default reducer;
