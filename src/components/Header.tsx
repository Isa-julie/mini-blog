import "./Header.css";

/**
 * Header is a simple functional component: it takes no props and renders no
 * internal state, so a function component is the natural (and simplest)
 * choice here. See the README for the fuller discussion of functional vs.
 * class components used in this project.
 */
function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        Dev<span className="header__logo-accent">Insights</span>
      </div>
      <nav className="header__nav">
        {/* Intentionally non-functional for this stage of the assessment */}
        <a href="#new-post" className="header__nav-link">
          + New Post
        </a>
      </nav>
    </header>
  );
}

export default Header;
