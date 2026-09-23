# Dev Insights — Mini Blog

An internal mini-blog platform for Dev Insights employees to share quick
tips, insights, and updates about web development. This is the foundation
of the platform: a static, hardcoded list of posts rendered with React,
TypeScript, and Vite.

## Tech stack

- [Vite](https://vitejs.dev/) — dev server & build tool
- [React 18](https://react.dev/) + TypeScript
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) — component tests
- No UI/CSS framework — plain CSS files and inline styles (see "Styling" below)

No React starter template was used; the project was set up manually
(`package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`) and every
component was written from scratch for this assessment.

## Install, run, and test

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Type-check and build a production bundle into dist/
npm run build

# 4. Preview the production build locally
npm run preview

# 5. Run the test suite
npm run test
```

## Project structure

```
src/
  components/
    Header.tsx        Header.css
    Post.tsx           Post.css        Post.test.tsx
    PostList.tsx       PostList.css
  hoc/
    withLogger.tsx     # HOC: logs mount/unmount to the console
  types/
    Post.ts            # Shared Post interface
  data/
    samplePosts.ts      # Hardcoded sample posts
  App.tsx, App.css
  main.tsx
  index.css
```

## Design decisions

### Component types: functional vs. class

Every component in this project (`Header`, `Post`, `PostList`, `App`) is a
**functional component**. For this stage of the app:

- None of the components need lifecycle methods beyond what `useEffect`
  already covers (the `withLogger` HOC uses `useEffect`'s cleanup function
  to detect unmount, which replaces `componentWillUnmount`).
- Functional components are shorter, avoid `this` binding issues, and are
  the pattern the rest of the React ecosystem (hooks, `React.memo`, etc.)
  is built around.
- A class component would only have made sense if a component needed
  local state with complex lifecycle logic that hooks couldn't express as
  cleanly — that isn't the case here, so functional components were used
  throughout to keep the codebase consistent and simple.

### Styling

Two styling techniques are used, as required:

1. **External CSS files** (`Header.css`, `Post.css`, `PostList.css`,
   `App.css`, `index.css`) for all the "static" layout and look-and-feel —
   colors, spacing, borders, typography.
2. **Inline styles** in `Post.tsx` for the author-highlight background
   color. This value depends on a runtime comparison (`post.author ===
   "Jules"`), so instead of pre-defining two CSS classes and toggling
   between them, the style object is computed directly where the data
   lives. This is also the project's **conditional styling** requirement:
   posts by "Jules" get a highlighted background, and any post from the
   last 24 hours gets a "New!" badge.

### Optimization

- **`React.memo`** wraps the `Post` component (`export default memo(Post)`
  in `Post.tsx`). If `PostList` ever re-renders for a reason unrelated to a
  specific post (e.g. a future "sort order" toggle), posts whose props
  didn't change will skip re-rendering.
- **Unique `key` props**: `PostList` renders posts with `key={post.id}`
  rather than the array index, so React can correctly track each item
  across re-renders/reorders.

### Higher-Order Component

`src/hoc/withLogger.tsx` wraps a component and logs
`"[withLogger] <ComponentName> mounted"` / `"...unmounted"` to the
console. It's applied to `PostList` (see the last line of
`PostList.tsx`): `export default withLogger(PostList)`. Open the browser
console while running `npm run dev` to see the log lines.

## Libraries used

- `react`, `react-dom` — core UI library
- `vite`, `@vitejs/plugin-react`, `typescript` — dev tooling
- `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` —
  testing

## Challenges & reflections

- **Deciding where the "New!" logic should live.** It would have been easy
  to compute `isRecent` in `PostList` and pass a boolean down, but keeping
  the date-comparison logic inside `Post.tsx` next to the data it uses kept
  the component self-contained and easier to test in isolation (see
  `Post.test.tsx`, which asserts the badge appears/disappears based on the
  post's date).
- **Choosing where to apply the HOC.** `withLogger` could wrap any
  component; it was applied to `PostList` (rather than `Post`) so the
  console only logs once per list render instead of once per post, which
  keeps the console output readable while still demonstrating the pattern.
- **Vitest + TypeScript config.** Getting the `test` field in
  `vite.config.ts` to type-check required importing `defineConfig` in a
  way that picks up Vitest's config typings (via the
  `/// <reference types="vitest/config" />` directive) rather than the
  plain Vite one — an easy thing to miss since the error message doesn't
  point at Vitest directly.

## Roadmap (not part of this assessment)

- Wire up the "New Post" link to an actual post-creation form.
- Replace the hardcoded `samplePosts` array with data fetched from an API.
- Add routing (e.g. React Router) once there's more than one page.
