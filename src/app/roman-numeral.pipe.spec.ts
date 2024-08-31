import { RomanNumeralPipe } from './roman-numeral.pipe';

describe('RomanNumeralPipe', () => {
  it('create an instance', () => {
    const pipe = new RomanNumeralPipe();
    expect(pipe).toBeTruthy();
  });
});
