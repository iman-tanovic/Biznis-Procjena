import { Link } from "react-router-dom";
import "../App.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo">
            biznisprocjena.com
          </Link>
          <p>
            Jednostavna informativna procjena vrijednosti firme, pregledno i bez
            komplikacija.
          </p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer navigacija">
          <Link to="/">Početna</Link>
          <Link to="/register">Registracija</Link>
          <Link to="/login">Prijava</Link>
        </nav>
      </div>

      <div className="site-footer__bottom">
        <p>© {year} biznisprocjena.com</p>
        <p>kontakt: podrska@biznisprocjena.com</p>
      </div>
    </footer>
  );
}