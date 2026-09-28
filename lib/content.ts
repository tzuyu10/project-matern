import sourceContent from "./project-content.json";

export type ContentBlock =
  | { type: "heading"; text: string; level?: number; italic?: boolean }
  | { type: "paragraph"; text: string; italic?: boolean }
  | { type: "listItem"; text: string; label?: string }
  | { type: "subItem"; text: string }
  | { type: "table"; rows: string[][] }
  | { type: "image"; index: number };

export type ContentSection = {
  id: string;
  title: string;
  blocks: ContentBlock[];
};

export type ApprovedTopicContent = {
  slug: string;
  title: string;
  description: string;
  sections: ContentSection[];
};

export const approvedContent = sourceContent as {
  source: string;
  about: Array<{ type: "heading" | "paragraph"; text: string; italic?: boolean }>;
  topics: ApprovedTopicContent[];
};

export function getApprovedTopic(slug: string) {
  return approvedContent.topics.find((topic) => topic.slug === slug);
}
