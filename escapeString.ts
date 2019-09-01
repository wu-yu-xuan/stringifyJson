export default function escapeString(str: string) {
  return str.replace(/\n/g, '\\n').replace(/\t/g, '\\t');
}
