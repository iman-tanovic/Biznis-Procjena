import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css"
import "./DashboardPage.css";

type ReportItem = {
  id: string;
  ime_firme: string
  pbv: string;
  ebitda: string;
  ebit: string;
  prodaja: string;
  dug: string;
  gotovina: string;
  vrijednost_firme: string;
  vrijednost_kapitala: string;
  datum: string;
};

type User = {
  id: string;
  ime_prezime: string;
  email: string;
  uloga: string;
  aktivan: boolean;
  created_at: string;
};

const API_BASE_URL = "";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);
  const [reportsError, setReportsError] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    void fetchUser();
    void fetchReports();
  }, []);

  async function fetchUser() {
    try {
      setLoadingUser(true);

      const response = await fetch(`${API_BASE_URL}/api/me`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Greška pri učitavanju korisnika.");
      }

      const data: User = await response.json();
      setUser(data);
    } catch (err) {
      console.error("DASHBOARD USER LOADING ERROR:", err);
    } finally {
      setLoadingUser(false);
    }
  }

  async function fetchReports() {
    try {
      setLoadingReports(true);
      setReportsError("");

      const response = await fetch(`${API_BASE_URL}/api/reports`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Greška pri učitavanju izvještaja.");
      }

      const data: ReportItem[] = await response.json();
      setReports(data);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Greška pri učitavanju izvještaja.";
      setReportsError(msg);
    } finally {
      setLoadingReports(false);
    }
  }


  async function handleLogout() {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("LOGOUT ERROR:", err);
    } finally {
      navigate("/login", { replace: true });
    }
  }

  function formatCurrency(value: string) {
    return new Intl.NumberFormat("bs-BA", {
      style: "currency",
      currency: "BAM",
      maximumFractionDigits: 0,
    }).format(Number(value));
  }

  function formatDate(value: string) {
    return new Date(value).toLocaleDateString("bs-BA");
  }

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <div className="dashboard-brand__logo">BV</div>
          <div>
            <div>
            {loadingUser ? (
              <p>Učitavam podatke korisnika...</p>
            ) : user ? (
              
                <strong>{user.ime_prezime}</strong>
                
              
            ) : (
              <p>Podaci korisnika nisu dostupni.</p>
            )}
            {loadingUser ? (
              <p>Učitavam podatke korisnika...</p>
            ) : user ? (
              <span>{user.email}</span>
              ) : (
              <p>Podaci korisnika nisu dostupni.</p>
            )}
            </div>
          </div>
          
        </div>
        <nav className="dashboard-nav">
          <Link to="/dashboard" className="dashboard-nav__item active">
            Dashboard
          </Link>
          <Link to="/calculator" className="dashboard-nav__item">
            Kalkulator
          </Link>
        </nav>

        <div className="dashboard-sidebar__bottom">
          <button className="dashboard-nav__item" onClick={handleLogout}>
            Odjava
          </button>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <span className="dashboard-topbar__eyebrow">Dashboard</span>
            <h1>Pregled izvještaja</h1>
            <p>Pregled sačuvanih procjena i osnovnih podataka korisnika.</p>
          </div>

          <div className="dashboard-topbar__actions">
            <Link to="/calculator" className="btn btn-primary">
              Nova procjena
            </Link>
          </div>
        </header>


        <section className="dashboard-grid">
          <div className="dashboard-column">
            <article className="dashboard-panel dashboard-panel--wide">
              <div className="panel-head">
                <div>
                  <span className="panel-label">Izvještaji</span>
                  <h2>Sačuvane procjene</h2>
                </div>
              </div>

              {loadingReports ? (
                <p>Učitavam izvještaje...</p>
              ) : reportsError ? (
                <p>{reportsError}</p>
              ) : reports.length === 0 ? (
                <p>Nema sačuvanih izvještaja.</p>
              ) : (
                <div className="table-wrap">
                  <table className="reports-table">
                    <thead>
                      <tr>
                        <th>Firma</th>
                        <th>PBV</th>
                        <th>EBITDA</th>
                        <th>EBIT</th>
                        <th>Prodaja</th>
                        <th>Dug</th>
                        <th>Gotovina</th>
                        <th>Vrijednost firme</th>
                        <th>Vrijednost kapitala</th>
                        <th>Datum</th>
                         <th>ID</th>
                         <th>Akcije</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => (
                        <tr key={report.id}>
                          <td>{report.ime_firme}</td>
                          <td>{report.pbv}</td>
                          <td>{report.ebitda}</td>
                          <td>{report.ebit}</td>
                          <td>{report.prodaja}</td>
                          <td>{report.dug}</td>
                          <td>{report.gotovina}</td>
                          <td>{formatCurrency(report.vrijednost_firme)}</td>
                          <td>{formatCurrency(report.vrijednost_kapitala)}</td>
                          <td>{formatDate(report.datum)}</td>
                          <td>{report.id}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>

            <article className="dashboard-panel">
              <div className="panel-head">
                <div>
                  <span className="panel-label">Kontakt</span>
                  <h2>Pomoć i podrška</h2>
                </div>
              </div>

              <div className="contact-info">
                <p>
                  Ako imaš problem sa procjenama, prijavom ili izvještajima,
                  kontaktiraj podršku.
                </p>
                <dl className="user-info-list">
                  <div>
                    <dt>Email</dt>
                    <dd>support@example.com</dd>
                  </div>
                  <div>
                    <dt>Telefon</dt>
                    <dd>+387 33 123 456</dd>
                  </div>
                </dl>
              </div>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}