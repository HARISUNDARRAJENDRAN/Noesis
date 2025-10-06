import Image from "next/image";
import type { ReactElement } from "react";
import styles from "../../styles/VideoCard.module.css";

export type VideoCardProps = {
  title: string;
  thumbnail: string;
  duration?: string;
  tag?: string;
  progressPercent?: number;
};

export function VideoCard({ title, thumbnail, duration, tag, progressPercent }: VideoCardProps): ReactElement {
  return (
    <article className={styles.card}>
      <div className={styles.thumbnailWrapper}>
        <Image src={thumbnail} alt="" className={styles.thumbnail} fill sizes="(max-width: 768px) 70vw, 320px" />
        {duration ? <span className={styles.duration}>{duration}</span> : null}
        {tag ? <span className={styles.tag}>{tag}</span> : null}
      </div>
      <h3 className={styles.title}>{title}</h3>
      {typeof progressPercent === "number" ? (
        <div className={styles.progress}>
          <div className={styles.progressBar} style={{ width: `${Math.min(Math.max(progressPercent, 0), 100)}%` }} />
        </div>
      ) : null}
    </article>
  );
}
