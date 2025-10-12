import Head from "next/head";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  CirclePlay, Edit3, Share, Bookmark, User, Calendar, Clock,
  Info, Star, MessageCircle, Brain as BrainIcon, Lightbulb,
  TrendingUp, List, Trash2, ChevronRight, CheckCircle2, Circle
} from "lucide-react";
import styles from "../../styles/PlaylistDetail.module.css";

// Types
interface Video {
  id: string;
  title: string;
  youtubeURL: string;
  duration: string;
  completionStatus: number;
  description?: string;
}

interface Playlist {
  id: string;
  title: string;
  description: string;
  videos: Video[];
  overallProgress: number;
  aiRecommended?: boolean;
  createdAt: Date;
  lastModified: Date;
  tags: string[];
}

// Mock data
const mockPlaylistData: { [key: string]: Playlist } = {
  "1": {
    id: "1",
    title: "JavaScript Mastery",
    description: "Complete JavaScript from fundamentals to advanced concepts",
    videos: [
      {
        id: "v1",
        title: "JavaScript Basics - Variables, Data Types & Operators",
        youtubeURL: "https://youtube.com/watch?v=hdI2bqOjy3c",
        duration: "45:30",
        completionStatus: 100,
        description: "Learn the fundamentals of JavaScript including variables, data types, and operators."
      },
      {
        id: "v2",
        title: "ES6 Features - Arrow Functions, Destructuring & Spread",
        youtubeURL: "https://youtube.com/watch?v=NCwa_xi0Uuc",
        duration: "30:15",
        completionStatus: 80,
        description: "Master modern ES6 features that make JavaScript more powerful and concise."
      },
      {
        id: "v3",
        title: "Async JavaScript - Promises, Async/Await",
        youtubeURL: "https://youtube.com/watch?v=PoRJizFvM7s",
        duration: "50:00",
        completionStatus: 0,
        description: "Understand asynchronous programming patterns in JavaScript."
      },
    ],
    overallProgress: 60,
    aiRecommended: true,
    createdAt: new Date("2024-01-15"),
    lastModified: new Date("2024-03-10"),
    tags: ["Programming", "JavaScript", "Web Development", "ES6"],
  },
};

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

const PlaylistDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    if (id && typeof id === "string") {
      const data = mockPlaylistData[id];
      if (data) {
        setPlaylist(data);
        setCurrentVideo(data.videos[0]);
      }
    }
  }, [id]);

  if (!playlist) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading playlist...</p>
      </div>
    );
  }

  const completedVideos = playlist.videos.filter(
    (v) => v.completionStatus === 100
  ).length;

  const handleVideoSelect = (video: Video) => {
    setCurrentVideo(video);
  };

  const handleToggleCompletion = (videoId: string) => {
    setPlaylist((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        videos: prev.videos.map((v) =>
          v.id === videoId
            ? { ...v, completionStatus: v.completionStatus === 100 ? 0 : 100 }
            : v
        ),
      };
    });
  };

  const handleDeleteVideo = (videoId: string) => {
    setPlaylist((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        videos: prev.videos.filter((v) => v.id !== videoId),
      };
    });
  };

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

  const getEmbedUrl = (video: Video): string => {
    const videoId = extractYouTubeID(video.youtubeURL);
    if (!videoId) return "";
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <>
      <Head>
        <title>Noesis — {playlist.title}</title>
        <meta name="description" content={playlist.description} />
      </Head>

      <div className={styles.container}>
        <motion.div
          className={styles.main}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Playlist Header */}
          <motion.div className={styles.header} variants={fadeInUp}>
            <div className={styles.headerContent}>
              <div className={styles.titleRow}>
                <div className={styles.titleSection}>
                  <div className={styles.titleWithBadge}>
                    <h1 className={styles.title}>{playlist.title}</h1>
                    {playlist.aiRecommended && (
                      <div className={styles.aiBadge}>
                        <BrainIcon className={styles.badgeIcon} />
                        AI Curated
                      </div>
                    )}
                  </div>
                  <p className={styles.description}>{playlist.description}</p>
                </div>

                <div className={styles.actions}>
                  <button className={styles.actionButton}>
                    <Edit3 className={styles.actionIcon} />
                    Rename
                  </button>
                  <button className={styles.actionButton}>
                    <Share className={styles.actionIcon} />
                    Share
                  </button>
                  <button className={styles.actionButton}>
                    <Bookmark className={styles.actionIcon} />
                    Save
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>{playlist.videos.length}</div>
                  <div className={styles.statLabel}>Videos</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>{completedVideos}</div>
                  <div className={styles.statLabel}>Completed</div>
                </div>
                <div className={styles.statCard}>
                  <div className={styles.statValue}>
                    {Math.round(playlist.overallProgress)}%
                  </div>
                  <div className={styles.statLabel}>Progress</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className={styles.progressSection}>
                <div className={styles.progressHeader}>
                  <span>Overall Progress</span>
                  <span className={styles.progressValue}>
                    {Math.round(playlist.overallProgress)}%
                  </span>
                </div>
                <div className={styles.progressBarContainer}>
                  <div
                    className={styles.progressBar}
                    style={{ width: `${playlist.overallProgress}%` }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className={styles.tags}>
                {playlist.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Metadata */}
              <div className={styles.metadata}>
                <div className={styles.metaItem}>
                  <User className={styles.metaIcon} />
                  <span>Created by you</span>
                </div>
                <div className={styles.metaItem}>
                  <Calendar className={styles.metaIcon} />
                  <span>Created {playlist.createdAt.toLocaleDateString()}</span>
                </div>
                <div className={styles.metaItem}>
                  <Clock className={styles.metaIcon} />
                  <span>Updated {playlist.lastModified.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <motion.div className={styles.contentGrid} variants={fadeInUp}>
            {/* Left Column: Video Player & Tabs */}
            <div className={styles.leftColumn}>
              {/* Video Player */}
              {currentVideo && (
                <div className={styles.videoPlayer}>
                  <iframe
                    src={getEmbedUrl(currentVideo)}
                    title={currentVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.iframe}
                  />
                </div>
              )}

              {/* Tabs */}
              <div className={styles.tabs}>
                <div className={styles.tabsList}>
                  <button
                    className={`${styles.tab} ${
                      activeTab === "info" ? styles.tabActive : ""
                    }`}
                    onClick={() => setActiveTab("info")}
                  >
                    <Info className={styles.tabIcon} />
                    <span className={styles.tabLabel}>Info</span>
                  </button>
                  <button
                    className={`${styles.tab} ${
                      activeTab === "feedback" ? styles.tabActive : ""
                    }`}
                    onClick={() => setActiveTab("feedback")}
                  >
                    <Star className={styles.tabIcon} />
                    <span className={styles.tabLabel}>Feedback</span>
                  </button>
                  <button
                    className={`${styles.tab} ${
                      activeTab === "chatbot" ? styles.tabActive : ""
                    }`}
                    onClick={() => setActiveTab("chatbot")}
                  >
                    <MessageCircle className={styles.tabIcon} />
                    <span className={styles.tabLabel}>AI Chat</span>
                  </button>
                  <button
                    className={`${styles.tab} ${
                      activeTab === "mindmap" ? styles.tabActive : ""
                    }`}
                    onClick={() => setActiveTab("mindmap")}
                  >
                    <BrainIcon className={styles.tabIcon} />
                    <span className={styles.tabLabel}>Mind Map</span>
                  </button>
                  <button
                    className={`${styles.tab} ${
                      activeTab === "quiz" ? styles.tabActive : ""
                    }`}
                    onClick={() => setActiveTab("quiz")}
                  >
                    <Lightbulb className={styles.tabIcon} />
                    <span className={styles.tabLabel}>Quiz</span>
                  </button>
                  <button
                    className={`${styles.tab} ${
                      activeTab === "progress" ? styles.tabActive : ""
                    }`}
                    onClick={() => setActiveTab("progress")}
                  >
                    <TrendingUp className={styles.tabIcon} />
                    <span className={styles.tabLabel}>Analytics</span>
                  </button>
                </div>

                {/* Tab Content */}
                <div className={styles.tabContent}>
                  {activeTab === "info" && currentVideo && (
                    <InfoTab video={currentVideo} />
                  )}
                  {activeTab === "feedback" && <FeedbackTab />}
                  {activeTab === "chatbot" && <ChatbotTab />}
                  {activeTab === "mindmap" && <MindMapTab />}
                  {activeTab === "quiz" && <QuizTab />}
                  {activeTab === "progress" && (
                    <ProgressTab playlist={playlist} />
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Videos List */}
            <div className={styles.rightColumn}>
              <div className={styles.videosList}>
                <div className={styles.videosHeader}>
                  <div className={styles.videosTitle}>
                    <List className={styles.videosIcon} />
                    Playlist Videos
                  </div>
                  <div className={styles.videosSubtitle}>
                    {playlist.videos.length} videos •{" "}
                    {Math.round(playlist.overallProgress)}% complete
                  </div>
                </div>

                <div className={styles.videosScroll}>
                  {playlist.videos.map((video, index) => (
                    <VideoItem
                      key={video.id}
                      video={video}
                      index={index}
                      isActive={currentVideo?.id === video.id}
                      onSelect={() => handleVideoSelect(video)}
                      onToggleComplete={() => handleToggleCompletion(video.id)}
                      onDelete={() => handleDeleteVideo(video.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

// Video Item Component
interface VideoItemProps {
  video: Video;
  index: number;
  isActive: boolean;
  onSelect: () => void;
  onToggleComplete: () => void;
  onDelete: () => void;
}

const VideoItem: React.FC<VideoItemProps> = ({
  video,
  index,
  isActive,
  onSelect,
  onToggleComplete,
  onDelete,
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={`${styles.videoItem} ${isActive ? styles.videoItemActive : ""}`}
      onClick={onSelect}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={styles.videoNumber}>{index + 1}</div>
      <div className={styles.videoInfo}>
        <div className={styles.videoTitle}>{video.title}</div>
        <div className={styles.videoDuration}>{video.duration}</div>
      </div>
      <div className={styles.videoStatus}>
        {video.completionStatus === 100 ? (
          <CheckCircle2 className={styles.completedIcon} />
        ) : (
          <Circle className={styles.incompleteIcon} />
        )}
      </div>

      {showActions && (
        <div className={styles.videoActions} onClick={(e) => e.stopPropagation()}>
          <button
            className={styles.videoActionButton}
            onClick={onToggleComplete}
          >
            {video.completionStatus === 100 ? "Mark Incomplete" : "Mark Complete"}
          </button>
          <button
            className={`${styles.videoActionButton} ${styles.deleteVideoButton}`}
            onClick={onDelete}
          >
            <Trash2 className={styles.videoActionIcon} />
          </button>
        </div>
      )}
    </div>
  );
};

// Tab Components
const InfoTab: React.FC<{ video: Video }> = ({ video }) => (
  <div className={styles.infoTab}>
    <h3 className={styles.tabTitle}>Video Information</h3>
    <div className={styles.infoGrid}>
      <div className={styles.infoItem}>
        <span className={styles.infoLabel}>Title:</span>
        <span className={styles.infoValue}>{video.title}</span>
      </div>
      <div className={styles.infoItem}>
        <span className={styles.infoLabel}>Duration:</span>
        <span className={styles.infoValue}>{video.duration}</span>
      </div>
      <div className={styles.infoItem}>
        <span className={styles.infoLabel}>Status:</span>
        <span className={styles.infoValue}>
          {video.completionStatus}% complete
        </span>
      </div>
      {video.description && (
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Description:</span>
          <span className={styles.infoValue}>{video.description}</span>
        </div>
      )}
    </div>
  </div>
);

const FeedbackTab = () => (
  <div className={styles.tabPlaceholder}>
    <Star className={styles.placeholderIcon} />
    <h3>Rate this video</h3>
    <p>Share your feedback to help improve the learning experience</p>
  </div>
);

const ChatbotTab = () => (
  <div className={styles.tabPlaceholder}>
    <MessageCircle className={styles.placeholderIcon} />
    <h3>AI Learning Assistant</h3>
    <p>Ask questions about the playlist content and get instant answers</p>
  </div>
);

const MindMapTab = () => (
  <div className={styles.tabPlaceholder}>
    <BrainIcon className={styles.placeholderIcon} />
    <h3>AI-Generated Mind Map</h3>
    <p>Visual concept map with ML-enhanced summaries</p>
  </div>
);

const QuizTab = () => (
  <div className={styles.tabPlaceholder}>
    <Lightbulb className={styles.placeholderIcon} />
    <h3>Knowledge Quiz</h3>
    <p>Test your understanding with AI-generated questions</p>
  </div>
);

const ProgressTab: React.FC<{ playlist: Playlist }> = ({ playlist }) => {
  const completedCount = playlist.videos.filter(
    (v) => v.completionStatus === 100
  ).length;

  return (
    <div className={styles.progressTabContent}>
      <h3 className={styles.tabTitle}>Learning Analytics</h3>
      <div className={styles.progressStats}>
        <div className={styles.progressStatCard}>
          <div className={styles.progressStatValue}>
            {completedCount}/{playlist.videos.length}
          </div>
          <div className={styles.progressStatLabel}>Videos Completed</div>
        </div>
        <div className={styles.progressStatCard}>
          <div className={styles.progressStatValue}>
            {Math.round(playlist.overallProgress)}%
          </div>
          <div className={styles.progressStatLabel}>Overall Progress</div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetailPage;
