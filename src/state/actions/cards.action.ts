import { Card } from './../../api';
import { ActionTypes } from '../actionTypes';

export interface FetchCardsStart {
  type: ActionTypes.FETCH_CARDS_START;
}

export interface FetchCardsSuccess {
  type: ActionTypes.FETCH_CARDS_SUCCESS;
  payload: Card[];
}

export interface FetchCardsError {
  type: ActionTypes.FETCH_CARDS_ERROR;
  payload: string;
}

export interface ClearCards {
  type: ActionTypes.CLEAR_CARDS;
}

export interface ClearCard {
  type: ActionTypes.CLEAR_CARD;
}

export interface FetchCardStart {
  type: ActionTypes.FETCH_CARD_START;
}

export interface FetchCardSuccess {
  type: ActionTypes.FETCH_CARD_SUCCESS;
  payload: Card;
}

export interface FetchCardError {
  type: ActionTypes.FETCH_CARD_ERROR;
  payload: string;
}

export interface DeleteCardSuccess {
  type: ActionTypes.DELETE_CARD_SUCCESS;
  payload: string;
}

export interface DeleteCardError {
  type: ActionTypes.DELETE_CARD_ERROR;
  payload: string;
}

export interface EditCardSuccess {
  type: ActionTypes.EDIT_CARD_SUCCESS;
  payload: Card;
}

export interface EditCardError {
  type: ActionTypes.EDIT_CARD_ERROR;
  payload: string;
}

export interface SearchCards {
  type: ActionTypes.SEARCH_CARDS;
  payload: string;
}

export type Action =
  | FetchCardsStart
  | FetchCardsSuccess
  | FetchCardsError
  | ClearCards
  | ClearCard
  | FetchCardStart
  | FetchCardSuccess
  | FetchCardError
  | DeleteCardSuccess
  | DeleteCardError
  | EditCardSuccess
  | EditCardError
  | SearchCards;
