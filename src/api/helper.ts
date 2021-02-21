import { CARDS_LIMIT } from './constants';

/**
 * @function generatePage
 * @param {number} offset - total fetch cards lengh to offset the result.
 * @returns {number} - returns page number
 */
export const generatePage = (offset: number) =>
  offset === 0 ? 1 : offset / CARDS_LIMIT + 1;
