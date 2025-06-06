import { getTextColor, getPagination } from './utils';

describe('getTextColor', () => {
  it('returns white text for dark background', () => {
    expect(getTextColor('#000000')).toBe('#ffffff');
  });

  it('returns black text for light background', () => {
    expect(getTextColor('#ffffff')).toBe('#000000');
  });
});

describe('getPagination', () => {
  it('calculates range for first page', () => {
    expect(getPagination(0, 10)).toEqual({ from: 0, to: 9 });
  });

  it('calculates range for second page', () => {
    expect(getPagination(1, 10)).toEqual({ from: 10, to: 19 });
  });
});
