"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { topics } from "@/lib/topics";
import { TopicCard } from "./topic-card";
const filters = [{ id: "all", label: "All topics" }, { id: "pregnancy", label: "Pregnancy & birth" }, { id: "after-birth", label: "After birth" }, { id: "wellbeing", label: "Your wellbeing" }, { id: "support", label: "Care & support" }];
export function TopicExplorer() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const visible = topics.filter(t => (filter === "all" || t.category === filter) && `${t.title} ${t.preview} ${t.description}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <section id="health-topics" className="container topic-section" aria-label="Health Topics"><div className="section-heading"><div><span className="eyebrow">YOUR MATERNAL HEALTH COMPANION</span><h2>Care for every chapter<span>.</span></h2><p>Magsimula saan ka man naroroon. Hanapin ang mahalaga para sa iyo.</p></div><label className="search-box"><Search size={19} /><input aria-label="Search health topics" placeholder="Search a topic…" value={query} onChange={event => setQuery(event.target.value)} />{query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={16} /></button>}</label></div>
    <div className="filter-row"><div className="filters" aria-label="Filter topics">{filters.map(f => <button key={f.id} className={filter === f.id ? "selected" : ""} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>{f.label}</button>)}</div><span className="topic-count" role="status">{visible.length} {visible.length === 1 ? "topic" : "topics"} to explore</span></div>
    <div className="topic-grid">{visible.map((topic) => <TopicCard key={topic.slug} topic={topic} />)}</div>
    {visible.length === 0 && <div className="empty-state"><Search size={32} /><h3>No topics found</h3><p>Subukan ang ibang salita o tingnan ang lahat ng sampung paksa.</p><button className="button" onClick={() => { setQuery(""); setFilter("all"); }}>Reset search</button></div>}
    <div className="section-footnote"><span className="small-dot" /> Matuto tungkol sa kalusugan ng ina on your own pace, isang paksa sa bawat pagkakataon.</div>
  </section>;
}
