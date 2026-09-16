export type BlogFaqItem = {
  q: string;
  a: string;
};

function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractFaqFromMarkdown(body: string): BlogFaqItem[] {
  const heading = /^##\s+frequently asked questions\s*$/im;
  const match = heading.exec(body);
  if (!match || match.index === undefined) return [];

  const afterHeading = body.slice(match.index + match[0].length);
  const nextH2 = afterHeading.search(/^##\s+/m);
  const section = (nextH2 === -1 ? afterHeading : afterHeading.slice(0, nextH2)).trim();
  if (!section) return [];

  const chunks = section.split(/^###\s+/m).slice(1);
  const items: BlogFaqItem[] = [];

  for (const chunk of chunks) {
    const newline = chunk.search(/\r?\n/);
    const q = (newline === -1 ? chunk : chunk.slice(0, newline)).trim();
    const a = stripMarkdown(newline === -1 ? "" : chunk.slice(newline + 1));
    if (q && a) items.push({ q, a });
  }

  return items;
}
