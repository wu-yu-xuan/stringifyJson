/**
 * 判断是否是 `NaN` 和 `Infinity` 格式的数值
 * @param num
 */
export default function isNaNOrInfinity(num: any) {
  return typeof num === 'number' && !Number.isFinite(num);
}
