import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="home-navbar">
      <div className="home-navbar__inner">
        <Link to="/" className="home-navbar__brand">
          BiznisProcjena.com
        </Link>

        <nav className="home-navbar__nav">
          <a href="#demo" className="home-navbar__demo">Demo</a>
          <Link to="/login" className="home-navbar__cta">
            Prijavi se
          </Link>
          <Link to="/register" className="home-navbar__text-link">
            Registruj se
          </Link>
          
        </nav>
      </div>
    </header>
  );
}