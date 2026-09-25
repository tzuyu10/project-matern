import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "About us" };

const team = [
  "Reese Ashley M. Dumlao",
  "Kristine Joy L. Engalan",
  "Hanie Lovelle A. Enriquez",
  "Lian Jae L. Ereño",
  "Ingrid Adrienne A. Erguiza",
  "Koby Breyvon L. Erguiza",
  "Faustine Setiel Erive",
  "Seann Oscer S. Estudillo",
  "Shea F. Fiedalino",
];

export default function About() {
  return <main id="main" className="container info-page about-page">
    <Image className="about-brand" src="/media/brand-logo.webp" alt="Project M.A.T.E.R.N." width={300} height={148} priority />
    <span className="eyebrow">ABOUT THE PROJECT & PEOPLE BEHIND IT</span>
    <h1>Kaalaman para sa mas handa<br /><em>at mas panatag na ina.</em></h1>
    <p className="lead" lang="fil">Para sa mga ilaw ng tahanan, kaalaman ang puhunan.</p>

    <section className="about-story" lang="fil">
      <h2>About the project</h2>
      <p>Ang Project M.A.T.E.R.N., o Maternal Awareness Through Effective Resource and Nursing Education, ay isang Plan-Do-Study-Act (PDSA) project na binuo ng mga nursing student ng Trinity University of Asia bilang bahagi ng asignaturang Nursing Leadership and Management.</p>
      <p>Layunin ng aming proyekto na magbigay ng kapaki-pakinabang at madaling maunawaang impormasyon tungkol sa kalusugan ng ina para sa mga buntis. Sa pamamagitan ng website na ito, nais naming makatulong sa mga ina na magkaroon ng sapat na kaalaman at maging mas handa sa bawat yugto ng kanilang pagbubuntis. Bilang mga nursing student, ginagamit namin ang aming kaalaman upang makapagbigay ng health education na maaaring maging gabay ng mga ina sa kanilang paglalakbay.</p>
    </section>

    <section className="team-section">
      <span className="eyebrow">TEAM PROJECT M.A.T.E.R.N.</span>
      <h2>Meet our team</h2>
      <p lang="fil">Kami ay mga fourth-year nursing student na nagsisikap na maisulong ang kaalaman, kamalayan, at empowerment para sa mga ina sa pamamagitan ng accessible at makabuluhang health education.</p>
      <div className="team-grid">{team.map((name) => <div key={name}>{name}</div>)}</div>
    </section>

    <Link className="button" href="/#topics">Explore the health topics <ArrowRight size={18} /></Link>
  </main>;
}
