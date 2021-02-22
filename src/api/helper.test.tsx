import { generatePage } from './helper';

describe('returns the proper page count', () => {
  test('return page one when no offset is provided', () => {
    expect(generatePage(0)).toBe(1);
  });

  test('returns correct page one when an offset is provided', () => {
    expect(generatePage(10)).toBe(2);
    expect(generatePage(20)).toBe(3);
  });
});
