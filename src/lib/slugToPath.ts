export default function (slug: string): string {
  const year = slug.substr(0, 4);
  const month = slug.substr(4, 2);
  const day = slug.substr(6, 2);

  return `${year}/${month}/${day}`;
}
