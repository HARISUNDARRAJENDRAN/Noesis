# StreamSmart Dashboard Design System - Complete Replication Guide

## Overview
This document provides a comprehensive guide to replicate the exact design, layout, and component structure used in the StreamSmart dashboard. The dashboard features a Netflix-inspired interface with dark theme, purple accents, and sophisticated animations.

---

## 1. DESIGN SYSTEM & COLOR PALETTE

### Primary Colors
```css
--background: 240 10% 3.5%;        /* Near-black background */
--foreground: 0 0% 98%;            /* White text */
--primary: 256 86% 66%;             /* Purple primary (#8B5CF6) */
--primary-foreground: 0 0% 100%;    /* White on primary */
--secondary: 262 83% 58%;           /* Deeper purple (#7C3AED) */
--accent: 256 86% 66%;              /* Same as primary */
--muted: 240 4% 18%;                /* Dark gray */
--muted-foreground: 0 0% 70%;       /* Light gray text */
--border: 240 4% 14%;               /* Subtle borders */
--card: 240 6% 8%;                  /* Card background */
```

### Background System
- **Base Background**: Pure black (`#000000`) with gradient overlays
- **Hero Section**: Multi-layered gradients:
  - `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%)`
  - `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 100%)`
  - Background image with cover sizing

### Shadow System
```css
/* Card shadows with primary color tint */
box-shadow: 0 20px 25px -5px rgba(139, 92, 246, 0.15), 
            0 10px 10px -5px rgba(139, 92, 246, 0.08);

/* Hover shadows */
box-shadow: 0 25px 50px -12px rgba(139, 92, 246, 0.25);
```

---

## 2. LAYOUT STRUCTURE

### Main Container
```tsx
<motion.div 
  className="space-y-12 bg-black min-h-screen"
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
```

### Section Spacing
- **Vertical spacing between sections**: `space-y-12` (3rem / 48px)
- **Inner content padding**: `px-4` (1rem / 16px)
- **Card gap in horizontal scrolls**: `gap-4` (1rem / 16px)

### Responsive Breakpoints
- Mobile: Default (< 640px)
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 3. HERO SECTION (Netflix-Style)

### Structure
```tsx
<motion.div 
  className="relative overflow-hidden rounded-3xl h-[70vh] flex items-end"
  style={{
    backgroundImage: `
      linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%),
      linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 100%),
      url('[VIDEO_THUMBNAIL]')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
```

### Key Features
1. **Height**: 70vh (70% of viewport height)
2. **Corner radius**: `rounded-3xl` (1.5rem / 24px)
3. **Multi-layered gradients** for depth
4. **Hover scale effect**: `scale(1.02)` with 0.6s duration
5. **Content positioned at bottom**: `flex items-end`

### Hero Content Layout
```tsx
<div className="p-12 z-10 max-w-2xl">
  {/* Badge */}
  <Badge className="mb-4">Continue Watching</Badge>
  
  {/* Title */}
  <h1 className="text-5xl font-bold text-white mb-4">
    {videoTitle}
  </h1>
  
  {/* Metadata */}
  <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
    <span>{duration}</span>
    <span>•</span>
    <span>{progress}% Complete</span>
  </div>
  
  {/* Description */}
  <p className="text-gray-300 text-lg mb-8">
    {description}
  </p>
  
  {/* Actions */}
  <div className="flex gap-4">
    <Button>
      <CirclePlay /> Resume
    </Button>
    <Button variant="outline">
      More Info
    </Button>
  </div>
</div>
```

### Animated Particles
```tsx
{Array.from({ length: 6 }).map((_, i) => (
  <motion.div
    key={i}
    className="absolute w-2 h-2 bg-white/30 rounded-full"
    style={{
      left: `${20 + i * 15}%`,
      top: `${30 + (i % 3) * 20}%`,
    }}
    animate={{
      y: [0, -20, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.5, 1]
    }}
    transition={{
      duration: 3 + i * 0.5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
))}
```

---

## 4. GENRE CARDS (HORIZONTAL SCROLL)

### Container Structure
```tsx
<motion.section className="space-y-6 w-full">
  {/* Section Header */}
  <div className="flex items-center justify-between px-4">
    <h2 className="text-4xl font-bold text-white flex items-center gap-3">
      <div className="p-2 rounded-xl bg-primary">
        <IconComponent className="h-6 w-6 text-white" />
      </div>
      {sectionTitle}
    </h2>
    <Button variant="ghost">
      See All <ChevronRightIcon />
    </Button>
  </div>
  
  {/* Scrollable Cards */}
  <div className="relative group">
    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-4">
      {/* Cards here */}
    </div>
  </div>
</motion.section>
```

### Individual Genre Card
```tsx
<Card 
  className="w-[320px] h-56 cursor-pointer transition-all duration-300 
             hover:scale-105 hover:z-10 bg-gradient-to-br from-gray-900 
             to-black border border-gray-800 relative overflow-hidden"
  style={{ 
    boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.15)' 
  }}
>
  {/* Background Image Layer */}
  <div 
    className="absolute inset-0 bg-cover bg-center opacity-15 
               group-hover:opacity-25 transition-opacity"
    style={{ backgroundImage: `url('[CATEGORY_IMAGE]')` }}
  />
  
  {/* Pattern Overlay */}
  <div 
    className="absolute inset-0 opacity-5 group-hover:opacity-10"
    style={{ 
      backgroundImage: 'radial-gradient(circle at 20% 80%, 
                        rgba(120,119,198,0.3) 0%, transparent 50%)' 
    }}
  />
  
  {/* Dark Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t 
                  from-black via-black/70 to-black/30" />
  
  {/* Content */}
  <CardContent className="p-5 h-full flex flex-col relative z-10">
    <div className="flex items-start justify-between mb-4">
      <div className="p-2.5 rounded-xl bg-primary">
        <IconComponent className="h-5 w-5 text-white" />
      </div>
      <Badge>{videoCount}</Badge>
    </div>
    
    <div className="flex-1 flex flex-col justify-between">
      <div className="space-y-2">
        <h3 className="font-bold text-xl text-white line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-300 line-clamp-3">
          {description}
        </p>
      </div>
      
      <div className="flex items-center justify-between pt-3">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <CirclePlay className="h-4 w-4" />
          <span>Start Learning</span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 
                        transition-all transform translate-x-2 
                        group-hover:translate-x-0">
          <div className="bg-white text-black p-1.5 rounded-full">
            <ChevronRightIcon className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  </CardContent>
  
  {/* Hover Glow Effect */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                  transition-opacity pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-r 
                    from-primary/20 via-transparent to-primary/20" />
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
  </div>
</Card>
```

### Card Dimensions
- **Width**: Fixed at `320px`
- **Height**: Fixed at `224px` (14rem / h-56)
- **Gap between cards**: `gap-4` (1rem / 16px)
- **Minimum container width**: `min-width: max-content`

### Scroll Navigation Arrows
```tsx
<div className="absolute top-1/2 -translate-y-1/2 -left-4 
                bg-black/80 backdrop-blur-sm rounded-full p-3 
                opacity-0 group-hover:opacity-100 transition-opacity 
                shadow-2xl border border-gray-700 cursor-pointer">
  <ChevronLeft className="h-6 w-6 text-white" />
</div>
```

---

## 5. STATS CARDS & METRICS

### Quick Stats Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 
                   border-purple-500/30">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-400">
        Learning Streak
      </CardTitle>
      <Flame className="h-5 w-5 text-orange-500" />
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-white">
        {stats.streak} days
      </div>
      <p className="text-xs text-gray-400 mt-2">
        Keep it up! 🔥
      </p>
      <Progress value={stats.streakProgress} className="mt-3 h-2" />
    </CardContent>
  </Card>
</div>
```

### Stat Card Gradients by Type
```typescript
const statCardStyles = {
  streak: {
    gradient: "from-purple-900/20 to-purple-800/10",
    border: "border-purple-500/30",
    icon: <Flame className="text-orange-500" />
  },
  videos: {
    gradient: "from-blue-900/20 to-blue-800/10",
    border: "border-blue-500/30",
    icon: <CirclePlay className="text-blue-500" />
  },
  hours: {
    gradient: "from-green-900/20 to-green-800/10",
    border: "border-green-500/30",
    icon: <Clock className="text-green-500" />
  },
  achievement: {
    gradient: "from-yellow-900/20 to-yellow-800/10",
    border: "border-yellow-500/30",
    icon: <Trophy className="text-yellow-500" />
  }
};
```

---

## 6. ANIMATION SYSTEM

### Framer Motion Variants
```typescript
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleOnHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.3 }
  }
};
```

### Component Animation Examples
```tsx
// Section entrance
<motion.section
  variants={fadeInUp}
  initial="hidden"
  animate="visible"
>

// Staggered children
<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={fadeInUp}
      transition={{ delay: i * 0.1 }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>

// Hover interactions
<motion.div
  whileHover={{ scale: 1.05, y: -4 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
>
```

---

## 7. TYPOGRAPHY SYSTEM

### Font Hierarchy
```css
/* Hero Title */
.hero-title {
  font-size: 3.5rem;      /* 56px / text-5xl */
  font-weight: 700;       /* font-bold */
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: white;
}

/* Section Headers */
.section-header {
  font-size: 2.25rem;     /* 36px / text-4xl */
  font-weight: 700;
  letter-spacing: -0.025em;
  color: white;
}

/* Card Titles */
.card-title {
  font-size: 1.25rem;     /* 20px / text-xl */
  font-weight: 700;
  line-height: 1.2;
  color: white;
}

/* Body Text */
.body-text {
  font-size: 0.875rem;    /* 14px / text-sm */
  line-height: 1.5;
  color: rgb(209, 213, 219);  /* text-gray-300 */
}

/* Metadata / Labels */
.metadata {
  font-size: 0.75rem;     /* 12px / text-xs */
  font-weight: 500;
  color: rgb(156, 163, 175);  /* text-gray-400 */
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## 8. SCROLLING BEHAVIOR

### Hide Scrollbars
```css
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;            /* Chrome, Safari, Opera */
}
```

### Smooth Scrolling
```tsx
<div 
  className="overflow-x-auto scrollbar-hide"
  style={{ scrollBehavior: 'smooth' }}
>
```

---

## 9. ICON SYSTEM

### Icon Sizes
```typescript
const iconSizes = {
  xs: "h-3 w-3",      // 12px
  sm: "h-4 w-4",      // 16px
  md: "h-5 w-5",      // 20px
  lg: "h-6 w-6",      // 24px
  xl: "h-8 w-8",      // 32px
};
```

### Icon with Background Container
```tsx
<div className="p-2.5 rounded-xl bg-primary shadow-lg">
  <IconComponent className="h-5 w-5 text-white" />
</div>
```

### Category-Specific Icon Colors
```typescript
const iconColors = {
  coding: "text-blue-500",
  design: "text-pink-500",
  data: "text-purple-500",
  marketing: "text-orange-500",
  productivity: "text-green-500",
  finance: "text-emerald-500",
  // ... more categories
};
```

---

## 10. BADGE SYSTEM

### Badge Variants
```tsx
// Primary Badge
<Badge className="font-medium backdrop-blur-sm" 
       style={{ 
         background: 'color-mix(in hsl, hsl(var(--primary)) 20%, transparent)',
         color: 'hsl(var(--primary))',
         borderColor: 'color-mix(in hsl, hsl(var(--primary)) 30%, transparent)'
       }}>
  {count} Videos
</Badge>

// Status Badges
<Badge variant="outline" className="text-emerald-500 border-emerald-500/30">
  Completed
</Badge>

<Badge variant="outline" className="text-yellow-500 border-yellow-500/30">
  In Progress
</Badge>

<Badge variant="outline" className="text-gray-400 border-gray-400/30">
  Not Started
</Badge>
```

---

## 11. BUTTON SYSTEM

### Primary Button
```tsx
<Button 
  className="bg-primary hover:bg-primary/90 text-white 
             shadow-[0_12px_30px_rgba(139,92,246,0.35)]
             transition-all duration-300 hover:shadow-[0_16px_40px_rgba(139,92,246,0.45)]"
>
  Start Learning
</Button>
```

### Outline Button
```tsx
<Button 
  variant="outline"
  className="border-white/20 bg-white/5 text-white 
             hover:border-primary/60 hover:bg-primary/10
             transition-all duration-300"
>
  Learn More
</Button>
```

### Ghost Button
```tsx
<Button 
  variant="ghost"
  className="text-gray-400 hover:text-white hover:bg-white/10
             transition-all duration-200"
>
  See All <ChevronRightIcon />
</Button>
```

---

## 12. PROGRESS INDICATORS

### Progress Bar
```tsx
<Progress 
  value={progressValue} 
  className="h-2 bg-gray-800"
  style={{
    '--progress-color': 'hsl(var(--primary))'
  }}
/>
```

### Circular Progress (Custom)
```tsx
<svg className="w-16 h-16 transform -rotate-90">
  <circle
    cx="32"
    cy="32"
    r="28"
    stroke="currentColor"
    strokeWidth="4"
    fill="none"
    className="text-gray-800"
  />
  <circle
    cx="32"
    cy="32"
    r="28"
    stroke="currentColor"
    strokeWidth="4"

---

## 13. COMPLETE GENRE & CATEGORY TAXONOMY

### SKILL-BASED LEARNING GENRES (10 categories)

#### 1. Coding & Programming
- **ID**: `coding-programming`
- **Description**: Master programming languages and development skills
- **Icon**: `Code2` (from lucide-react)
- **Gradient**: `from-blue-500/20 to-cyan-500/20`
- **Border**: `border-blue-500/30`
- **Icon Color**: `text-blue-500`
- **Count**: 120+ videos
- **Background Image**: Code editor screenshot
- **Sample Videos**:
  - JavaScript Fundamentals Complete Course
  - React.js Full Course 2024
  - Python for Beginners - Full Course
  - Node.js and Express.js Full Course

#### 2. Data Science & AI/ML
- **ID**: `data-science-ai`
- **Description**: Learn data analysis, machine learning, and AI
- **Icon**: `BarChart3`
- **Gradient**: `from-purple-500/20 to-violet-500/20`
- **Border**: `border-purple-500/30`
- **Icon Color**: `text-purple-500`
- **Count**: 85+ videos
- **Background Image**: Data visualization dashboard
- **Sample Videos**:
  - Machine Learning Course - Building 12 AI Projects
  - Data Analysis with Python Full Course
  - TensorFlow 2.0 Complete Course

#### 3. Design (UI/UX, Graphic, Product)
- **ID**: `design`
- **Description**: Creative design skills and visual thinking
- **Icon**: `Palette`
- **Gradient**: `from-pink-500/20 to-rose-500/20`
- **Border**: `border-pink-500/30`
- **Icon Color**: `text-pink-500`
- **Count**: 95+ videos
- **Background Image**: Design workspace with tools
- **Sample Videos**:
  - UI/UX Design Tutorial - Complete Course
  - Figma UI Design Tutorial - Complete Course
  - Adobe Photoshop Complete Course

#### 4. Digital Marketing
- **ID**: `digital-marketing`
- **Description**: Master online marketing and growth strategies
- **Icon**: `Megaphone`
- **Gradient**: `from-orange-500/20 to-yellow-500/20`
- **Border**: `border-orange-500/30`
- **Icon Color**: `text-orange-500`
- **Count**: 70+ videos
- **Background Image**: Marketing analytics dashboard
- **Sample Videos**:
  - Digital Marketing Course 2024
  - Google Ads Complete Tutorial
  - Social Media Marketing Strategy

#### 5. Productivity & Time Management
- **ID**: `productivity`
- **Description**: Optimize your workflow and manage time effectively
- **Icon**: `Clock`
- **Gradient**: `from-green-500/20 to-emerald-500/20`
- **Border**: `border-green-500/30`
- **Icon Color**: `text-green-500`
- **Count**: 45+ videos
- **Background Image**: Organized workspace setup
- **Sample Videos**:
  - Time Management Mastery Course
  - Getting Things Done (GTD) System

#### 6. Financial Literacy & Investing
- **ID**: `financial-literacy`
- **Description**: Build wealth and understand personal finance
- **Icon**: `DollarSign`
- **Gradient**: `from-emerald-500/20 to-teal-500/20`
- **Border**: `border-emerald-500/30`
- **Icon Color**: `text-emerald-500`
- **Count**: 60+ videos
- **Background Image**: Financial charts and graphs
- **Sample Videos**:
  - Personal Finance for Beginners
  - Stock Market Investing for Beginners

#### 7. Soft Skills (Communication, Leadership)
- **ID**: `soft-skills`
- **Description**: Develop interpersonal and leadership abilities
- **Icon**: `Users`
- **Gradient**: `from-indigo-500/20 to-blue-500/20`
- **Border**: `border-indigo-500/30`
- **Icon Color**: `text-indigo-500`
- **Count**: 55+ videos
- **Background Image**: Team collaboration scene
- **Sample Videos**:
  - Communication Skills Training
  - Leadership Skills Development

#### 8. Entrepreneurship & Startups
- **ID**: `entrepreneurship`
- **Description**: Launch and grow your own business
- **Icon**: `TrendingUp`
- **Gradient**: `from-violet-500/20 to-purple-500/20`
- **Border**: `border-violet-500/30`
- **Icon Color**: `text-violet-500`
- **Count**: 40+ videos
- **Background Image**: Startup office environment
- **Sample Videos**:
  - How to Start a Startup - Complete Course
  - Business Plan Creation Guide

#### 9. Writing & Content Creation
- **ID**: `writing-content`
- **Description**: Craft compelling content and improve writing
- **Icon**: `PenTool`
- **Gradient**: `from-cyan-500/20 to-blue-500/20`
- **Border**: `border-cyan-500/30`
- **Icon Color**: `text-cyan-500`
- **Count**: 65+ videos
- **Background Image**: Writing desk with notebook
- **Sample Videos**:
  - Content Writing Masterclass
  - Creative Writing Techniques

#### 10. Public Speaking
- **ID**: `public-speaking`
- **Description**: Build confidence and speaking skills
- **Icon**: `Mic`
- **Gradient**: `from-red-500/20 to-orange-500/20`
- **Border**: `border-red-500/30`
- **Icon Color**: `text-red-500`
- **Count**: 30+ videos
- **Background Image**: Public speaking stage
- **Sample Videos**:
  - Public Speaking Masterclass
  - Overcome Fear of Public Speaking

---

### ACADEMIC GENRES (5 categories)

#### 11. Mathematics
- **ID**: `mathematics`
- **Description**: From algebra to calculus and beyond
- **Icon**: `Calculator`
- **Gradient**: `from-indigo-500/20 to-purple-500/20`
- **Border**: `border-indigo-500/30`
- **Icon Color**: `text-indigo-500`
- **Count**: 8+ courses
- **Background Image**: Mathematical equations and formulas

#### 12. Physics
- **ID**: `physics`
- **Description**: Understanding the universe through science
- **Icon**: `Atom`
- **Gradient**: `from-blue-500/20 to-teal-500/20`
- **Border**: `border-blue-500/30`
- **Icon Color**: `text-blue-500`
- **Count**: 6+ courses
- **Background Image**: Physics laboratory equipment

#### 13. Biology
- **ID**: `biology`
- **Description**: Life sciences and biological systems
- **Icon**: `Microscope`
- **Gradient**: `from-green-500/20 to-emerald-500/20`
- **Border**: `border-green-500/30`
- **Icon Color**: `text-green-500`
- **Count**: 8+ courses
- **Background Image**: Microscope and biological specimens

#### 14. Chemistry
- **ID**: `chemistry`
- **Description**: Molecular science and reactions
- **Icon**: `Beaker`
- **Gradient**: `from-orange-500/20 to-red-500/20`
- **Border**: `border-orange-500/30`
- **Icon Color**: `text-orange-500`
- **Count**: 4+ courses
- **Background Image**: Chemistry lab with beakers

#### 15. Language Learning
- **ID**: `language-learning`
- **Description**: Master new languages and communication
- **Icon**: `Languages`
- **Gradient**: `from-rose-500/20 to-pink-500/20`
- **Border**: `border-rose-500/30`
- **Icon Color**: `text-rose-500`
- **Count**: 8+ courses
- **Background Image**: World map with language symbols

---

### CAREER & PROFESSIONAL DEVELOPMENT GENRES (4 categories)

#### 16. Resume & Job Hunting
- **ID**: `resume-job-hunting`
- **Description**: Land your dream job with confidence
- **Icon**: `FileText`
- **Gradient**: `from-slate-500/20 to-gray-500/20`
- **Border**: `border-slate-500/30`
- **Icon Color**: `text-slate-500`
- **Count**: 8+ guides
- **Background Image**: Professional resume template

#### 17. Interview Preparation
- **ID**: `interview-prep`
- **Description**: Ace your interviews with proven strategies
- **Icon**: `MessageSquare`
- **Gradient**: `from-blue-500/20 to-cyan-500/20`
- **Border**: `border-blue-500/30`
- **Icon Color**: `text-blue-500`
- **Count**: 4+ courses
- **Background Image**: Professional interview setting

#### 18. Freelancing & Remote Work
- **ID**: `freelancing-remote`
- **Description**: Build a successful remote career
- **Icon**: `Briefcase`
- **Gradient**: `from-purple-500/20 to-violet-500/20`
- **Border**: `border-purple-500/30`
- **Icon Color**: `text-purple-500`
- **Count**: 6+ courses
- **Background Image**: Remote work setup with laptop

#### 19. Certifications
- **ID**: `certifications`
- **Description**: AWS, Azure, PMP and more
- **Icon**: `GraduationCap`
- **Gradient**: `from-green-500/20 to-teal-500/20`
- **Border**: `border-green-500/30`
- **Icon Color**: `text-green-500`
- **Count**: 12+ prep courses
- **Background Image**: Professional certification badges

---

### TECH NEWS & TRENDS GENRES (3 categories)

#### 20. Tech News & Product Launches
- **ID**: `tech-news`
- **Description**: Stay updated with latest technology
- **Icon**: `Newspaper`
- **Gradient**: `from-blue-500/20 to-indigo-500/20`
- **Border**: `border-blue-500/30`
- **Icon Color**: `text-blue-500`
- **Count**: Daily updates
- **Background Image**: Tech news headlines

#### 21. AI & Innovation
- **ID**: `ai-innovation`
- **Description**: Cutting-edge AI developments
- **Icon**: `Cpu`
- **Gradient**: `from-purple-500/20 to-pink-500/20`
- **Border**: `border-purple-500/30`
- **Icon Color**: `text-purple-500`
- **Count**: Weekly insights
- **Background Image**: AI neural network visualization

#### 22. Cybersecurity
- **ID**: `cybersecurity`
- **Description**: Digital security and privacy trends
- **Icon**: `Shield`
- **Gradient**: `from-red-500/20 to-pink-500/20`
- **Border**: `border-red-500/30`
- **Icon Color**: `text-red-500`
- **Count**: Security updates
- **Background Image**: Cybersecurity lock and shield

---

### MIND-EXPANDING & CURIOSITY GENRES (3 categories)

#### 23. Did You Know / Trivia
- **ID**: `trivia-facts`
- **Description**: Amazing facts and surprising truths
- **Icon**: `Lightbulb`
- **Gradient**: `from-yellow-500/20 to-orange-500/20`
- **Border**: `border-yellow-500/30`
- **Icon Color**: `text-yellow-500`
- **Count**: 8+ collections
- **Background Image**: Question marks and light bulbs

#### 24. Psychology
- **ID**: `psychology`
- **Description**: Understanding human behavior and mind
- **Icon**: `BrainIcon`
- **Gradient**: `from-violet-500/20 to-purple-500/20`
- **Border**: `border-violet-500/30`
- **Icon Color**: `text-violet-500`
- **Count**: Mind explorations
- **Background Image**: Brain and psychology concepts

#### 25. Philosophy
- **ID**: `philosophy`
- **Description**: Deep questions about existence and meaning
- **Icon**: `Lightbulb`
- **Gradient**: `from-indigo-500/20 to-blue-500/20`
- **Border**: `border-indigo-500/30`
- **Icon Color**: `text-indigo-500`
- **Count**: Thought-provoking
- **Background Image**: Philosophical symbols and books

---

### DIY & HANDS-ON GENRES (1 category)

#### 26. Robotics & IoT
- **ID**: `robotics-iot`
- **Description**: Build connected devices and robots
- **Icon**: `Cpu`
- **Gradient**: `from-cyan-500/20 to-blue-500/20`
- **Border**: `border-cyan-500/30`
- **Icon Color**: `text-cyan-500`
- **Count**: Project tutorials
- **Background Image**: Robotic components and circuits

---

### LIFESTYLE GENRES (2 categories)

#### 27. Health & Fitness
- **ID**: `health-fitness`
- **Description**: Physical wellness and exercise
- **Icon**: `Dumbbell`
- **Gradient**: `from-red-500/20 to-pink-500/20`
- **Border**: `border-red-500/30`
- **Icon Color**: `text-red-500`
- **Count**: 8+ workout plans
- **Background Image**: Gym equipment and fitness

#### 28. Mental Health & Wellness
- **ID**: `mental-wellness`
- **Description**: Mindfulness and emotional well-being
- **Icon**: `Heart`
- **Gradient**: `from-pink-500/20 to-rose-500/20`
- **Border**: `border-pink-500/30`
- **Icon Color**: `text-pink-500`
- **Count**: Wellness guides
- **Background Image**: Meditation and peaceful scenery

---

## 14. GENRE SECTION RENDERING PATTERN

### Section Header with Icon
```tsx
<div className="flex items-center justify-between px-4">
  <h2 className="text-4xl font-bold text-white flex items-center gap-3 tracking-tight">
    <div className="p-2 rounded-xl" style={{ background: 'hsl(var(--primary))' }}>
      <SectionIcon className="h-6 w-6 text-white" />
    </div>
    {sectionTitle}
  </h2>
  {showExploreAll && (
    <Button variant="ghost" className="text-gray-400 hover:text-white">
      See All <ChevronRightIcon />
    </Button>
  )}
</div>
```

### Genre Category Structure
Each genre category contains:
1. **Section Title** (e.g., "Skill-Based Learning", "Academic Subjects")
2. **Section Icon** (matching the category theme)
3. **Horizontal scroll container** with genre cards
4. **"See All" button** for navigation to full category view

### Complete Category List
1. **Skill-Based Learning** (10 genres) - Icon: `Rocket`
2. **Academic Subjects** (5 genres) - Icon: `GraduationCap`
3. **Career & Professional** (4 genres) - Icon: `Briefcase`
4. **Tech News & Trends** (3 genres) - Icon: `Newspaper`
5. **Mind-Expanding & Curiosity** (3 genres) - Icon: `Lightbulb`
6. **DIY & Hands-On** (1 genre) - Icon: `Wrench`
7. **Lifestyle & Wellness** (2 genres) - Icon: `Heart`

**Total Categories**: 7 major sections
**Total Genres**: 28 individual genre cards
    fill="none"
    strokeDasharray={`${2 * Math.PI * 28}`}
    strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
    className="text-primary transition-all duration-500"
  />
</svg>
```

---

## 13. IMAGE HANDLING

### Thumbnail Best Practices
```tsx
// Use Next.js Image component
<Image
  src={thumbnailUrl}
  alt={title}
  width={320}
  height={180}
  className="object-cover rounded-lg"
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

### Background Images
```tsx
<div 
  className="bg-cover bg-center"
  style={{
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
/>
```

---

## 14. RESPONSIVE DESIGN

### Mobile First Approach
```tsx
<div className="
  w-full               /* Mobile: full width */
  sm:w-1/2            /* Small: 2 columns */
  md:w-1/3            /* Medium: 3 columns */
  lg:w-1/4            /* Large: 4 columns */
  xl:w-1/5            /* XL: 5 columns */
">
```

### Genre Card Responsive Widths
```typescript
const cardWidths = {
  mobile: "w-[280px]",     // Single card visible
  tablet: "w-[320px]",     // 2-3 cards visible
  desktop: "w-[320px]",    // 4-5 cards visible
};
```

---

## 15. STATE MANAGEMENT PATTERNS

### Loading States
```tsx
{isLoading ? (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 
                    border-t-2 border-b-2 border-primary" />
    <p className="ml-4 text-gray-400">Loading content...</p>
  </div>
) : (
  // Content
)}
```

### Empty States
```tsx
{items.length === 0 && (
  <Card className="text-center p-12">
    <IconComponent className="h-16 w-16 mx-auto text-gray-600 mb-4" />
    <h3 className="text-xl font-semibold text-white mb-2">
      No content yet
    </h3>
    <p className="text-gray-400 mb-6">
      Start by creating your first playlist
    </p>
    <Button>Create Playlist</Button>
  </Card>
)}
```

---

## 16. ACCESSIBILITY CONSIDERATIONS

### Keyboard Navigation
```tsx
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
  onClick={handleClick}
>
```

### ARIA Labels
```tsx
<button
  aria-label="Play video"
  aria-describedby="video-description"
>
  <CirclePlay />
</button>
```

### Focus States
```css
.focusable:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}
```

---

## 17. PERFORMANCE OPTIMIZATIONS

### Lazy Loading
```tsx
const GenreSection = dynamic(() => import('./GenreSection'), {
  loading: () => <SkeletonLoader />,
  ssr: false
});
```

### Virtual Scrolling (for long lists)
```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

const rowVirtualizer = useVirtualizer({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 224, // Card height
  overscan: 5
});
```

### Image Optimization
- Use WebP format with fallbacks
- Implement lazy loading for below-fold images
- Use appropriate sizing (no larger than display size)
- Compress images to < 100KB

---

## 18. GENRE CATEGORY ORGANIZATION

### Category Structure
```typescript
interface GenreCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType;
  gradient: string;
  borderColor: string;
  iconColor: string;
  count: string;
  videos?: Video[];
}

const categories = {
  skillBased: GenreCategory[],
  academic: GenreCategory[],
  career: GenreCategory[],
  techTrends: GenreCategory[],
  curiosity: GenreCategory[],
  diy: GenreCategory[],
  lifestyle: GenreCategory[]
};
```

### Background Image Mapping
```typescript
const getCategoryBackgroundImage = (genreId: string): string => {
  const imageMap: Record<string, string> = {
    'coding-programming': 'https://images.unsplash.com/...',
    'data-science-ai': 'https://images.unsplash.com/...',
    // ... more mappings
  };
  return imageMap[genreId] || defaultImage;
};
```

---

## 19. COMPLETE COMPONENT EXAMPLE

Here's a complete, production-ready genre section component:

```tsx
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, CirclePlay } from 'lucide-react';

interface GenreSectionProps {
  title: string;
  genres: Genre[];
  onGenreClick: (genreId: string) => void;
}

export function GenreSection({ 
  title, 
  genres, 
  onGenreClick 
}: GenreSectionProps) {
  return (
    <motion.section 
      className="space-y-6 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between px-4">
        <h2 className="text-4xl font-bold text-white flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary">
            <genres[0].icon className="h-6 w-6 text-white" />
          </div>
          {title}
        </h2>
        <Button 
          variant="ghost" 
          className="text-gray-400 hover:text-white text-sm"
        >
          See All <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
      
      {/* Scrollable Cards Container */}
      <div className="relative group">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-4">
          <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
            {genres.map((genre, index) => {
              const Icon = genre.icon;
              return (
                <motion.div
                  key={genre.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ width: '320px' }}
                >
                  <Card 
                    className="h-56 cursor-pointer transition-all duration-300 
                               hover:scale-105 hover:z-10 bg-gradient-to-br 
                               from-gray-900 to-black border border-gray-800 
                               relative overflow-hidden shadow-xl"
                    style={{ 
                      boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.15)' 
                    }}
                    onClick={() => onGenreClick(genre.id)}
                  >
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center 
                                 opacity-15 group-hover:opacity-25 
                                 transition-opacity duration-500"
                      style={{
                        backgroundImage: `url('${genre.backgroundImage}')`
                      }}
                    />
                    
                    {/* Pattern Overlay */}
                    <div 
                      className="absolute inset-0 opacity-5 
                                 group-hover:opacity-10 transition-opacity"
                      style={{ 
                        backgroundImage: `radial-gradient(
                          circle at 20% 80%, 
                          rgba(120,119,198,0.3) 0%, 
                          transparent 50%
                        )` 
                      }}
                    />
                    
                    {/* Dark Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t 
                                    from-black via-black/70 to-black/30" />
                    
                    {/* Content */}
                    <CardContent className="p-5 h-full flex flex-col relative z-10">
                      {/* Top Section */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-2.5 rounded-xl bg-primary shadow-lg">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <Badge 
                          className="font-medium backdrop-blur-sm text-xs"
                          style={{ 
                            background: 'color-mix(in hsl, hsl(var(--primary)) 20%, transparent)',
                            color: 'hsl(var(--primary))'
                          }}
                        >
                          {genre.count}
                        </Badge>
                      </div>
                      
                      {/* Content Section */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <h3 className="font-bold text-xl text-white 
                                         leading-tight line-clamp-2 
                                         group-hover:text-primary transition-colors">
                            {genre.title}
                          </h3>
                          <p className="text-sm text-gray-300 line-clamp-3">
                            {genre.description}
                          </p>
                        </div>
                        
                        {/* Action Section */}
                        <div className="flex items-center justify-between pt-3">
                          <div className="flex items-center gap-2 text-sm 
                                          text-gray-400 font-medium">
                            <CirclePlay className="h-4 w-4" />
                            <span>Start Learning</span>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 
                                          transition-all duration-300 
                                          transform translate-x-2 
                                          group-hover:translate-x-0">
                            <div className="bg-white text-black p-1.5 rounded-full">
                              <ChevronRight className="h-3 w-3" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-0 opacity-0 
                                    group-hover:opacity-100 transition-opacity 
                                    pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r 
                                      from-primary/20 via-transparent 
                                      to-primary/20" />
                      <div className="absolute bottom-0 left-0 right-0 
                                      h-1 bg-primary" />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Scroll Navigation Arrows */}
        <button
          className="absolute top-1/2 -translate-y-1/2 -left-4 
                     bg-black/80 backdrop-blur-sm rounded-full p-3 
                     opacity-0 group-hover:opacity-100 transition-opacity 
                     shadow-2xl border border-gray-700 hover:bg-black/90"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          className="absolute top-1/2 -translate-y-1/2 -right-4 
                     bg-black/80 backdrop-blur-sm rounded-full p-3 
                     opacity-0 group-hover:opacity-100 transition-opacity 
                     shadow-2xl border border-gray-700 hover:bg-black/90"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>
    </motion.section>
  );
}
```

---

## 20. IMPLEMENTATION CHECKLIST

### Essential Features
- [ ] Dark theme with purple accent colors
- [ ] Netflix-style hero section with gradient overlays
- [ ] Horizontal scrolling genre sections
- [ ] Card hover effects with scale and glow
- [ ] Framer Motion animations for entrances
- [ ] Responsive layout (mobile/tablet/desktop)
- [ ] Hidden scrollbars with smooth scrolling
- [ ] Category-specific background images
- [ ] Progress indicators and badges
- [ ] Loading and empty states

### Advanced Features
- [ ] Lazy loading for images
- [ ] Virtual scrolling for long lists
- [ ] Keyboard navigation support
- [ ] Focus management for accessibility
- [ ] Optimized image delivery (WebP)
- [ ] Animation performance monitoring
- [ ] Error boundaries for robustness

---

## 21. TOOLS & LIBRARIES REQUIRED

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "framer-motion": "^10.16.0",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-badge": "^1.0.4",
    "@radix-ui/react-card": "^1.0.4",
    "@radix-ui/react-progress": "^1.0.3",
    "lucide-react": "^0.292.0",
    "tailwindcss": "^3.3.0"
  }
}
```

---

## CONCLUSION

This guide provides everything needed to replicate the StreamSmart dashboard's visual design and interactive behavior. The key principles are:

1. **Dark theme** with strategic use of the purple primary color
2. **Netflix-inspired** horizontal scrolling and card layouts
3. **Smooth animations** using Framer Motion
4. **Multi-layered visual depth** through gradients and overlays
5. **Responsive design** that works across all screen sizes
6. **Performance optimization** through lazy loading and virtualization
7. **Accessibility** through proper ARIA labels and keyboard navigation

Follow this guide section by section to build a pixel-perfect replication of the dashboard interface.
