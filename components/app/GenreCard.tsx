import type { ReactElement } from "react";
import styles from "../../styles/GenreCard.module.css";

export type GenreCardProps = {
  title: string;
  count: string;
  highlight?: string;
};

export function GenreCard({ title, count, highlight }: GenreCardProps): ReactElement {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.count}>{count}</p>
      {highlight ? <span className={styles.highlight}>{highlight}</span> : null}
    </article>
  );
}
