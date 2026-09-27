import styles from "./loading-skeleton.module.css";

function LoadingMessage() {
  return <span className={styles.srOnly} role="status">Naglo-load ang pahina…</span>;
}

function Line({ className = "" }: { className?: string }) {
  return <span className={`${styles.skeleton} ${styles.line} ${className}`} />;
}

export function HomeSkeleton() {
  return <main id="main" className={styles.shell} aria-busy="true">
    <LoadingMessage />
    <div className={styles.homeHero} aria-hidden="true">
      <div className={styles.heroCopy}>
        <Line className={styles.eyebrow} />
        <Line className={styles.titleWide} />
        <Line className={styles.titleMedium} />
        <Line className={styles.titleShort} />
        <Line className={styles.bodyWide} />
        <Line className={styles.bodyMedium} />
        <span className={`${styles.skeleton} ${styles.button}`} />
      </div>
      <div className={`${styles.skeleton} ${styles.heroImage}`} />
    </div>
    <div className={styles.journey} aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <Line key={index} />)}</div>
    <section className={styles.topics} aria-hidden="true">
      <Line className={styles.eyebrow} />
      <Line className={styles.sectionTitle} />
      <Line className={styles.bodyMedium} />
      <div className={styles.filterRow}>{Array.from({ length: 5 }, (_, index) => <Line key={index} />)}</div>
      <div className={styles.cardGrid}>{Array.from({ length: 8 }, (_, index) => <div className={styles.card} key={index}><div className={`${styles.skeleton} ${styles.cardArt}`} /><Line className={styles.cardTitle} /></div>)}</div>
    </section>
  </main>;
}

export function TopicSkeleton() {
  return <main id="main" className={`${styles.shell} ${styles.topicLayout}`} aria-busy="true">
    <LoadingMessage />
    <aside className={styles.rail} aria-hidden="true">
      <Line className={styles.railBack} />
      <div className={styles.railCurrent}><span className={`${styles.skeleton} ${styles.railIcon}`} /><Line className={styles.railTitle} /></div>
      <Line className={styles.eyebrow} />
      {Array.from({ length: 4 }, (_, index) => <Line className={styles.railItem} key={index} />)}
    </aside>
    <div className={styles.article} aria-hidden="true">
      <Line className={styles.breadcrumb} />
      <div className={styles.articleHero}>
        <div><Line className={styles.eyebrow} /><Line className={styles.titleMedium} /><Line className={styles.bodyWide} /><Line className={styles.bodyMedium} /></div>
        <span className={`${styles.skeleton} ${styles.articleIcon}`} />
      </div>
      <Line className={styles.sectionTitle} />
      <Line className={styles.bodyWide} />
      <Line className={styles.bodyMedium} />
      <Line className={styles.bodyWide} />
      <div className={`${styles.skeleton} ${styles.articleMedia}`} />
    </div>
  </main>;
}

export function InfoSkeleton({ variant }: { variant: "about" | "references" }) {
  return <main id="main" className={`${styles.shell} ${styles.info}`} aria-busy="true">
    <LoadingMessage />
    <div aria-hidden="true">
      <div className={`${styles.skeleton} ${variant === "about" ? styles.infoLogo : styles.infoIcon}`} />
      <Line className={styles.eyebrow} />
      <Line className={styles.infoTitle} />
      <Line className={styles.infoTitleShort} />
      <Line className={styles.bodyWide} />
      <Line className={styles.bodyMedium} />
      <div className={styles.infoRows}>{Array.from({ length: 3 }, (_, index) => <div key={index}><Line className={styles.bodyMedium} /><Line className={styles.bodyWide} /></div>)}</div>
    </div>
  </main>;
}
