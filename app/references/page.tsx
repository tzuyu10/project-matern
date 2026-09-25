import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { topics } from "@/lib/topics";

export const metadata = { title: "References" };

export default function References() {
  return <main id="main" className="container info-page">
    <span className="topic-icon"><BookOpen size={38} /></span>
    <span className="eyebrow">ROOM FOR TRUSTED KNOWLEDGE</span>
    <h1>Our references<span>.</span></h1>
    <p className="lead" lang="fil">Ang mga sanggunian at pinagmulan ng larawan mula sa opisyal na nilalaman ng Project M.A.T.E.R.N. ay nakalista sa hulihan ng bawat gabay.</p>
    <div className="reference-notice" lang="fil">Piliin ang isang paksa upang makita ang kumpletong listahan ng mga aklat, organisasyon, artikulo, at pinagmulan ng larawang ginamit para rito.</div>
    <div className="reference-topic-list">
      {topics.map((topic, index) => <Link className="reference-row" href={`/topics/${topic.slug}#section-references`} key={topic.slug}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <div><h2>{topic.title}</h2><p lang="fil">Tingnan ang mga sanggunian at image source para sa paksang ito.</p></div>
        <ArrowRight aria-hidden="true" />
      </Link>)}
    </div>
  </main>;
}
