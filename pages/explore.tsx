import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { AppLayout } from "../components/app/AppLayout";
import { ProtectedRoute } from "../components/app/ProtectedRoute";
import { Carousel } from "../components/app/Carousel";
import { GenreCard } from "../components/app/GenreCard";
import { mockGenreLibrary } from "../lib/mock-data";
import styles from "../styles/Explore.module.css";

const ExplorePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Noesis — Explore</title>
        <meta name="description" content="Explore the full Noesis content library across genres and disciplines." />
      </Head>

      <ProtectedRoute>
        <AppLayout>
          <div className={styles.page}>
            <section className={styles.hero}>
              <span className={styles.heroEyebrow}>Discovery Studio</span>
              <h1 className={styles.heroTitle}>Chart new pathways across every discipline.</h1>
              <p className={styles.heroLead}>
                Browse cinematic learning genres crafted with world-class practitioners. Stack your own curriculum or dive into curated
                collections designed to accelerate your goals.
              </p>
              <div className={styles.heroFooter}>
                <span>
                  <strong>{mockGenreLibrary.length}</strong> genre groups
                </span>
                <span>Weekly drops &amp; live cohorts</span>
                <span>Everything available with your membership</span>
              </div>
            </section>

            {mockGenreLibrary.map((category) => {
              const slug = category.category
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, "")
                .trim()
                .replace(/\s+/g, "-");

              return (
                <section key={category.category} className={styles.categorySection}>
                  <Carousel
                    id={`category-${slug}`}
                    title={category.category}
                    eyebrow="Genre Collection"
                    action={
                      <div className={styles.categoryActionGroup}>
                        <p className={styles.categoryDescription}>{category.description}</p>
                        <Link href={`/explore/${slug}`} className={styles.categoryAction}>
                          View collection
                        </Link>
                      </div>
                    }
                    items={category.subGenres}
                    renderItem={(subGenre) => (
                      <GenreCard title={subGenre.title} count={subGenre.count} highlight={subGenre.highlight} />
                    )}
                  />
                </section>
              );
            })}
          </div>
        </AppLayout>
      </ProtectedRoute>
    </>
  );
};

export default ExplorePage;
