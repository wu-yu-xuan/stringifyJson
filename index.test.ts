import stringifyJson from '.';

function test(obj: any) {
  for (const space of [
    '',
    undefined,
    2,
    '\t',
    'asd',
    -1,
    11,
    'asd'.repeat(10)
  ]) {
    expect(stringifyJson(obj, space)).toBe(JSON.stringify(obj, null, space));
  }
}

it('should stringify json right', () => {
  test({});
  test([]);
  test(true);
  test('foo');
  test([1, 'false', false]);
  test({ x: 5, y: 6 });
  // tslint:disable-next-line: no-construct
  test([new Number(1), new String('false'), new Boolean(false)]);
  test({ x: undefined, y: Object, z: Symbol('') });
  test([undefined, Object, Symbol('')]);
  test({ [Symbol('foo')]: 'foo' });
  test(
    Object.create(null, {
      x: { value: 'x', enumerable: false },
      y: { value: 'y', enumerable: true }
    })
  );
  test(new Map<string, string>([['foo', 'asd']]));
  test(new Set([1, 2, 3]));
});
