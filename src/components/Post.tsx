import { memo } from "react";
import type { Post as PostType } from "../types/Post";
import "./Post.css";

interface PostProps {
  post: PostType;
}

const PREVIEW_WORD_COUNT = 12;
const NEW_THRESHOLD_MS = 24 * 60 * 60 * 1000; // 24 hours
const HIGHLIGHTED_AUTHOR = "Jules";

function getPreview(content: string): string {
  const words = content.trim().split(/\s+/);
  const preview = words.slice(0, PREVIEW_WORD_COUNT).join(" ");
  return words.length > PREVIEW_WORD_COUNT ? `${preview}...` : preview;
}

function isRecent(dateIso: string): boolean {
  const postedAt = new Date(dateIso).getTime();
  return Date.now() - postedAt < NEW_THRESHOLD_MS;
}

function formatDate(dateIso: string): string {
  return new Date(dateIso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Post is a functional component (see README for the functional-vs-class
 * justification). It renders a single blog post and demonstrates two
 * styling techniques at once:
 *   1. External CSS (Post.css) for the base card layout.
 *   2. An inline style for the author highlight, since that value is
 *      computed dynamically per-post rather than being a fixed class.
 */
function Post({ post }: PostProps) {
  const highlighted = post.author === HIGHLIGHTED_AUTHOR;

  // Inline style: demonstrates styling technique #2, and is a natural fit
  // here because the background color decision depends on per-post data.
  const highlightStyle: React.CSSProperties = highlighted
    ? { backgroundColor: "#eef1ff", borderColor: "#7c8cff" }
    : {};

  return (
    <article className="post" style={highlightStyle}>
      <div className="post__header">
        <h3 className="post__title">{post.title}</h3>
        {isRecent(post.datePosted) && (
          <span className="post__badge">New!</span>
        )}
      </div>
      <p className="post__meta">
        By <strong>{post.author}</strong> &middot; {formatDate(post.datePosted)}
      </p>
      <p className="post__preview">{getPreview(post.content)}</p>
    </article>
  );
}

// Optimization: React.memo skips re-rendering a Post whose `post` prop
// hasn't changed by reference/value shape, which matters once PostList
// re-renders for reasons unrelated to a specific post's own data.
export default memo(Post);
