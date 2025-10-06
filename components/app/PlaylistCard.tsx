import Image from "next/image";
import type { ReactElement } from "react";
import styles from "../../styles/PlaylistCard.module.css";

export type PlaylistCardProps = {
  title: string;
  thumbnail: string;
  description?: string;
  videoCount: number;
  progress: number;
};

export function PlaylistCard({ title, thumbnail, description, videoCount, progress }: PlaylistCardProps): ReactElement {
  return (
    <article className={styles.card}>
      <div className={styles.thumbnailWrapper}>
        <Image src={thumbnail} alt="" className={styles.thumbnail} fill sizes="(max-width: 768px) 80vw, 360px" />
        <div className={styles.badge}>{videoCount} videos</div>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        {description ? <p className={styles.description}>{description}</p> : null}
        <div className={styles.progressRow}>
          <div className={styles.progressBarTrack}>
            <div
              className={styles.progressBarFill}
              style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            />
          </div>
          <span className={styles.progressLabel}>{progress}%</span>
        </div>
      </div>
    </article>
  );
}
