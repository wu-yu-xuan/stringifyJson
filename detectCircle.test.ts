import detectCircle from './detectCircle';

it('works well when detect circle', () => {
  const obj1: any = {
    foo: {
      name: 'foo',
      bar: {
        name: 'bar',
        baz: {
          name: 'baz',
          aChild: []
        }
      }
    }
  };
  obj1.foo.bar.baz.aChild[0] = obj1.foo;
  expect(() => detectCircle(obj1)).toThrow();
  const obj2: any = {
    foo: {
      name: 'foo',
      bar: {
        name: 'bar',
        baz: {
          name: 'baz',
          aChild: null
        }
      }
    },
    aaa: {
      name: 'test',
      bbb: null
    }
  };
  obj2.aaa.bbb = obj2.foo;
  expect(() => detectCircle(obj2)).not.toThrow();
});
