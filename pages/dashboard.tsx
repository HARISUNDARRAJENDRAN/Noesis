import Head from "next/head";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { 
  Code2, BarChart3, Palette, Megaphone, Clock, DollarSign, 
  Users, TrendingUp, PenTool, Mic, Calculator, Atom, 
  Microscope, Beaker, Languages, FileText, MessageSquare, 
  Briefcase, GraduationCap, Newspaper, Cpu, Shield, 
  Lightbulb, Brain, Wrench, Dumbbell, Heart, CirclePlay,
  ChevronRight, Flame, Trophy, Menu, LogOut, Compass, 
  Video as VideoIcon, Zap, Box, Hammer, Apple, Leaf,
  BookOpen, Star, Eye, Rocket, ListVideo
} from "lucide-react";
import { useState } from "react";
import styles from "../styles/Dashboard.module.css";

// Genre data structure
interface Genre {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  count: string;
  backgroundImage: string;
}

// Mock user data
const mockUser = {
  name: "Alex",
  streak: 7,
  videosCompleted: 24,
  hoursWatched: 12,
  currentVideo: {
    title: "Advanced React Patterns",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    progress: 68,
    duration: "45 min",
  },
};

// Stagger animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
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

const DashboardPage: NextPage = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Genre sections data
  const skillBasedGenres: Genre[] = [
    {
      id: "coding-programming",
      title: "Coding & Programming",
      description: "Master programming languages and development skills",
      icon: Code2,
      count: "120+ videos",
      backgroundImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
    },
    {
      id: "data-science-ai",
      title: "Data Science & AI/ML",
      description: "Learn data analysis, machine learning, and AI",
      icon: BarChart3,
      count: "85+ videos",
      backgroundImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    },
    {
      id: "design",
      title: "Design (UI/UX, Graphic)",
      description: "Creative design skills and visual thinking",
      icon: Palette,
      count: "95+ videos",
      backgroundImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400",
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      description: "Master online marketing and growth strategies",
      icon: Megaphone,
      count: "70+ videos",
      backgroundImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    },
    {
      id: "productivity",
      title: "Productivity & Time Management",
      description: "Optimize your workflow and manage time effectively",
      icon: Clock,
      count: "45+ videos",
      backgroundImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400",
    },
  ];

  const academicGenres: Genre[] = [
    {
      id: "mathematics",
      title: "Mathematics",
      description: "From algebra to calculus and beyond",
      icon: Calculator,
      count: "8+ courses",
      backgroundImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400",
    },
    {
      id: "physics",
      title: "Physics",
      description: "Understanding the universe through science",
      icon: Atom,
      count: "6+ courses",
      backgroundImage: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400",
    },
    {
      id: "chemistry",
      title: "Chemistry",
      description: "Molecular science and reactions",
      icon: Beaker,
      count: "4+ courses",
      backgroundImage: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400",
    },
  ];

  const careerGenres: Genre[] = [
    {
      id: "resume-job-hunting",
      title: "Resume & Job Hunting",
      description: "Land your dream job with confidence",
      icon: FileText,
      count: "8+ guides",
      backgroundImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400",
    },
    {
      id: "interview-prep",
      title: "Interview Preparation",
      description: "Ace your interviews with proven strategies",
      icon: MessageSquare,
      count: "4+ courses",
      backgroundImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    },
    {
      id: "freelancing-remote",
      title: "Freelancing & Remote Work",
      description: "Build a successful remote career",
      icon: Briefcase,
      count: "6+ courses",
      backgroundImage: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400",
    },
    {
      id: "certifications",
      title: "Certifications",
      description: "AWS, Azure, PMP and more",
      icon: GraduationCap,
      count: "12+ prep courses",
      backgroundImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
    },
  ];

  const additionalSkillGenres: Genre[] = [
    {
      id: "financial-literacy",
      title: "Financial Literacy & Investing",
      description: "Build wealth and understand personal finance",
      icon: DollarSign,
      count: "60+ videos",
      backgroundImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400",
    },
    {
      id: "soft-skills",
      title: "Soft Skills",
      description: "Communication and leadership abilities",
      icon: Users,
      count: "55+ videos",
      backgroundImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
    },
    {
      id: "entrepreneurship",
      title: "Entrepreneurship & Startups",
      description: "Launch and grow your own business",
      icon: TrendingUp,
      count: "40+ videos",
      backgroundImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400",
    },
    {
      id: "writing-content",
      title: "Writing & Content Creation",
      description: "Craft compelling content and improve writing",
      icon: PenTool,
      count: "65+ videos",
      backgroundImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400",
    },
    {
      id: "public-speaking",
      title: "Public Speaking",
      description: "Build confidence and speaking skills",
      icon: Mic,
      count: "30+ videos",
      backgroundImage: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400",
    },
  ];

  const additionalAcademicGenres: Genre[] = [
    {
      id: "biology",
      title: "Biology",
      description: "Life sciences and biological systems",
      icon: Microscope,
      count: "8+ courses",
      backgroundImage: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400",
    },
    {
      id: "history-civics",
      title: "History & Civics",
      description: "Understanding past and governance",
      icon: Users,
      count: "10+ courses",
      backgroundImage: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400",
    },
    {
      id: "economics",
      title: "Economics",
      description: "Micro and macro economic principles",
      icon: TrendingUp,
      count: "6+ courses",
      backgroundImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
    },
    {
      id: "geography",
      title: "Geography",
      description: "World geography and earth sciences",
      icon: Compass,
      count: "5+ courses",
      backgroundImage: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400",
    },
    {
      id: "language-learning",
      title: "Language Learning",
      description: "English, French, Spanish and more",
      icon: Languages,
      count: "8+ courses",
      backgroundImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400",
    },
  ];

  const techNewsGenres: Genre[] = [
    {
      id: "tech-news",
      title: "Tech News & Product Launches",
      description: "Stay updated with latest technology",
      icon: Newspaper,
      count: "Daily updates",
      backgroundImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400",
    },
    {
      id: "ai-innovation",
      title: "AI & Innovation",
      description: "Cutting-edge AI developments",
      icon: Cpu,
      count: "Weekly insights",
      backgroundImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400",
    },
    {
      id: "startups-unicorns",
      title: "Startups & Unicorns",
      description: "Success stories and startup ecosystem",
      icon: TrendingUp,
      count: "Latest trends",
      backgroundImage: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400",
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity & Privacy",
      description: "Digital security and privacy trends",
      icon: Shield,
      count: "Security updates",
      backgroundImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
    },
    {
      id: "space-future-tech",
      title: "Space & Future Tech",
      description: "Exploration and emerging technologies",
      icon: Rocket,
      count: "Future insights",
      backgroundImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400",
    },
  ];

  const mindExpandingGenres: Genre[] = [
    {
      id: "trivia-facts",
      title: "Did You Know / Trivia",
      description: "Amazing facts and surprising truths",
      icon: Lightbulb,
      count: "8+ collections",
      backgroundImage: "https://images.unsplash.com/photo-1495592822108-9e6261896da8?w=400",
    },
    {
      id: "science-experiments",
      title: "Science Experiments",
      description: "Hands-on experiments and discoveries",
      icon: Beaker,
      count: "50+ experiments",
      backgroundImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400",
    },
    {
      id: "psychology",
      title: "Psychology & Human Behavior",
      description: "Understanding the human mind",
      icon: Brain,
      count: "Mind explorations",
      backgroundImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
    },
    {
      id: "philosophy",
      title: "Philosophy & Critical Thinking",
      description: "Deep questions about existence and meaning",
      icon: Lightbulb,
      count: "Thought-provoking",
      backgroundImage: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400",
    },
    {
      id: "documentaries",
      title: "Documentary & Deep Dives",
      description: "In-depth exploration of complex topics",
      icon: VideoIcon,
      count: "100+ videos",
      backgroundImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400",
    },
    {
      id: "life-hacks",
      title: "Life Hacks & Tips",
      description: "Practical tips for everyday life",
      icon: Zap,
      count: "Daily tips",
      backgroundImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400",
    },
  ];

  const diyGenres: Genre[] = [
    {
      id: "robotics-iot",
      title: "Robotics & IoT",
      description: "Build connected devices and robots",
      icon: Cpu,
      count: "Project tutorials",
      backgroundImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400",
    },
    {
      id: "3d-printing",
      title: "3D Printing & CAD",
      description: "Design and print 3D objects",
      icon: Box,
      count: "30+ projects",
      backgroundImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400",
    },
    {
      id: "electronics-arduino",
      title: "Electronics & Arduino",
      description: "Build electronic projects and circuits",
      icon: Wrench,
      count: "40+ tutorials",
      backgroundImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
    },
    {
      id: "diy-projects",
      title: "DIY Projects & Hacks",
      description: "Creative projects and home improvements",
      icon: Hammer,
      count: "50+ projects",
      backgroundImage: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400",
    },
    {
      id: "art-craft",
      title: "Art & Craft",
      description: "Creative arts and handmade crafts",
      icon: Palette,
      count: "60+ tutorials",
      backgroundImage: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
    },
  ];

  const lifestyleGenres: Genre[] = [
    {
      id: "health-fitness",
      title: "Health & Fitness",
      description: "Physical wellness and exercise",
      icon: Dumbbell,
      count: "8+ workout plans",
      backgroundImage: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400",
    },
    {
      id: "mental-wellness",
      title: "Mental Health & Wellness",
      description: "Mindfulness and emotional well-being",
      icon: Heart,
      count: "Wellness guides",
      backgroundImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    },
    {
      id: "nutrition-diet",
      title: "Nutrition & Diet",
      description: "Healthy eating and meal planning",
      icon: Apple,
      count: "40+ guides",
      backgroundImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
    },
    {
      id: "personal-finance",
      title: "Personal Finance",
      description: "Money management and budgeting",
      icon: DollarSign,
      count: "35+ lessons",
      backgroundImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400",
    },
    {
      id: "sustainable-living",
      title: "Sustainable Living",
      description: "Eco-friendly lifestyle and green practices",
      icon: Leaf,
      count: "25+ tips",
      backgroundImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400",
    },
  ];

  const levelBasedGenres: Genre[] = [
    {
      id: "school-level",
      title: "School Level (K-12)",
      description: "Comprehensive curriculum for school students",
      icon: BookOpen,
      count: "500+ videos",
      backgroundImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
    },
    {
      id: "college-prep",
      title: "College & University Prep",
      description: "Advanced topics for higher education",
      icon: GraduationCap,
      count: "200+ courses",
      backgroundImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400",
    },
    {
      id: "crash-courses",
      title: "Crash Courses",
      description: "Quick intensive learning sessions",
      icon: Zap,
      count: "100+ courses",
      backgroundImage: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400",
    },
    {
      id: "one-minute-lessons",
      title: "One-Minute Lessons",
      description: "Learn something new in 60 seconds",
      icon: Clock,
      count: "300+ lessons",
      backgroundImage: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=400",
    },
  ];

  const personalizedGenres: Genre[] = [
    {
      id: "trending-now",
      title: "Trending Now",
      description: "Most popular content right now",
      icon: TrendingUp,
      count: "Hot topics",
      backgroundImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    },
    {
      id: "recommended",
      title: "Recommended For You",
      description: "Personalized based on your interests",
      icon: Star,
      count: "Curated picks",
      backgroundImage: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=400",
    },
    {
      id: "most-watched",
      title: "Most Watched This Week",
      description: "Top content from the community",
      icon: Eye,
      count: "Popular picks",
      backgroundImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
    },
    {
      id: "quick-lessons",
      title: "Quick 5-Minute Lessons",
      description: "Perfect for busy schedules",
      icon: Clock,
      count: "200+ lessons",
      backgroundImage: "https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=400",
    },
  ];

  return (
    <>
      <Head>
        <title>Noesis — Dashboard</title>
        <meta name="description" content="Your personalized learning dashboard" />
      </Head>

      <div className={styles.container}>
        {/* Top Navigation */}
        <nav className={styles.topNav}>
          <button 
            className={styles.menuButton}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className={styles.menuIcon} />
          </button>
          <div className={styles.logo}>Noesis</div>
          <div className={styles.navLinks}>
            <button 
              className={styles.navLink}
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </button>
            <button 
              className={styles.navLink}
              onClick={() => router.push("/playlists")}
            >
              <ListVideo className={styles.navLinkIcon} />
              Playlists
            </button>
          </div>
          <div className={styles.userSection}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Hi, {mockUser.name}</span>
            </div>
            <button className={styles.logoutButton}>
              <LogOut className={styles.logoutIcon} />
            </button>
          </div>
        </nav>

        <motion.div
          className={styles.main}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Section */}
          <motion.section
            className={styles.heroSection}
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.heroGradient} />
            <div 
              className={styles.heroBackground}
              style={{
                backgroundImage: `url('${mockUser.currentVideo.thumbnail}')`,
              }}
            />
            
            {/* Animated particles */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className={styles.particle}
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            <div className={styles.heroContent}>
              <span className={styles.heroBadge}>Continue Watching</span>
              <h1 className={styles.heroTitle}>{mockUser.currentVideo.title}</h1>
              <div className={styles.heroMeta}>
                <span>{mockUser.currentVideo.duration}</span>
                <span>•</span>
                <span>{mockUser.currentVideo.progress}% Complete</span>
              </div>
              <div className={styles.heroActions}>
                <button className={styles.heroButtonPrimary}>
                  <CirclePlay className={styles.buttonIcon} />
                  Resume
                </button>
                <button className={styles.heroButtonOutline}>More Info</button>
              </div>
              <div className={styles.progressBarContainer}>
                <div 
                  className={styles.progressBar}
                  style={{ width: `${mockUser.currentVideo.progress}%` }}
                />
              </div>
            </div>
          </motion.section>

          {/* Quick Stats */}
          <motion.section className={styles.statsSection} variants={fadeInUp}>
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>Learning Streak</span>
                <Flame className={styles.statIcon} />
              </div>
              <div className={styles.statValue}>{mockUser.streak} days</div>
              <p className={styles.statMeta}>Keep it up! 🔥</p>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>Videos Completed</span>
                <CirclePlay className={styles.statIcon} />
              </div>
              <div className={styles.statValue}>{mockUser.videosCompleted}</div>
              <p className={styles.statMeta}>Great progress!</p>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>Hours Watched</span>
                <Clock className={styles.statIcon} />
              </div>
              <div className={styles.statValue}>{mockUser.hoursWatched}h</div>
              <p className={styles.statMeta}>This month</p>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <span className={styles.statLabel}>Achievement</span>
                <Trophy className={styles.statIcon} />
              </div>
              <div className={styles.statValue}>Gold</div>
              <p className={styles.statMeta}>Top 10% learner</p>
            </div>
          </motion.section>

          {/* Personalized Section */}
          <GenreSection
            title="Personalized For You"
            icon={Star}
            genres={personalizedGenres}
          />

          {/* Skill-Based Learning Section */}
          <GenreSection
            title="Skill-Based Learning"
            icon={Code2}
            genres={skillBasedGenres}
          />

          {/* Additional Skills Section */}
          <GenreSection
            title="More Skills"
            icon={TrendingUp}
            genres={additionalSkillGenres}
          />

          {/* Academic Subjects Section */}
          <GenreSection
            title="Academic Subjects"
            icon={GraduationCap}
            genres={academicGenres}
          />

          {/* Additional Academic Section */}
          <GenreSection
            title="More Academic Topics"
            icon={BookOpen}
            genres={additionalAcademicGenres}
          />

          {/* Career & Professional Section */}
          <GenreSection
            title="Career & Professional"
            icon={Briefcase}
            genres={careerGenres}
          />

          {/* Tech News & Trends Section */}
          <GenreSection
            title="Tech News & Trends"
            icon={Newspaper}
            genres={techNewsGenres}
          />

          {/* Mind-Expanding Section */}
          <GenreSection
            title="Mind-Expanding & Curiosity"
            icon={Lightbulb}
            genres={mindExpandingGenres}
          />

          {/* DIY & Hands-on Section */}
          <GenreSection
            title="DIY & Hands-on Learning"
            icon={Wrench}
            genres={diyGenres}
          />

          {/* Lifestyle Learning Section */}
          <GenreSection
            title="Lifestyle Learning"
            icon={Heart}
            genres={lifestyleGenres}
          />

          {/* Level-Based Section */}
          <GenreSection
            title="By Learning Level"
            icon={GraduationCap}
            genres={levelBasedGenres}
          />
        </motion.div>
      </div>
    </>
  );
};

// Genre Section Component
interface GenreSectionProps {
  title: string;
  icon: React.ElementType;
  genres: Genre[];
}

const GenreSection: React.FC<GenreSectionProps> = ({ title, icon: Icon, genres }) => {
  return (
    <motion.section className={styles.genreSection} variants={fadeInUp}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <div className={styles.sectionIconContainer}>
            <Icon className={styles.sectionIcon} />
          </div>
          {title}
        </h2>
        <button className={styles.seeAllButton}>
          See All <ChevronRight className={styles.chevronIcon} />
        </button>
      </div>

      <div className={styles.genreScroll}>
        <div className={styles.genreCards}>
          {genres.map((genre, index) => (
            <GenreCard key={genre.id} genre={genre} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Genre Card Component
interface GenreCardProps {
  genre: Genre;
  index: number;
}

const GenreCard: React.FC<GenreCardProps> = ({ genre, index }) => {
  const Icon = genre.icon;

  return (
    <motion.div
      className={styles.genreCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={styles.cardBackground}
        style={{ backgroundImage: `url('${genre.backgroundImage}')` }}
      />
      <div className={styles.cardPattern} />
      <div className={styles.cardGradient} />

      <div className={styles.cardContent}>
        <div className={styles.cardTop}>
          <div className={styles.cardIconContainer}>
            <Icon className={styles.cardIcon} />
          </div>
          <span className={styles.cardBadge}>{genre.count}</span>
        </div>

        <div className={styles.cardBody}>
          <div className={styles.cardInfo}>
            <h3 className={styles.cardTitle}>{genre.title}</h3>
            <p className={styles.cardDescription}>{genre.description}</p>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.cardAction}>
              <CirclePlay className={styles.playIcon} />
              <span>Start Learning</span>
            </div>
            <div className={styles.cardArrow}>
              <ChevronRight className={styles.arrowIcon} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cardHoverGlow} />
    </motion.div>
  );
};

export default DashboardPage;
