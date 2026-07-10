import { fetchArchivedArticles } from "@/lib/feed-data";

export const dynamic = "force-dynamic";

const SITE_URL = "https://ksungz.github.io";
const FEED_URL = `${SITE_URL}/feed/feed.xml`;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toIso8601(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return new Date().toISOString();
  return d.toISOString();
}

export async function GET() {
  const articles = await fetchArchivedArticles(30, 0);

  const now = new Date().toISOString();
  const latestUpdated =
    articles.length > 0
      ? toIso8601(
          articles[0].published_at || articles[0].collected_at
        )
      : now;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<feed xmlns="http://www.w3.org/2005/Atom">\n`;
  xml += `  <title>Info Feed - ksungz</title>\n`;
  xml += `  <subtitle>개발, 비즈니스, 테크 정보 큐레이션 피드</subtitle>\n`;
  xml += `  <link href="${FEED_URL}" rel="self" type="application/atom+xml"/>\n`;
  xml += `  <link href="${SITE_URL}/feed" rel="alternate" type="text/html"/>\n`;
  xml += `  <id>${SITE_URL}/feed</id>\n`;
  xml += `  <updated>${latestUpdated}</updated>\n`;
  xml += `  <author>\n`;
  xml += `    <name>ksungz</name>\n`;
  xml += `    <uri>${SITE_URL}</uri>\n`;
  xml += `  </author>\n`;

  for (const article of articles) {
    const articleId = `${SITE_URL}/feed/feed.xml#entry-${article.id}`;
    const published = toIso8601(
      article.published_at || article.collected_at
    );
    const updated = toIso8601(article.collected_at);
    const category = article.source_category || "dev";
    const summary = article.summary || article.content || "";

    xml += `  <entry>\n`;
    xml += `    <id>${articleId}</id>\n`;
    xml += `    <title>${escapeXml(article.title)}</title>\n`;
    xml += `    <link href="${escapeXml(article.url)}" rel="alternate" type="text/html"/>\n`;
    xml += `    <published>${published}</published>\n`;
    xml += `    <updated>${updated}</updated>\n`;
    xml += `    <category term="${escapeXml(category)}"/>\n`;
    xml += `    <summary>${escapeXml(summary.slice(0, 500))}</summary>\n`;
    xml += `  </entry>\n`;
  }

  xml += `</feed>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}