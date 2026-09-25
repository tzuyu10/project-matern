"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, type ReactNode, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { getApprovedTopic, type ContentBlock, type ContentSection } from "@/lib/content";
import { articleImageWidth, contentImageSizes } from "@/lib/content-image-sizes";
import { displayHeading } from "@/lib/display-heading";
import { topics, type Topic } from "@/lib/topics";
import { TopicIcon } from "./icon";

function renderLinkedText(text: string) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, index) => part.startsWith("http")
    ? <a key={`${part}-${index}`} href={part.replace(/[.,]$/, "")} target="_blank" rel="noreferrer">{part}</a>
    : <Fragment key={index}>{part}</Fragment>);
}

function sectionHeadings(section: ContentSection) {
  return section.blocks
    .map((block, index) => block.type === "heading" ? { index, text: block.text } : null)
    .filter((item): item is { index: number; text: string } => Boolean(item));
}

function ContentBlockView({ block, index, topic }: { block: ContentBlock; index: number; topic: Topic }) {
  if (block.type === "paragraph") {
    const lowerText = block.text.toLowerCase();
    const sourceLine = lowerText.startsWith("photo retrieved from") || lowerText.startsWith("image source");
    return <p className={sourceLine ? "source-credit" : ""} lang="fil">{renderLinkedText(block.text)}</p>;
  }
  if (block.type === "listItem") return <ul className="approved-list"><li>{renderLinkedText(block.text)}</li></ul>;
  if (block.type === "table") return <div className="approved-table-wrap"><table className="approved-table"><tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{renderLinkedText(cell)}</td>)}</tr>)}</tbody></table></div>;
  if (block.type === "image") {
    const imageSource = topic.contentImages[block.index - 1] || topic.cardImage;
    const dimensions = contentImageSizes[imageSource];
    if (!dimensions) return null;

    const displayWidth = articleImageWidth(dimensions);
    return <figure className="approved-image" style={{ maxWidth: displayWidth + 36 }}>
      <Image
        src={imageSource}
        alt={`Larawan para sa ${topic.title}`}
        width={dimensions.width}
        height={dimensions.height}
        sizes={`(max-width: 760px) 90vw, ${displayWidth}px`}
        unoptimized
      />
    </figure>;
  }
  return <h3 id={`content-heading-${index}`} className={block.italic ? "is-italic" : ""}>{displayHeading(block.text)}</h3>;
}

export function TopicContent({ topic, initialStage }: { topic: Topic; initialStage?: string }) {
  const approved = getApprovedTopic(topic.slug);
  const sections = useMemo(() => approved?.sections || [], [approved]);
  const requestedSection = sections.some((section) => section.id === initialStage) ? initialStage! : sections[0]?.id || "";
  const [openSection, setOpenSection] = useState(requestedSection);
  const next = topics[(topics.findIndex((item) => item.slug === topic.slug) + 1) % topics.length];

  useEffect(() => {
    if (!initialStage || !sections.some((section) => section.id === initialStage)) return;
    const timer = window.setTimeout(() => document.getElementById(`section-${initialStage}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    return () => window.clearTimeout(timer);
  }, [initialStage, sections]);

  function jumpTo(targetId: string) {
    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${targetId}`);
    });
  }

  if (!approved) return null;

  return <main id="main" className="container content-page-layout">
    <aside className="contents-rail">
      <Link className="back-link" href="/#topics"><ArrowLeft size={16} /> All Health Topics</Link>
      <div className="contents-current">
        {topic.cardImage ? <Image src={topic.cardImage} alt="" width={42} height={42} /> : <span className="topic-icon"><TopicIcon name={topic.icon} size={22} /></span>}
        <strong>{topic.title}</strong>
      </div>
      <span className="contents-label">On This Page</span>
      <nav aria-label={`${topic.title} contents`}>
        {sections.map((section) => {
          const headings = sectionHeadings(section);
          return <div className="contents-group" key={section.id}>
            <button type="button" onClick={() => setOpenSection(openSection === section.id ? "" : section.id)} aria-expanded={openSection === section.id} aria-controls={`contents-${section.id}`}>
              <span>{displayHeading(section.title)}</span><ChevronDown size={15} />
            </button>
            <div id={`contents-${section.id}`} className="contents-dropdown" hidden={openSection !== section.id}>
              <button type="button" onClick={() => jumpTo(`section-${section.id}`)}>Section Overview</button>
              {headings.map((heading) => <button type="button" key={`${section.id}-${heading.index}`} onClick={() => jumpTo(`${section.id}-heading-${heading.index}`)}>{displayHeading(heading.text)}</button>)}
            </div>
          </div>;
        })}
      </nav>
      <div className="contents-other"><span>More Topics</span>{topics.filter((item) => item.slug !== topic.slug).slice(0, 4).map((item) => <Link key={item.slug} href={`/topics/${item.slug}`}>{item.title}</Link>)}</div>
    </aside>

    <div className="content-page-main">
      <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/#topics">Health Topics</Link><span>/</span><span>{topic.title}</span></div>
      <header className="content-page-hero">
        <div><span className="eyebrow">MATERNAL HEALTH GUIDE</span><h1>{topic.title}</h1><p lang="fil">{approved.description}</p></div>
        <span className="topic-icon topic-asset">{topic.cardImage ? <Image src={topic.cardImage} alt="" width={110} height={110} priority /> : <TopicIcon name={topic.icon} size={58} />}</span>
      </header>

      {topic.coverImage && <figure className="topic-cover"><Image src={topic.coverImage} alt={`Gabay para sa ${topic.title}`} width={1080} height={634} priority sizes="(max-width: 760px) 90vw, 750px" unoptimized /></figure>}

      <div className="content-sections">
        {sections.map((section, sectionIndex) => <section className={`stage-section ${section.id.startsWith("references") ? "reference-section" : ""}`} id={`section-${section.id}`} key={section.id}>
          <div className="stage-number">{String(sectionIndex + 1).padStart(2, "0")}</div>
          <div className="stage-title"><span>PROJECT M.A.T.E.R.N.</span><h2>{displayHeading(section.title)}</h2></div>
          <div className="approved-content">
            {section.blocks.map((block, blockIndex) => block.type === "heading"
              ? <h3 id={`${section.id}-heading-${blockIndex}`} className={block.italic ? "is-italic" : ""} key={blockIndex}>{displayHeading(block.text)}</h3>
              : <ContentBlockView key={blockIndex} block={block} index={blockIndex} topic={topic} />)}
          </div>
        </section>)}
      </div>

      <Link className="next-topic" href={`/topics/${next.slug}`}><div><span className="eyebrow">KEEP EXPLORING</span><h3>{next.title}</h3></div><ArrowRight /></Link>
    </div>
  </main>;
}
