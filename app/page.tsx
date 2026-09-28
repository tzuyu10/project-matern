import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";
import { TopicExplorer } from "@/components/topic-explorer";

export default function Home() {
  return <main id="main">
    <section className="clinical-hero"><div className="clinical-hero-frame"><div className="clinical-hero-media"><Image src="/media/landing-page.png" alt="Ilustrasyon ng mga kababaihan sa pagbubuntis at pag-aalaga ng sanggol" fill sizes="100vw" preload className="landing-photo" /><div className="clinical-hero-shade" /><div className="clinical-hero-copy"><span className="hero-kicker">YOUR MATERNAL HEALTH COMPANION</span><h1>Care through every chapter of motherhood.</h1><p lang="fil">Malinaw at maalagang gabay para sa bawat hakbang ng pagbubuntis, panganganak, at pagiging ina.</p><div className="hero-actions"><a className="button" href="#topics">Explore health topics <ArrowRight size={18} /></a><Link className="hero-text-link" href="/about">Meet Project M.A.T.E.R.N.</Link></div></div></div><div className="hero-service-links" id="topics"><span>Start your journey</span><Link href="/topics/prenatal-care">Prenatal care</Link><Link href="/topics/childbirth">Childbirth</Link><Link href="/topics/postnatal-care">After birth</Link><Link href="/topics/nutrition-lifestyle">Nutrition</Link><a href="#health-topics">View all topics <ArrowRight size={15} /></a></div></div></section>
    <TopicExplorer />
    <section className="container together"><div className="together-icon"><Heart size={38} strokeWidth={1.2} /></div><div><span className="eyebrow">YOU'RE NOT ON YOUR OWN</span><h2>A little support. A world of difference.</h2><p>Ang pagiging ina ay paglalakbay na puno ng mga unang karanasan. Narito kami upang samahan ka.</p></div><Link href="/about" className="text-link">Get to know M.A.T.E.R.N. <ArrowRight size={18} /></Link></section>
  </main>;
}
