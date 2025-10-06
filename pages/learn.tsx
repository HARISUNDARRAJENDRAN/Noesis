import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import type { NextPage } from "next";
import { AppLayout } from "../components/app/AppLayout";
import { ProtectedRoute } from "../components/app/ProtectedRoute";
import { Carousel } from "../components/app/Carousel";
import { VideoCard } from "../components/app/VideoCard";
import { PlaylistCard } from "../components/app/PlaylistCard";
import { mockDashboardData } from "../lib/mock-data";
import styles from "../styles/Learn.module.css";

const LearnPage: NextPage = () => {
  const continueLearning = mockDashboardData.continueLearning;
  const recommendationItems = mockDashboardData.recommendations;
  const trendingItems = mockDashboardData.trending;
  const recentPlaylists = mockDashboardData.recentPlaylists;

  return (
    <>
      <Head>
        <title>Noesis — Learn</title>
        <meta name="description" content="Your personalized launchpad with adaptive learning recommendations." />
      </Head>

      <ProtectedRoute>
        <AppLayout>
          <div className={styles.page}>
            {continueLearning ? (
              <section className={styles.continueSection}>
                <div className={styles.heroBadge}>Continue Learning</div>
                <div className={styles.continueGrid}>
                  <div>
                    <h1 className={styles.heroTitle}>{continueLearning.title}</h1>
                    <div className={styles.heroMeta}>
                      <span>Guided by {continueLearning.instructor}</span>
                      <span>{continueLearning.progressPercent}% complete</span>
                    </div>
                    <div className={styles.progressTrack}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${Math.min(Math.max(continueLearning.progressPercent, 0), 100)}%` }}
                      />
                    </div>
                    <div className={styles.heroActionRow}>
                      <Link
                        href={`/playlists/pl-mastering-react?video=${continueLearning.videoId}`}
                        className={styles.heroPrimaryAction}
                      >
                        Resume Session
                      </Link>
                      <span className={styles.heroSecondaryText}>Pick up right where you left off.</span>
                    </div>
                  </div>

                  <div className={styles.mediaCard}>
                    <Image
                      src={continueLearning.thumbnail}
                      alt=""
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      className={styles.mediaImage}
                    />
                    <div className={styles.mediaOverlay} aria-hidden="true" />
                  </div>
                </div>
              </section>
            ) : null}

            <Carousel
              id="recommended-for-you"
              title="Recommended for you"
              eyebrow="Curated pathways"
              items={recommendationItems}
              renderItem={(video) => (
                <VideoCard
                  title={video.title}
                  thumbnail={video.thumbnail}
                  duration={video.duration}
                  tag={video.tag}
                />
              )}
            />

            <Carousel
              id="trending-now"
              title="Trending Now"
              eyebrow="Momentum"
              items={trendingItems}
              renderItem={(video) => (
                <VideoCard
                  title={video.title}
                  thumbnail={video.thumbnail}
                  progressPercent={video.pulse}
                  tag="Trending"
                />
              )}
            />

            <Carousel
              id="recent-playlists"
              title="Recent Playlists"
              eyebrow="Keep the flow"
              items={recentPlaylists}
              renderItem={(playlist) => (
                <PlaylistCard
                  title={playlist.title}
                  thumbnail={playlist.thumbnail}
                  description="Pick back up with your curated sessions."
                  videoCount={playlist.videoCount}
                  progress={playlist.progress}
                />
              )}
            />
          </div>
        </AppLayout>
      </ProtectedRoute>
    </>
  );
};

export default LearnPage;
