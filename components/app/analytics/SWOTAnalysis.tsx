import type { ReactElement } from "react";
import styles from "../../../styles/DashboardAnalytics.module.css";

type SWOTQuadrant = {
  title: string;
  items: string[];
};

type SWOTAnalysisProps = {
  data: SWOTQuadrant[];
};

export function SWOTAnalysis({ data }: SWOTAnalysisProps): ReactElement {
  return (
    <div className={styles.swotGrid}>
      {data.map((quadrant) => (
        <article key={quadrant.title} className={styles.swotCard}>
          <h3 className={styles.swotTitle}>{quadrant.title}</h3>
          <ul className={styles.swotList}>
            {quadrant.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
