import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { 
  Plus, CirclePlay, Edit3, Trash2, ListVideo, 
  Brain as BrainIcon, BarChart
} from "lucide-react";
import { useState } from "react";
import styles from "../styles/Playlists.module.css";

// Mock playlist data
interface Video {
  id: string;
  title: string;
  youtubeURL: string;
  duration: string;
  completionStatus: number;
}

interface Playlist {
  id: string;
  title: string;
  description: string;
  videos: Video[];
  overallProgress: number;
  aiRecommended?: boolean;
  createdAt: Date;
  tags: string[];
}

const mockPlaylists: Playlist[] = [
  {
    id: "1",
    title: "JavaScript Mastery",
    description: "Complete JavaScript from fundamentals to advanced concepts",
    videos: [
      { id: "v1", title: "JS Basics", youtubeURL: "https://youtube.com/watch?v=hdI2bqOjy3c", duration: "45:30", completionStatus: 100 },
      { id: "v2", title: "ES6 Features", youtubeURL: "https://youtube.com/watch?v=NCwa_xi0Uuc", duration: "30:15", completionStatus: 80 },
      { id: "v3", title: "Async JS", youtubeURL: "https://youtube.com/watch?v=PoRJizFvM7s", duration: "50:00", completionStatus: 0 },
    ],
    overallProgress: 60,
    aiRecommended: true,
    createdAt: new Date("2024-01-15"),
    tags: ["Programming", "JavaScript", "Web Development"],
  },
  {
    id: "2",
    title: "React Deep Dive",
    description: "Master React.js with hooks, context, and advanced patterns",
    videos: [
      { id: "v4", title: "React Hooks", youtubeURL: "https://youtube.com/watch?v=TNhaISOUy6Q", duration: "60:00", completionStatus: 100 },
      { id: "v5", title: "Context API", youtubeURL: "https://youtube.com/watch?v=5LrDIWkK_Bc", duration: "40:20", completionStatus: 50 },
    ],
    overallProgress: 75,
    createdAt: new Date("2024-02-10"),
    tags: ["React", "Frontend", "JavaScript"],
  },
  {
    id: "3",
    title: "Python for Data Science",
    description: "Learn Python fundamentals and data analysis libraries",
    videos: [
      { id: "v6", title: "Python Basics", youtubeURL: "https://youtube.com/watch?v=kqtD5dpn9C8", duration: "120:00", completionStatus: 100 },
      { id: "v7", title: "NumPy Tutorial", youtubeURL: "https://youtube.com/watch?v=QUT1VHiLmmI", duration: "45:00", completionStatus: 100 },
      { id: "v8", title: "Pandas Intro", youtubeURL: "https://youtube.com/watch?v=vmEHCJofslg", duration: "55:30", completionStatus: 60 },
    ],
    overallProgress: 87,
    aiRecommended: true,
    createdAt: new Date("2024-01-20"),
    tags: ["Python", "Data Science", "ML"],
  },
  {
    id: "4",
    title: "UI/UX Design Principles",
    description: "Fundamentals of user interface and user experience design",
    videos: [
      { id: "v9", title: "Design Thinking", youtubeURL: "https://youtube.com/watch?v=_r0VX-aU_T8", duration: "35:00", completionStatus: 0 },
      { id: "v10", title: "Figma Basics", youtubeURL: "https://youtube.com/watch?v=FTFaQWZBqQ8", duration: "48:15", completionStatus: 0 },
    ],
    overallProgress: 0,
    createdAt: new Date("2024-03-01"),
    tags: ["Design", "UI/UX", "Figma"],
  },
];

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const PlaylistsPage: NextPage = () => {
  const router = useRouter();
  const [playlists] = useState<Playlist[]>(mockPlaylists);

  const extractYouTubeID = (url: string): string | null => {
    if (!url) return null;
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) return watchMatch[1];
    const shortMatch = url.match(/youtu\.be\/([^?]+)/);
    if (shortMatch) return shortMatch[1];
    const embedMatch = url.match(/embed\/([^?]+)/);
    if (embedMatch) return embedMatch[1];
    if (url.length === 11 && !/[\/\?]/.test(url)) return url;
    return null;
  };

  const getThumbnailUrl = (video: Video): string => {
    const videoId = extractYouTubeID(video.youtubeURL);
    if (!videoId) return "/images/video-placeholder.jpg";
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  };

  const handlePlaylistClick = (playlistId: string) => {
    router.push(`/playlists/${playlistId}`);
  };

  return (
    <>
      <Head>
        <title>Noesis — My Playlists</title>
        <meta name="description" content="Manage your learning collections" />
      </Head>

      <div className={styles.container}>
        <motion.div
          className={styles.main}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <motion.div className={styles.header} variants={fadeInUp}>
            <div className={styles.headerContent}>
              <h1 className={styles.title}>My Playlists</h1>
              <p className={styles.subtitle}>Manage your learning collections</p>
            </div>
            <button
              className={styles.createButton}
              onClick={() => router.push("/playlists/create")}
            >
              <Plus className={styles.createIcon} />
              Create New Playlist
            </button>
          </motion.div>

          {/* Stats Overview */}
          <motion.div className={styles.statsGrid} variants={fadeInUp}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <ListVideo className={styles.icon} />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>{playlists.length}</div>
                <div className={styles.statLabel}>Total Playlists</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <CirclePlay className={styles.icon} />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>
                  {playlists.reduce((acc, p) => acc + p.videos.length, 0)}
                </div>
                <div className={styles.statLabel}>Total Videos</div>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <BarChart className={styles.icon} />
              </div>
              <div className={styles.statContent}>
                <div className={styles.statValue}>
                  {Math.round(
                    playlists.reduce((acc, p) => acc + p.overallProgress, 0) /
                      playlists.length
                  )}%
                </div>
                <div className={styles.statLabel}>Avg. Progress</div>
              </div>
            </div>
          </motion.div>

          {/* Playlists Grid */}
          <motion.div className={styles.playlistsGrid} variants={fadeInUp}>
            {playlists.map((playlist, index) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                thumbnailUrl={getThumbnailUrl(playlist.videos[0])}
                onClick={() => handlePlaylistClick(playlist.id)}
                index={index}
              />
            ))}
          </motion.div>

          {/* Empty State */}
          {playlists.length === 0 && (
            <motion.div className={styles.emptyState} variants={fadeInUp}>
              <ListVideo className={styles.emptyIcon} />
              <h3 className={styles.emptyTitle}>No playlists yet</h3>
              <p className={styles.emptyText}>
                Start by creating your first playlist
              </p>
              <button
                className={styles.emptyButton}
                onClick={() => router.push("/playlists/create")}
              >
                <Plus className={styles.buttonIcon} />
                Create Playlist
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

// Playlist Card Component
interface PlaylistCardProps {
  playlist: Playlist;
  thumbnailUrl: string;
  onClick: () => void;
  index: number;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  playlist,
  thumbnailUrl,
  onClick,
  index,
}) => {
  const [showActions, setShowActions] = useState(false);

  const handleRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Rename playlist:", playlist.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Delete playlist:", playlist.id);
  };

  return (
    <motion.div
      className={styles.playlistCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Thumbnail */}
      <div className={styles.thumbnail}>
        <Image
          src={thumbnailUrl}
          alt={playlist.title}
          width={400}
          height={225}
          className={styles.thumbnailImage}
        />
        <div className={styles.playOverlay}>
          <CirclePlay className={styles.playIcon} />
        </div>
        {playlist.aiRecommended && (
          <div className={styles.aiBadge}>
            <BrainIcon className={styles.badgeIcon} />
            AI Curated
          </div>
        )}
      </div>

      {/* Content */}
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{playlist.title}</h3>
        <p className={styles.cardDescription}>{playlist.description}</p>

        {/* Stats */}
        <div className={styles.cardStats}>
          <span className={styles.stat}>
            <ListVideo className={styles.statIcon} />
            {playlist.videos.length} videos
          </span>
          <span className={styles.stat}>
            {Math.round(playlist.overallProgress)}% complete
          </span>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${playlist.overallProgress}%` }}
          />
        </div>

        {/* Tags */}
        <div className={styles.tags}>
          {playlist.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        {showActions && (
          <motion.div
            className={styles.actions}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button className={styles.actionButton} onClick={handleRename}>
              <Edit3 className={styles.actionIcon} />
              Rename
            </button>
            <button
              className={`${styles.actionButton} ${styles.deleteButton}`}
              onClick={handleDelete}
            >
              <Trash2 className={styles.actionIcon} />
              Delete
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PlaylistsPage;
