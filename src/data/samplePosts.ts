import type { Post } from "../types/Post";

// One post is generated a few hours ago so the "New!" badge (see Post.tsx)
// has something to demonstrate against. The other two are hardcoded to
// older, fixed dates as the assignment allows.
const recentDate = new Date();
recentDate.setHours(recentDate.getHours() - 3);

export const samplePosts: Post[] = [
  {
    id: 1,
    title: "Getting Started with Vite + React + TypeScript",
    author: "Jules",
    content:
      "Vite gives you an instant dev server and lightning-fast hot module " +
      "replacement, which makes it a great fit for React + TypeScript " +
      "projects that need to iterate quickly without a slow bundler in the way.",
    datePosted: recentDate.toISOString(),
  },
  {
    id: 2,
    title: "Why Props Should Be Typed, Not Guessed",
    author: "Amina",
    content:
      "Typing your component props with an interface catches mismatched " +
      "data before it ever reaches the browser, and it doubles as living " +
      "documentation for whoever reads the component next.",
    datePosted: "2025-01-14T09:00:00.000Z",
  },
  {
    id: 3,
    title: "A Quick Look at React.memo",
    author: "Samir",
    content:
      "React.memo skips re-rendering a component when its props haven't " +
      "changed, which is especially useful for list items that render the " +
      "same content over and over as a parent list updates.",
    datePosted: "2024-11-02T14:30:00.000Z",
  },
];
