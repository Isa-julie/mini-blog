import { samplePosts } from "../data/samplePosts";
import { withLogger } from "../hoc/withLogger";
import Post from "./Post";
import "./PostList.css";

/**
 * PostList renders the (currently hardcoded) array of sample posts.
 *
 * Optimization notes:
 *  - Each `Post` gets a stable, unique `key` (`post.id`) rather than the
 *    array index, so React can correctly match items across re-renders.
 *  - `Post` itself is wrapped in `React.memo` (see Post.tsx), so if
 *    PostList re-renders for a reason unrelated to a given post's data,
 *    that post won't re-render unnecessarily.
 */
function PostList() {
  return (
    <section className="post-list">
      {samplePosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
}

// HOC usage: wrap PostList so a mount/unmount message is logged to the
// console, without touching PostList's own implementation.
export default withLogger(PostList);
