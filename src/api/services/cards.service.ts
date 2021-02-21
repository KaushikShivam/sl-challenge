import { sendUserCards } from './../../analytics/analytics2';
import { BASE_URL, CARDS_ENDPOINT, CARDS_LIMIT } from './../constants';
import { Card, EditCardDto } from './../models';
import axios from 'axios';
import { generatePage } from '../helper';

const CARDS_RESOURCE_ENDPOINT = `${BASE_URL}${CARDS_ENDPOINT}`;

/**
 * @function getCards
 * @param {string} filter - name filter to search by name.
 * @param {number}  offset - total cards length to offset the results
 * @returns {Card[]} - returns array of cards
 */
export const getCards = async (
  filter: string = '',
  offset: number = 0
): Promise<Card[]> => {
  try {
    let url = `${CARDS_RESOURCE_ENDPOINT}`;
    // Pagination
    const page = generatePage(offset);

    url = `${url}?_page=${page}&_limit=${CARDS_LIMIT}`;
    // Filter
    if (filter) url = `${url}&name_like=${filter}`;

    const { data } = await axios.get<Card[]>(url);

    sendUserCards('authenticated user', data.length); // Sends user card analytics
    return data;
  } catch (err) {
    throw err;
  }
};

/**
 * @function getCard
 * @param {string} id - id of card to find.
 * @returns {Card} - return Card with provided id
 */
export const getCard = async (id: string): Promise<Card> => {
  try {
    let url = `${CARDS_RESOURCE_ENDPOINT}/${id}`;
    const { data } = await axios.get<Card>(url);
    return data;
  } catch (err) {
    throw err;
  }
};

/**
 * @function deleteCardById
 * @param {string} id - id of card to delete.
 * @returns {void} - returns nothing
 */
export const deleteCardById = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${CARDS_RESOURCE_ENDPOINT}/${id}`);
  } catch (err) {
    throw err;
  }
};

/**
 * @function editCardById
 * @param {string} id - id of card to edit.
 * @param {EditCardDto} editData - edited data to update the card
 * @returns {Card} - return Card with provided id
 */
export const editCardById = async (
  id: string,
  editData: EditCardDto
): Promise<Card> => {
  try {
    const { data } = await axios.patch<Card>(
      `${CARDS_RESOURCE_ENDPOINT}/${id}`,
      editData
    );
    return data;
  } catch (err) {
    throw err;
  }
};
