"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { type ApprovedTopicContent, type ContentBlock, type ContentSection } from "@/lib/content";
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

function displayBlocks(section: ContentSection): ContentBlock[] {
  if (!section.id.startsWith("references")) return section.blocks;

  const imageSourcesIndex = section.blocks.findIndex(
    (block) => block.type === "heading" && /^image sources?:?$/i.test(block.text.trim()),
  );
  const references = imageSourcesIndex === -1 ? section.blocks : section.blocks.slice(0, imageSourcesIndex);
  const imageSources = imageSourcesIndex === -1 ? [] : section.blocks.slice(imageSourcesIndex + 1);
  const hasEntry = (blocks: ContentBlock[]) => blocks.some(
    (block) => block.type === "paragraph" ? block.text.trim().length > 0 : block.type !== "heading",
  );

  return [
    ...references,
    ...(!hasEntry(references) ? [{ type: "paragraph" as const, text: "Walang nakalistang sanggunian para sa paksang ito." }] : []),
    imageSourcesIndex === -1 ? { type: "heading", text: "Image Sources" } : section.blocks[imageSourcesIndex],
    ...imageSources,
    ...(!hasEntry(imageSources) ? [{ type: "paragraph" as const, text: "Walang nakalistang pinagmulan ng larawan para sa paksang ito." }] : []),
  ];
}

function sectionHeadings(blocks: ContentBlock[]) {
  return blocks
    .map((block, index) => block.type === "heading" ? { index, text: block.text } : null)
    .filter((item): item is { index: number; text: string } => Boolean(item));
}

function ContentBlockView({ block, index, topic }: { block: ContentBlock; index: number; topic: Topic }) {
  if (block.type === "paragraph") {
    const lowerText = block.text.toLowerCase();
    const sourceLine = lowerText.startsWith("photo retrieved from") || lowerText.startsWith("image source");
    return <p className={`${sourceLine ? "source-credit " : ""}${block.italic ? "content-italic" : ""}`} lang="fil">{renderLinkedText(block.text)}</p>;
  }
  if (block.type === "listItem") return <ul className="approved-list"><li>{block.label && <strong className="content-list-label">{block.label}: </strong>}{renderLinkedText(block.text)}</li></ul>;
  if (block.type === "subItem") return <ul className="approved-list approved-sublist"><li>{renderLinkedText(block.text)}</li></ul>;
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
  return <h3 id={`content-heading-${index}`}>{displayHeading(block.text)}</h3>;
}

export function TopicContent({ topic, approved }: { topic: Topic; approved: ApprovedTopicContent }) {
  const sections = approved.sections;
  const [openSection, setOpenSection] = useState("");
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const [progress, setProgress] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const activeSectionTitle = displayHeading(sections.find((section) => section.id === activeSection)?.title || "");
  const topicIndex = topics.findIndex((item) => item.slug === topic.slug);
  const previous = topicIndex > 0 ? topics[topicIndex - 1] : null;
  const next = topics[(topicIndex + 1) % topics.length];

  useEffect(() => {
    let frame = 0;
    let hideTimer: ReturnType<typeof setTimeout>;
    const update = () => {
      frame = 0;
      const elements = sections.map((section) => document.getElementById(`section-${section.id}`));
      let current = 0;
      const readingLine = (document.querySelector(".site-header")?.getBoundingClientRect().height || 72) + 100;
      elements.forEach((element, index) => {
        if (element && element.getBoundingClientRect().top <= readingLine) current = index;
      });
      setActiveSection(sections[current]?.id || "");
      const first = elements[0]?.getBoundingClientRect();
      const last = elements[elements.length - 1]?.getBoundingClientRect();
      if (first && last) {
        const distance = Math.max(1, last.bottom - first.top - window.innerHeight + readingLine);
        setProgress(Math.min(100, Math.max(0, (readingLine - first.top) / distance * 100)));
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onScroll = () => {
      schedule();
      setScrolling(true);
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setScrolling(false), 1500);
    };
    const observer = new ResizeObserver(schedule);
    const content = document.querySelector(".content-sections");
    if (content) observer.observe(content);
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(hideTimer);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);

  function jumpTo(targetId: string) {
    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
      window.history.replaceState(window.history.state, "", `#${targetId}`);
    });
  }

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
          const headings = sectionHeadings(displayBlocks(section));
          return <div className={`contents-group ${activeSection === section.id ? "is-current-section" : ""}`} key={section.id}>
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
      <div className="contents-other contents-other-desktop"><span>More Topics</span>{topics.filter((item) => item.slug !== topic.slug).map((item) => <Link key={item.slug} href={`/topics/${item.slug}`}>{item.title}</Link>)}</div>
      <div className="contents-other contents-other-mobile">
        <span>More Topics</span>
        {previous && <Link href={`/topics/${previous.slug}`} rel="prev"><small><ArrowLeft size={15} aria-hidden="true" /> Previous Topic</small><span>{previous.title}</span></Link>}
        <Link href={`/topics/${next.slug}`} rel="next"><small>Next Topic <ArrowRight size={15} aria-hidden="true" /></small><span>{next.title}</span></Link>
      </div>
    </aside>

    <div className="content-page-main">
      <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/#topics">Health Topics</Link><span>/</span><span>{topic.title}</span></div>
      <header className="content-page-hero">
        <div><span className="eyebrow">MATERNAL HEALTH GUIDE</span><h1>{topic.title}</h1><p lang="fil">{approved.description}</p></div>
        <span className="topic-icon topic-asset">{topic.cardImage ? <Image src={topic.cardImage} alt="" width={110} height={110} priority /> : <TopicIcon name={topic.icon} size={58} />}</span>
      </header>

      {topic.coverImage && <figure className="topic-cover"><Image src={topic.coverImage} alt={`Gabay para sa ${topic.title}`} width={1080} height={634} priority sizes="(max-width: 760px) 90vw, 750px" unoptimized /></figure>}

      <div className={`reading-scroll-indicator${scrolling ? " is-scrolling" : ""}`} role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-valuetext={`${activeSectionTitle}, ${Math.round(progress)}%`}>
        <span className="reading-scroll-thumb" style={{ top: `${progress * .9}%` }} />
      </div>
      <div className="content-sections">
        {sections.map((section, sectionIndex) => <section className={`stage-section ${section.id.startsWith("references") ? "reference-section" : ""}`} id={`section-${section.id}`} key={section.id}>
          <div className="stage-number">{String(sectionIndex + 1).padStart(2, "0")}</div>
          <div className="stage-title"><span>PROJECT M.A.T.E.R.N.</span><h2>{displayHeading(section.title)}</h2></div>
          <div className="approved-content">
            {displayBlocks(section).map((block, blockIndex) => block.type === "heading"
              ? <h3 id={`${section.id}-heading-${blockIndex}`} key={blockIndex}>{displayHeading(block.text)}</h3>
              : <ContentBlockView key={blockIndex} block={block} index={blockIndex} topic={topic} />)}
          </div>
        </section>)}
      </div>

      <Link className="next-topic" href={`/topics/${next.slug}`}><div><span className="eyebrow">KEEP EXPLORING</span><h3>{next.title}</h3></div><ArrowRight /></Link>
    </div>
  </main>;
}
