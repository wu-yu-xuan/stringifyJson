import getSplitter from './getSplitter';

it('should get the right splitter', () => {
  expect(getSplitter()).toBe('');
  expect(getSplitter(2)).toBe('  ');
  expect(getSplitter(-1)).toBe('');
  expect(getSplitter(11)).toBe(' '.repeat(10));
  expect(getSplitter('')).toBe('');
  expect(getSplitter('123')).toBe('123');
  expect(getSplitter(' '.repeat(11))).toBe(' '.repeat(10));
});
