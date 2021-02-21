import { Dispatch } from 'react';
import {
  getCards,
  getCard,
  deleteCardById,
  editCardById,
  EditCardDto,
} from '../../api';
import { ActionTypes } from '../actionTypes';
import { Action } from '../actions';

export const fetchCards = (filter: string = '', offset: number = 0) => async (
  dispatch: Dispatch<Action>
) => {
  dispatch({
    type: ActionTypes.FETCH_CARDS_START,
  });

  try {
    const result = await getCards(filter, offset);
    dispatch({
      type: ActionTypes.FETCH_CARDS_SUCCESS,
      payload: result,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.FETCH_CARDS_ERROR,
      payload: err.message,
    });
  }
};

export const clearCards = () => ({
  type: ActionTypes.CLEAR_CARDS,
});

export const fetchCard = (id: string) => async (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionTypes.FETCH_CARD_START,
  });

  try {
    const result = await getCard(id);
    dispatch({
      type: ActionTypes.FETCH_CARD_SUCCESS,
      payload: result,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.FETCH_CARD_ERROR,
      payload: err.message,
    });
  }
};

export const clearCard = () => ({
  type: ActionTypes.CLEAR_CARD,
});

export const deleteCard = (id: string) => async (
  dispatch: Dispatch<Action>
) => {
  try {
    await deleteCardById(id);
    dispatch({
      type: ActionTypes.DELETE_CARD_SUCCESS,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.DELETE_CARD_ERROR,
      payload: err.message,
    });
  }
};

export const editCard = (id: string, editData: EditCardDto) => async (
  dispatch: Dispatch<Action>
) => {
  try {
    const card = await editCardById(id, editData);

    dispatch({
      type: ActionTypes.EDIT_CARD_SUCCESS,
      payload: card,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.EDIT_CARD_ERROR,
      payload: err.message,
    });
  }
};

export const searchCards = (keyword: string) => ({
  type: ActionTypes.SEARCH_CARDS,
  payload: keyword,
});
