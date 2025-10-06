import type { ReactElement } from "react";
import styles from "../../../styles/DashboardAnalytics.module.css";

export type TaskItem = {
  id: string;
  title: string;
  due: string;
  status: "Not Started" | "In Progress" | "Complete";
};

type TasksManagerProps = {
  tasks: TaskItem[];
};

export function TasksManager({ tasks }: TasksManagerProps): ReactElement {
  return (
    <div className={styles.tasksList}>
      {tasks.map((task) => (
        <div key={task.id} className={styles.taskItem}>
          <div className={styles.taskInfo}>
            <h3 className={styles.taskTitle}>{task.title}</h3>
            <span className={styles.taskMeta}>Due {task.due}</span>
          </div>
          <span className={styles.taskStatus}>{task.status}</span>
        </div>
      ))}
    </div>
  );
}
