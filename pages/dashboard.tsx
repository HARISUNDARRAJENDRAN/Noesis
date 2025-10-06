import Head from "next/head";
import type { NextPage } from "next";
import { AppLayout } from "../components/app/AppLayout";
import { ProtectedRoute } from "../components/app/ProtectedRoute";
import { mockUser } from "../lib/mock-data";
import { SWOTAnalysis } from "../components/app/analytics/SWOTAnalysis";
import { TasksManager } from "../components/app/analytics/TasksManager";
import { PrepInsightBoard } from "../components/app/analytics/PrepInsightBoard";
import styles from "../styles/Dashboard.module.css";

const DashboardPage: NextPage = () => {
  const stats = [
    { label: "Completion", value: `${mockUser.progress.completion}%`, meta: "Overall curriculum" },
    { label: "Videos completed", value: mockUser.progress.videos.toString(), meta: "Across all playlists" },
    { label: "Minutes watched", value: mockUser.progress.minutesWatched.toString(), meta: "Lifetime" },
    { label: "Current streak", value: `${mockUser.progress.streak} days`, meta: mockUser.progress.upcomingMilestone },
  ];

  const swotData = [
    {
      title: "Strengths",
      items: ["High completion momentum", "Fast retention on technical modules"],
    },
    {
      title: "Opportunities",
      items: ["Explore storytelling cohort", "Join live AI salon next week"],
    },
    {
      title: "Focus",
      items: ["Shipping React performance upgrades", "Building AI literacy"],
    },
    {
      title: "Risks",
      items: ["Context switching between tracks", "Limited deep work windows"],
    },
  ];

  const tasks = [
    { id: "task-1", title: "Synthesize notes from Mastering React", due: "Apr 14", status: "In Progress" as const },
    { id: "task-2", title: "Submit reflection for AI/ML Fundamentals", due: "Apr 16", status: "Not Started" as const },
    { id: "task-3", title: "Schedule mentor sync", due: "Apr 18", status: "Not Started" as const },
  ];

  const insights = [
    {
      label: "Next milestone",
      value: "Module 5",
      description: "Complete the adaptive storytelling sprint to unlock cross-discipline recommendations.",
    },
    {
      label: "Energy window",
      value: "6:00 – 8:00 AM",
      description: "You retain 18% more when studying before your first meeting block.",
    },
  ];

  return (
    <>
      <Head>
        <title>Noesis — Dashboard</title>
        <meta name="description" content="Track your learning velocity, focus areas, and upcoming milestones." />
      </Head>

      <ProtectedRoute>
        <AppLayout>
          <div className={styles.page}>
            <header className={styles.headline}>
              <span className={styles.eyebrow}>Performance Studio</span>
              <h1 className={styles.title}>Your learning telemetry at a glance.</h1>
              <p className={styles.lead}>Stay on rhythm with streak insights, focus prompts, and cinematic prep boards.</p>
            </header>

            <section className={styles.statGrid}>
              {stats.map((stat) => (
                <article key={stat.label} className={styles.statCard}>
                  <span className={styles.statLabel}>{stat.label}</span>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statMeta}>{stat.meta}</span>
                </article>
              ))}
            </section>

            <section className={styles.layoutGrid}>
              <article className={styles.panel}>
                <div>
                  <h2 className={styles.panelTitle}>SWOT panorama</h2>
                  <p className={styles.panelSubtitle}>A living snapshot of your strengths and growth edges.</p>
                </div>
                <SWOTAnalysis data={swotData} />
              </article>

              <article className={styles.panel}>
                <div>
                  <h2 className={styles.panelTitle}>Tasks &amp; rituals</h2>
                  <p className={styles.panelSubtitle}>Micro-commitments tethered to your current modules.</p>
                </div>
                <TasksManager tasks={tasks} />
              </article>
            </section>

            <section className={styles.layoutGrid}>
              <article className={styles.panel}>
                <div>
                  <h2 className={styles.panelTitle}>Prep insights</h2>
                  <p className={styles.panelSubtitle}>Cues surfaced by the Noesis engine to amplify focus.</p>
                </div>
                <PrepInsightBoard insights={insights} />
              </article>
            </section>
          </div>
        </AppLayout>
      </ProtectedRoute>
    </>
  );
};

export default DashboardPage;
