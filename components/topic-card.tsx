import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Topic } from "@/lib/topics";
import styles from "./topic-card.module.css";

export function TopicCard({ topic }: { topic: Topic }) {
  return (
    <article className={styles.card}>
      <Link
        className={styles.link}
        href={`/topics/${topic.slug}`}
        aria-label={`Explore ${topic.title}`}
      >
        <Image
          src={topic.cardImage}
          alt=""
          fill
          sizes="(max-width: 760px) 45vw, (max-width: 1023px) 30vw, (max-width: 1336px) 18vw, 230px"
          className={styles.art}
        />
        <h3 className={styles.heading}>{topic.title}</h3>
        <div className={styles.details}>
          <span className={styles.hoverTitle}>{topic.title}</span>
          <p className={styles.description} lang="fil">{topic.preview}</p>
          <span className={styles.action}>View topic <ArrowRight size={17} aria-hidden="true" /></span>
        </div>
      </Link>
    </article>
  );
}
