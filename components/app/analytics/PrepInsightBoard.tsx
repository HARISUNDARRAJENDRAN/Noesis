import type { ReactElement } from "react";
import styles from "../../../styles/DashboardAnalytics.module.css";

type Insight = {
  label: string;
  value: string;
  description: string;
};

type PrepInsightBoardProps = {
  insights: Insight[];
};

export function PrepInsightBoard({ insights }: PrepInsightBoardProps): ReactElement {
  return (
    <div className={styles.insightGrid}>
      {insights.map((insight) => (
        <article key={insight.label} className={styles.insightCard}>
          <span className={styles.insightLabel}>{insight.label}</span>
          <span className={styles.insightValue}>{insight.value}</span>
          <p className={styles.insightDescription}>{insight.description}</p>
        </article>
      ))}
    </div>
  );
}
