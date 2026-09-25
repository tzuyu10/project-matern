import { notFound } from "next/navigation";
import { topics } from "@/lib/topics";
import { TopicContent } from "@/components/topic-content";
export function generateStaticParams() { return topics.map(t => ({ slug: t.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return { title: topics.find(t => t.slug === slug)?.title || "Topic not found" }; }
export default async function TopicPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ trimester?: string }> }) {
  const { slug } = await params;
  const topic = topics.find(t => t.slug === slug);
  if (!topic) notFound();
  const { trimester } = await searchParams;
  return <TopicContent key={slug} topic={topic} initialStage={trimester} />;
}
