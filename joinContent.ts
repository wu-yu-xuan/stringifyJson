export default function joinContent(content: string[], splitter: string) {
  return (
    (splitter && content.length ? `\n${splitter}` : '') +
    content.join(splitter ? `,\n${splitter}` : ',') +
    (splitter && content.length ? '\n' : '')
  );
}
