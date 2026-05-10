import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = "";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [imePrezime, setImePrezime] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ime_prezime: imePrezime,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Registracija nije uspjela.");
        setLoading(false);
        return;
      }

      const token = data.access_token || data.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/calculator");
        return;
      }

      navigate("/login");
    } catch {
      setError("Greška pri povezivanju sa serverom.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "white",
          borderRadius: "20px",
          padding: "32px",
          boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginTop: 0 }}>Register</h1>
        <p style={{ color: "#6b7280", marginBottom: "24px" }}>
          Napravi korisnički račun za pristup calculatoru.
        </p>

        <label style={{ display: "block", marginBottom: "8px" }}>Ime i prezime</label>
        <input
          type="text"
          value={imePrezime}
          onChange={(e) => setImePrezime(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px 14px",
            marginBottom: "16px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
          }}
        />

        <label style={{ display: "block", marginBottom: "8px" }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px 14px",
            marginBottom: "16px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
          }}
        />

        <label style={{ display: "block", marginBottom: "8px" }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px 14px",
            marginBottom: "16px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
          }}
        />

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#991b1b",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            background: "#111827",
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: "14px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {loading ? "Kreiranje..." : "Register"}
        </button>

        <p style={{ marginTop: "18px", color: "#4b5563" }}>
          Već imaš račun? <Link to="/login">Login</Link>
        </p>

        <p style={{ marginTop: "10px" }}>
          <Link to="/">Nazad na početnu</Link>
        </p>
      </form>
    </div>
  );
}