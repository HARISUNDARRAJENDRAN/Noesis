# Prompt: Frontend Development Plan for the Noesis Application Core

## 1. Project Vision & Core Principles

* **Vision:** To build a seamless, intuitive, and powerful learning co-pilot. The user interface should feel fast, intelligent, and motivating, transforming passive video consumption into an active learning journey.
* **Methodology:** This entire build will follow the **Frontend-First** approach. All components and pages will be built using a pre-defined mock data structure. The goal is to have a fully functional, interactive, and beautiful application running on mock data before a single line of backend integration code is written.

---

## 2. Recommended Tech Stack & Setup

* **Framework:** **Next.js** (for its performance, routing, and React ecosystem).
* **UI Library:** **MUI** or **Chakra UI** (to accelerate development with pre-built, accessible components that match your aesthetic).
* **State Management:** **Zustand** (for simple, effective global state management, especially for user data).
* **Data Fetching:** **SWR** or **React Query** (for efficient caching and real-time data synchronization later).

---

## 3. The First Task: Create the API Contract (Mock Data)

Before building any components, create a file named `mock-data.js` in your project. This will be the "blueprint" that powers the entire frontend build. It should export objects that match the structure of your future API.

```javascript
// /lib/mock-data.js

export const mockUser = {
  name: 'Priya Desai',
  avatarUrl: '/path/to/avatar.png',
  progress: { completion: 15, videos: 22, minutesWatched: 450, streak: 5 },
};

export const mockDashboardData = {
  continueLearning: { videoId: 'xyz', title: 'Advanced React Hooks', thumbnail: '[https://i.ytimg.com/vi/](https://i.ytimg.com/vi/)...' },
  recommendations: [ 
    { videoId: 'abc', title: 'Intro to Serverless on AWS', thumbnail: '...' },
    { videoId: '123', title: 'UI Design Principles', thumbnail: '...' }
  ],
  trending: [ 
    { videoId: 'def', title: 'The Rise of AI Agents', thumbnail: '...' },
    { videoId: '456', title: 'Mastering Financial Literacy', thumbnail: '...' }
  ],
  recentPlaylists: [ 
    { playlistId: 'pl-1', title: 'Mastering React', progress: 75 },
    { playlistId: 'pl-2', title: 'AI/ML Fundamentals', progress: 40 }
  ],
};

export const mockGenreLibrary = [
  {
    category: 'Skill-Based Genres',
    subGenres: [
      { id: 'sg-1', title: 'Coding & Programming', count: '150+ videos' },
      { id: 'sg-2', title: 'Data Science & AI/ML', count: '90+ videos' },
    ],
  },
  {
    category: 'Academic Genres',
    subGenres: [
      { id: 'sg-3', title: 'Mathematics', count: '200+ videos' },
      { id: 'sg-4', title: 'Physics', count: '120+ videos' },
    ],
  },
];

export const mockPlaylists = [
  { playlistId: 'pl-1', title: 'Mastering React', videoCount: 12, progress: 75, thumbnail: '...' },
  { playlistId: 'pl-2', title: 'AI/ML Fundamentals', videoCount: 8, progress: 40, thumbnail: '...' },
];

export const mockPlaylistDetail = {
  playlistId: 'pl-1',
  title: 'Mastering React',
  description: 'A deep dive into modern React development.',
  videos: [
    { videoId: 'xyz', title: 'Advanced React Hooks', duration: '15:30' },
    { videoId: 'lmn', title: 'State Management with Zustand', duration: '12:45' }
  ],
  transcript: `[00:01] Hello and welcome... [00:05] Today we will discuss React Hooks...`,
  notes: [
    { noteId: 'n-1', timestamp: '02:15', text: 'Big O notation is key for performance.' },
    { noteId: 'n-2', timestamp: '08:50', text: 'The useCallback hook prevents unnecessary re-renders.' }
  ]
};

4. Development Phases
Phase 1: The Application Shell & Shared Components
(Goal: Build the foundational, reusable pieces of the UI)

Implement the Main Layout: Create a global Layout.js component that includes the main Header/Navigation bar and a main content area. All other pages will render inside this layout.

Build the Header: The header should display the Noesis logo, the primary navigation links (Dashboard, Learn, My Playlists, Explore, Community), and a user profile dropdown showing the avatar and name from mockUser.

Create the <Carousel /> Component: Build a generic, reusable carousel component that accepts a title and an array of items as props. This will be used all over the application.

Create the <VideoCard /> & <PlaylistCard /> Components: Design the individual cards that will be displayed inside the carousels and on the playlist pages. They should accept props like title, thumbnail, progress, etc.

Phase 2: The Main Dashboard & Discovery Pages
(Goal: Build the primary pages a user interacts with upon logging in)

Build the Learn Page (/learn): This is the user's personalized "launchpad."

Fetch data from mockDashboardData.

Use a dedicated component for the "Continue Learning" hero section.

Use your <Carousel /> component to render the recommendations, trending, and recentPlaylists rows.

Build the Explore Page (/explore): This is the full content library.

Fetch data from mockGenreLibrary.

Map through the categories, rendering a <Carousel /> for each one, filled with cards for the sub-genres.

Phase 3: The User Hub (Playlists & Progress)
(Goal: Build the pages where users manage their content and track their growth)

Build the My Playlists Page (/playlists):

Fetch data from mockPlaylists.

Display a grid of <PlaylistCard /> components.

Implement the "Create New Playlist" modal from your previous screenshot. The form submission will just console.log the data for now.

Build the My Progress Hub Page (/dashboard):

This is the detailed analytics page. Replicate the powerful UI from your screenshot.

Create dedicated components: <SWOTAnalysis />, <TasksManager />, <PrepInsightBoard />.

Use a charting library (like Recharts or Chart.js) to visualize mock progress data from mockUser.

Phase 4: The Core Learning Interface
(Goal: Build the most complex and important view where the learning happens)

Build the Playlist Detail Page (/playlists/[id]):

Create a multi-panel layout (e.g., using a CSS grid).

<VideoPlayer />: A component to embed and control the YouTube video.

<TranscriptPanel />: A scrollable panel that displays the transcript. Implement logic to highlight the currently spoken sentence based on the video's playback time.

<NotesPanel />: The advanced notes UI. Implement timestamping (clicking a button saves the current video time with the note) and the other UI elements.

<ChatbotPanel />: The full chat interface. For now, it can respond with hardcoded answers from your mock data file based on the user's input.

5. Final Integration
Once the frontend is complete and powered by mock data, the final phase will be to connect it to the live AWS backend. This will involve:

Configuring AWS Amplify in the project with your real Cognito and AppSync credentials.

Systematically replacing the mock data fetches (e.g., reading from mock-data.js) with live GraphQL queries to your AppSync API.

Connecting the authentication forms to the real Auth.signIn() and Auth.signUp() functions from Amplify.