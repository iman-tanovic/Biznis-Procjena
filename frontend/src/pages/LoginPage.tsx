import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        <h1 style={{ marginTop: 0 }}>Login</h1>

        <p style={{ color: "#6b7280", marginBottom: "24px" }}>
          Prijavite se da pristupite kalkulatoru.
        </p>

        <label
          htmlFor="email"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="unesi email"
          required
          style={{
            width: "100%",
            padding: "12px 14px",
            marginBottom: "16px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            boxSizing: "border-box",
          }}
        />

        <label
          htmlFor="password"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="unesi password"
          required
          style={{
            width: "100%",
            padding: "12px 14px",
            marginBottom: "16px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            boxSizing: "border-box",
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
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: "14px",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.8 : 1,
          }}
        >
          {loading ? "Prijava..." : "Login"}
        </button>

        <p style={{ marginTop: "18px", color: "#4b5563" }}>
          Nemate račun? <Link to="/register">Registrujte se</Link>
        </p>

        <p style={{ marginTop: "10px" }}>
          <Link to="/">Nazad na početnu</Link>
        </p>
      </form>
    </div>
  );
}