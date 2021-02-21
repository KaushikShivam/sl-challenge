import { RootState } from './../reducers';

export const getCards = (state: RootState) => state.cards.cards;

export const getCard = (state: RootState) => state.cards.selectedCard;

export const getCardsLoading = (state: RootState) => state.cards.loading;

export const getCardsError = (state: RootState) => state.cards.error;

export const getKeyword = (state: RootState) => state.cards.keyword;

export const getHasMore = (state: RootState) => state.cards.hasMore;
