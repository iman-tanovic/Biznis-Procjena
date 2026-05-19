import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Background from "../components/Background";
import Footer from "../components/Footer";
import "../App.css";
import "./HomePage.css"
const API_BASE_URL = "";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("1. submit krenuo");

    setError("");
    setLoading(true);

    try {
      console.log("2. prije fetch");

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log("3. fetch gotov", response.status);

      const raw = await response.text();
      console.log("4. raw response:", raw);

      if (!response.ok) {
        throw new Error(raw || "Neuspješna prijava.");
      }

      console.log("5. prije navigate");
      navigate("/dashboard");
      console.log("6. poslije navigate");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
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
  <div className="auth-page">
    <div className="auth-page__inner">
      <form onSubmit={handleSubmit} className="auth-card">
        <h1>Prijava</h1>
        <p>Prijavite se da pristupite kalkulatoru i dashboardu.</p>

        <div className="auth-form-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="unesi email"
            required
          />
        </div>

        <div className="auth-form-row">
          <label htmlFor="password">Lozinka</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="unesi lozinku"
            required
          />
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Prijava..." : "Prijavi se"}
        </button>

        <div className="auth-links">
          <p>
            Nemate račun? <Link to="/register">Registrujte se</Link>
          </p>
          <p>
            <Link to="/">Nazad na početnu</Link>
          </p>
        </div>
      </form>
    </div>

    <Background />
    
  </div>
  <Footer />
  </div>
);
}