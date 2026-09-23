/**
 * Shape of a single blog post used throughout the app.
 *
 * `datePosted` is stored as an ISO 8601 string so it can be:
 *  - easily hardcoded in sample data,
 *  - safely passed through props (no Date object identity issues),
 *  - parsed with `new Date(...)` wherever we need to compare it (e.g. to
 *    decide whether to show a "New!" badge).
 */
export interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  datePosted: string;
}
