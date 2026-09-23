import Header from "./components/Header";
import PostList from "./components/PostList";
import "./App.css";

/**
 * App is the root component: it composes Header and PostList and holds no
 * logic of its own, which is why a plain functional component is enough.
 */
function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <PostList />
      </main>
    </div>
  );
}

export default App;
