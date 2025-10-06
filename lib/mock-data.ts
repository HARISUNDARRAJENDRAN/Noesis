export type MockUser = {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
  progress: {
    completion: number;
    videos: number;
    minutesWatched: number;
    streak: number;
    upcomingMilestone: string;
  };
};

export type MockDashboardData = {
  continueLearning: {
    videoId: string;
    title: string;
    thumbnail: string;
    instructor: string;
    progressPercent: number;
  } | null;
  recommendations: Array<{
    videoId: string;
    title: string;
    thumbnail: string;
    duration: string;
    tag: string;
  }>;
  trending: Array<{
    videoId: string;
    title: string;
    thumbnail: string;
    pulse: number;
  }>;
  recentPlaylists: Array<{
    playlistId: string;
    title: string;
    progress: number;
    updatedAt: string;
    videoCount: number;
    thumbnail: string;
  }>;
};

export type MockGenreLibraryItem = {
  category: string;
  description: string;
  subGenres: Array<{
    id: string;
    title: string;
    count: string;
    highlight?: string;
  }>;
};

export type MockPlaylistSummary = {
  playlistId: string;
  title: string;
  videoCount: number;
  progress: number;
  thumbnail: string;
  updatedAt: string;
  description: string;
};

export type MockPlaylistDetail = {
  playlistId: string;
  title: string;
  description: string;
  estimatedTime: string;
  skillLevel: "Beginner" | "Intermediate" | "Advanced";
  coverImage: string;
  videos: Array<{
    videoId: string;
    title: string;
    duration: string;
    thumbnail: string;
    instructor: string;
    publishedAt: string;
  }>;
  transcript: Array<{
    timestamp: string;
    text: string;
  }>;
  notes: Array<{
    noteId: string;
    timestamp: string;
    text: string;
    tags?: string[];
  }>;
  chatbotHints: Array<{
    question: string;
    answer: string;
  }>;
};

export const mockUser: MockUser = {
  id: "user-001",
  name: "Priya Desai",
  avatarUrl: "/images/avatar-priya.png",
  role: "Product Strategist",
  progress: {
    completion: 38,
    videos: 48,
    minutesWatched: 1260,
    streak: 7,
    upcomingMilestone: "Complete 3 more modules to unlock Growth Path insights",
  },
};

export const mockDashboardData: MockDashboardData = {
  continueLearning: {
    videoId: "vid-advanced-hooks",
    title: "Advanced React Hooks in Production",
    thumbnail: "/images/videos/advanced-hooks.jpg",
    instructor: "Jonah Alvarez",
    progressPercent: 62,
  },
  recommendations: [
    {
      videoId: "vid-serverless-intro",
      title: "Intro to Serverless on AWS",
      thumbnail: "/images/videos/serverless-intro.jpg",
      duration: "19:26",
      tag: "Cloud Foundations",
    },
    {
      videoId: "vid-ui-design",
      title: "UI Design Principles for Product Teams",
      thumbnail: "/images/videos/ui-design.jpg",
      duration: "14:08",
      tag: "Design Systems",
    },
  ],
  trending: [
    {
      videoId: "vid-ai-agents",
      title: "The Rise of AI Agents",
      thumbnail: "/images/videos/ai-agents.jpg",
      pulse: 92,
    },
    {
      videoId: "vid-financial-literacy",
      title: "Mastering Financial Literacy",
      thumbnail: "/images/videos/financial-literacy.jpg",
      pulse: 85,
    },
  ],
  recentPlaylists: [
    {
      playlistId: "pl-mastering-react",
      title: "Mastering React",
      progress: 75,
      updatedAt: "2024-04-11T09:30:00Z",
      videoCount: 12,
      thumbnail: "/images/playlists/mastering-react.jpg",
    },
    {
      playlistId: "pl-aiml-fundamentals",
      title: "AI/ML Fundamentals",
      progress: 40,
      updatedAt: "2024-04-09T14:10:00Z",
      videoCount: 8,
      thumbnail: "/images/playlists/aiml-fundamentals.jpg",
    },
  ],
};

export const mockGenreLibrary: MockGenreLibraryItem[] = [
  {
    category: "Skill-Based Genres",
    description: "Deep dives that move you from curiosity to capability across disciplines.",
    subGenres: [
      { id: "sg-coding", title: "Coding & Programming", count: "150+ videos", highlight: "Updated weekly" },
      { id: "sg-data-science", title: "Data Science & AI/ML", count: "90+ videos" },
      { id: "sg-product", title: "Product Management", count: "65+ videos" },
    ],
  },
  {
    category: "Academic Genres",
    description: "Lecture-grade modules reimagined with cinematic clarity.",
    subGenres: [
      { id: "sg-math", title: "Mathematics", count: "200+ videos" },
      { id: "sg-physics", title: "Physics", count: "120+ videos" },
      { id: "sg-economics", title: "Economics", count: "95+ videos" },
    ],
  },
  {
    category: "Mindset & Career",
    description: "Frameworks and stories from leaders shaping what’s next.",
    subGenres: [
      { id: "sg-leadership", title: "Leadership Narratives", count: "80+ videos" },
      { id: "sg-creativity", title: "Creativity & Design Thinking", count: "70+ videos" },
    ],
  },
];

export const mockPlaylists: MockPlaylistSummary[] = [
  {
    playlistId: "pl-mastering-react",
    title: "Mastering React",
    videoCount: 12,
    progress: 75,
    thumbnail: "/images/playlists/mastering-react.jpg",
    updatedAt: "2024-04-11T09:30:00Z",
    description: "Go from fundamentals to performance-ready interfaces with React 18.",
  },
  {
    playlistId: "pl-aiml-fundamentals",
    title: "AI/ML Fundamentals",
    videoCount: 8,
    progress: 40,
    thumbnail: "/images/playlists/aiml-fundamentals.jpg",
    updatedAt: "2024-04-09T14:10:00Z",
    description: "Build intuition around core ML concepts and deploy your first models.",
  },
  {
    playlistId: "pl-product-strategy",
    title: "Product Strategy for Builders",
    videoCount: 10,
    progress: 55,
    thumbnail: "/images/playlists/product-strategy.jpg",
    updatedAt: "2024-04-07T18:25:00Z",
    description: "Narratives and frameworks from PMs shipping at scale.",
  },
];

export const mockPlaylistDetail: MockPlaylistDetail = {
  playlistId: "pl-mastering-react",
  title: "Mastering React",
  description: "A deep dive into modern React development, performance, and team-ready patterns.",
  estimatedTime: "6h 45m",
  skillLevel: "Intermediate",
  coverImage: "/images/playlists/mastering-react-cover.jpg",
  videos: [
    {
      videoId: "vid-advanced-hooks",
      title: "Advanced React Hooks in Production",
      duration: "15:30",
      thumbnail: "/images/videos/advanced-hooks.jpg",
      instructor: "Jonah Alvarez",
      publishedAt: "2024-03-18",
    },
    {
      videoId: "vid-state-zustand",
      title: "State Management with Zustand",
      duration: "12:45",
      thumbnail: "/images/videos/zustand.jpg",
      instructor: "Ava Chen",
      publishedAt: "2024-03-12",
    },
    {
      videoId: "vid-react-performance",
      title: "React Performance Playbook",
      duration: "18:02",
      thumbnail: "/images/videos/react-performance.jpg",
      instructor: "Priya Desai",
      publishedAt: "2024-03-08",
    },
  ],
  transcript: [
    { timestamp: "00:01", text: "Welcome back! Let's set the stage for advanced hooks." },
    { timestamp: "00:12", text: "We'll explore useReducer patterns for complex state." },
    { timestamp: "02:24", text: "Notice how useMemo stabilizes heavy computations." },
  ],
  notes: [
    { noteId: "note-001", timestamp: "02:15", text: "Big-O implications when memoizing derived data." },
    { noteId: "note-002", timestamp: "08:50", text: "Use useCallback for event handlers in list rendering." },
    { noteId: "note-003", timestamp: "12:10", text: "Profile components to identify wasted renders.", tags: ["performance", "profiling"] },
  ],
  chatbotHints: [
    {
      question: "How do I decide between useMemo and memoizing at component level?",
      answer: "Use useMemo for expensive computations inside a render. Use React.memo when the component rerenders due to unchanged props. Combine both when derived data is costly and the component renders frequently.",
    },
    {
      question: "What are common pitfalls with Zustand?",
      answer: "Avoid mutating state directly inside the store setter. Use slices to keep store modular and prefer selectors with shallow compare to reduce rerenders.",
    },
  ],
};
