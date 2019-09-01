import { strict } from 'assert';

/**
 * 检测目标对象是否存在环状引用, 如存在, 则报错
 * @param obj
 * @param cache
 */
export default function detectCircle(
  obj: { [key: string]: any },
  cache: Array<[string, any]> = []
) {
  if (typeof obj !== 'object' || obj === null) {
    return;
  }
  for (const [key, value] of Object.entries(obj)) {
    const newCache = [...cache, [key, value]];
    strict(
      !cache.find(v => v[1] === value),
      `detect circle reference: ${newCache.map(v => v[0]).join(' -> ')}`
    );
    detectCircle(value, [...cache, [key, value]]);
  }
}
