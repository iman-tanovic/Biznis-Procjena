import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Background from "../components/Background";
import "../App.css";

const API_BASE_URL = "";

type VerifyStatus = "loading" | "success" | "error";

export default function VerifyAccountPage() {
  const { token } = useParams<{ token: string }>();
  const [status, setStatus] = useState<VerifyStatus>("loading");
  const [message, setMessage] = useState("Verifikujemo vaš račun...");

  useEffect(() => {
    async function verifyAccount() {
      if (!token) {
        setStatus("error");
        setMessage("Verifikacijski token nedostaje.");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/verify/${token}`, {
          method: "GET",
          credentials: "include",
        });

        const contentType = response.headers.get("content-type") || "";
        const data = contentType.includes("application/json")
          ? await response.json()
          : await response.text();

        if (!response.ok) {
          const errorMessage =
            typeof data === "string"
              ? data
              : data?.detail || "Verifikacija nije uspjela.";
          throw new Error(errorMessage);
        }

        setStatus("success");
        setMessage(
          typeof data === "string"
            ? data
            : data?.message || "Email je uspješno verifikovan."
        );
      } catch (err) {
        setStatus("error");
        setMessage(
          err instanceof Error
            ? err.message
            : "Došlo je do greške pri verifikaciji."
        );
      }
    }

    verifyAccount();
  }, [token]);

  return (
    <main className="auth-page">
      <div className="auth-page__inner">
        <section id="verify" className="verify-card">
          {status === "loading" && (
            <>
              <span className="eyebrow">Verifikacija u toku</span>
              <h1>Provjeravamo vaš email</h1>
              <p>{message}</p>
              <div className="verify-spinner" aria-hidden="true" />
            </>
          )}

          {status === "success" && (
            <>
              <span className="eyebrow">Uspješno</span>
              <h1>Email je potvrđen</h1>
              <p>{message}</p>
              <Link to="/login" className="btn btn-primary">
                Idi na prijavu
              </Link>
            </>
          )}

          {status === "error" && (
            <>
              <span className="eyebrow">Greška</span>
              <h1>Verifikacija nije uspjela</h1>
              <p>{message}</p>
              <div className="auth-links">
                <p>
                  <Link to="/register">Nazad na registraciju</Link>
                </p>
              </div>
            </>
          )}
        </section>
      </div>

      <Background />
    </main>
  );
}