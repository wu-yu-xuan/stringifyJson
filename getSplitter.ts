/**
 * 指定缩进用的空白字符串，用于美化输出（pretty-print）
 * 如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格
 * 如果该参数为字符串(字符串的前十个字母)，该字符串将被作为空格；如果该参数没有提供（或者为null）将没有空格。
 * @param space
 */
export default function getSplitter(space: number | string = '') {
  if (typeof space === 'number') {
    return ' '.repeat(Math.max(Math.min(space, 10), 0));
  }
  if (typeof space === 'string') {
    return space.slice(0, 10);
  }
  return '';
}
