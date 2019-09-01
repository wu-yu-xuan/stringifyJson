/**
 * 添加一级缩进
 * @param str
 * @param indent
 */
export default function appendIndent(str: string, indent: string) {
  return str.replace(new RegExp(`\n${indent}`, 'g'), `\n${indent}${indent}`);
}
