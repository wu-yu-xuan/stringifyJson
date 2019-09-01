import isNaNOrInfinity from './isNaNOrInfinity';

it('should detect NaN or Infinity', () => {
  expect(isNaNOrInfinity(NaN)).toBe(true);
  expect(isNaNOrInfinity(Infinity)).toBe(true);
  expect(isNaNOrInfinity(-Infinity)).toBe(true);
  expect(isNaNOrInfinity(1e28)).toBe(false);
  expect(isNaNOrInfinity(1e-28)).toBe(false);
  expect(isNaNOrInfinity(0)).toBe(false);
});
