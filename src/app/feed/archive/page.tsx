import { fetchArchivedArticles } from "@/lib/feed-data";
import { ArchiveClient } from "./ArchiveClient";
import "../feed.css";

export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  const initialArticles = await fetchArchivedArticles(20, 0);

  return <ArchiveClient initialArticles={initialArticles} />;
}