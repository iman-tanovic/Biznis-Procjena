import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import "./RegisterPage.css";
import VerifyEmailPage from "../components/verify_email";
import Background from "../components/Background";
import Footer from "../components/Footer";

const API_BASE_URL = "";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [imePrezime, setImePrezime] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          ime_prezime: imePrezime,
          email,
          password,
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        const message =
          typeof data === "string"
            ? data
            : data?.detail || "Registracija nije uspjela.";
        throw new Error(message);
      }

      navigate("/verify-email");
      return;

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Greška pri povezivanju sa serverom."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-shell">
  <main className="register-page">
    <section className="register-shell">
      <div className="register-layout">
        <div className="register-panel">
          <div className="register-panel__intro">
            <Link to="/" className="register-brand">
              biznisprocjena.com
            </Link>

            <h1>Registrujte se i procijenite vrijednost vaše firme besplatno</h1>
            <p>
              Kreirajte račun i pristupite jednostavnom alatu za informativnu
              procjenu vrijednosti biznisa, bez komplikovanog unosa i dugog čekanja.
            </p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            <label className="register-field">
              <span>Ime i prezime</span>
              <input
                type="text"
                value={imePrezime}
                onChange={(e) => setImePrezime(e.target.value)}
                placeholder="Unesi ime i prezime"
                required
              />
            </label>

            <label className="register-field">
              <span>Email adresa</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="unesi@email.com"
                required
              />
            </label>

            <label className="register-field">
              <span>Lozinka</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Unesi lozinku"
                required
              />
            </label>

            {error && <div className="alert alert-error">{error}</div>}

            <button
              type="submit"
              className="btn btn-primary register-submit"
              disabled={loading}
            >
              {loading ? "Kreiram račun..." : "Kreiraj račun"}
            </button>

            <div className="register-links">
              <p>
                Već imaš račun? <Link to="/login">Prijavi se</Link>
              </p>
              <p>
                <Link to="/">Nazad na početnu</Link>
              </p>
            </div>
          </form>
        </div>

        <aside className="register-preview" aria-label="Pregled aplikacije">
          <div className="register-preview__badge">Besplatna procjena</div>

          <div className="register-preview__card register-preview__card--hero">
            <span className="preview-label">Procjena firme</span>
            <h2>Brz pregled vrijednosti i ključnih pokazatelja</h2>
            <p>
              Registracijom dobijate pristup jednostavnom unosu podataka i
              jasnom informativnom rezultatu procjene.
            </p>
          </div>

          <div className="register-preview__grid">
            <div className="preview-mini preview-mini--value">
              <span className="preview-mini__label">Procijenjena vrijednost</span>
              <strong>€ 245.000</strong>
              <small>Informativni prikaz</small>
            </div>

            <div className="preview-mini preview-mini--trend">
              <span className="preview-mini__label">Trend pokazatelja</span>
              <div className="preview-chart">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <div className="preview-wide">
              <div className="preview-wide__top">
                <span>Najčešće korišteno</span>
                <span>Brzo i pregledno</span>
              </div>
              <ul>
                <li>Jednostavan unos osnovnih podataka</li>
                <li>Jasan informativni rezultat procjene</li>
                <li>Pregled prilagođen manjim firmama i poduzetnicima</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </main>
  <Footer />
  </div>
); }