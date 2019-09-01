import getSplitter from './getSplitter';
import isNaNOrInfinity from './isNaNOrInfinity';
import detectCircle from './detectCircle';
import escapeString from './escapeString';
import appendIndent from './appendIndent';
import joinContent from './joinContent';
import { notStrictEqual } from 'assert';

const NULL = 'null' as const;

/**
 * - 转换值如果有toJSON()方法，该方法定义什么值将被序列化。
 * - 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
 * - 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
 * - undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。
 * - 函数、undefined被单独转换时，会返回undefined，如JSON.stringify(function(){}) or JSON.stringify(undefined).
 * - 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
 * - 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
 * - Date日期调用了toJSON()将其转换为了string字符串（同Date.toISOString()），因此会被当做字符串处理。
 * - NaN和Infinity格式的数值及null都会被当做null。
 * - 其他类型的对象，包括Map/Set/weakMap/weakSet，仅会序列化可枚举的属性。
 * - 尝试转换bigint会抛出错误
 * @param value
 * @param space
 */
export default function stringifyJson(
  value: any,
  space: number | string = ''
): string | undefined {
  /**
   * 尝试转换bigint会抛出错误
   */
  notStrictEqual(
    typeof value,
    'bigint',
    "BigInt value can't be serialized in JSON"
  );

  /**
   * 转换值如果有toJSON()方法，该方法定义什么值将被序列化。
   * Date日期调用了toJSON()将其转换为了string字符串（同Date.toISOString()），因此会被当做字符串处理。
   */
  if (
    value &&
    Object.prototype.hasOwnProperty.call(value, 'toJSON') &&
    typeof value.toJSON === 'function'
  ) {
    return stringifyJson(value.toJSON(), space);
  }

  /**
   * NaN和Infinity格式的数值及null都会被当做null
   */
  if (isNaNOrInfinity(value) || value === null) {
    return NULL;
  }

  /**
   * 布尔值、数字的包装对象在序列化过程中会自动转换成对应的原始值。
   */
  if (
    value instanceof Number ||
    value instanceof Boolean ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return value.toString();
  }

  /**
   * - undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。
   * - 函数、undefined被单独转换时，会返回undefined，如JSON.stringify(function(){}) or JSON.stringify(undefined).
   */
  if (
    value === undefined ||
    typeof value === 'function' ||
    typeof value === 'symbol'
  ) {
    return undefined;
  }

  if (typeof value === 'string' || value instanceof String) {
    return '"' + escapeString(value.toString()) + '"';
  }

  /**
   * 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
   */
  detectCircle(value);

  const splitter = getSplitter(space);

  if (Array.isArray(value)) {
    const result = value.map(v => {
      const tmp = stringifyJson(v, space);
      return tmp === undefined ? NULL : appendIndent(tmp, splitter);
    });
    return '[' + joinContent(result, splitter) + ']';
  }

  const entries = Object.entries(value)
    .reduce<Array<[string, string]>>((prev, cur) => {
      const tmp = stringifyJson(cur[1], space);
      return tmp === undefined
        ? prev
        : [...prev, [cur[0], appendIndent(tmp, splitter)]];
    }, [])
    .map(v => `"${v[0]}":${splitter ? ' ' : ''}${v[1]}`);
  return '{' + joinContent(entries, splitter) + '}';
}
