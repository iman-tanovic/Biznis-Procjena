import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./CalculatorPage.css";

type CalculationResponse = {
  ime_firme: string;
  kategorija: string;
  PBV: number;
  EBITDA: number;
  EBIT: number;
  prodaja: number;
  dug: number;
  gotovina: number;
  vrijednost_firme: number;
  vrijednost_kapitala: number;
  zakljucak: string;
  cijena_pd: number;
};

type FormState = {
  ime_firme: string;
  kategorija: string;
  pbv: string;
  ebitda: string;
  ebit: string;
  prodaja: string;
  dug: string;
  gotovina: string;
  broj_dionica : string;
};

type CurrentUser = {
  id: string;
  ime_prezime: string;
  email: string;
  uloga: string;
  aktivan: boolean;
  created_at: string;
};

const initialState: FormState = {
  ime_firme: "Primjer d.o.o.",
  kategorija: "Kucni proizvodi",
  pbv: "1,000,000",
  ebitda: "500,000",
  ebit: "400,000",
  prodaja: "250,000",
  dug: "10,000",
  gotovina: "5,000",
  broj_dionica: "0"
};

const API_BASE_URL = "";

function formatThousands(value: string) {
  const digitsOnly = value.replace(/\D/g, "");

  if (!digitsOnly) return "";

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Number(digitsOnly));
}

function parseFormattedNumber(value: string) {
  const digitsOnly = value.replace(/\D/g, "");
  return digitsOnly ? Number(digitsOnly) : 0;
}

export default function CalculatorPage() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const [result, setResult] = useState<CalculationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [industries, setIndustries] = useState<string[]>([]);
  const [loadingIndustries, setLoadingIndustries] = useState(true);
  const [savingReport, setSavingReport] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [form, setForm] = useState<FormState>(initialState);

  async function fetchIndustries() {
    try {
      setLoadingIndustries(true);
      setError("");

      const response = await fetch(`${API_BASE_URL}/api/industries`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Greška pri učitavanju industrija");
      }

      const data: string[] = await response.json();
      setIndustries(data);

      if (data.length > 0) {
        setForm((prev) => ({
          ...prev,
          kategorija: prev.kategorija || data[0],
        }));
      }
    } catch (err) {
      console.error("Greška pri učitavanju industrija:", err);
      setError("Ne mogu učitati industrije");
    } finally {
      setLoadingIndustries(false);
    }
  }

  useEffect(() => {
    void fetchIndustries();
  }, []);

  function handleFormattedNumberChange(
    field: keyof Pick<FormState, "pbv" | "ebitda" | "ebit" | "prodaja" | "dug" | "gotovina" | "broj_dionica">,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: formatThousands(value),
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!form.kategorija) {
      setError("Odaberi industriju.");
      return;
    }

    setLoading(true);
    setError("");
    setSaveMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/valuation/multiples`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ime_firme: form.ime_firme,
          kategorija: form.kategorija,
          PBV: parseFormattedNumber(form.pbv),
          EBITDA: parseFormattedNumber(form.ebitda),
          EBIT: parseFormattedNumber(form.ebit),
          prodaja: parseFormattedNumber(form.prodaja),
          dug: parseFormattedNumber(form.dug),
          gotovina: parseFormattedNumber(form.gotovina),
          broj_dionica: parseFormattedNumber(form.broj_dionica),
        }),
      });

      const raw = await response.text();

      if (!response.ok) {
        throw new Error(raw || "Greška pri računanju procjene.");
      }

      const data: CalculationResponse = JSON.parse(raw);
      setResult(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Došlo je do greške.";
      setError(msg);
      console.error("CALCULATION ERROR:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveReport() {
    if (!result) return;

    try {
      setSavingReport(true);
      setSaveMessage("");
      setError("");

      const response = await fetch(`${API_BASE_URL}/api/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ime_firme: result.ime_firme,
          kategorija: result.kategorija,
          pbv: result.PBV,
          ebitda: result.EBITDA,
          ebit: result.EBIT,
          prodaja: result.prodaja,
          dug: result.dug,
          gotovina: result.gotovina,
          vrijednost_firme: result.vrijednost_firme,
          vrijednost_kapitala: result.vrijednost_kapitala,
          cijena_pd: result.cijena_pd,
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
            : data?.detail || "Greška pri spašavanju izvještaja.";
        throw new Error(message);
      }

      setSaveMessage("Izvještaj je uspješno spašen.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Došlo je do greške.";
      setError(msg);
      console.error("SAVE REPORT ERROR:", err);
    } finally {
      setSavingReport(false);
    }
  }

  return (
    <main className="calc-page">
      <header className="calc-topbar">
        <div>
          <span className="eyebrow">Procjena vrijednosti</span>
          <h1>Kalkulator</h1>
          <p>
            Pregledan alat za brzu procjenu vrijednosti firme, optimizovan za
            desktop i mobitel.
          </p>
        </div>

        <div className="topbar-actions">
          <Link to="/dashboard" className="btn btn-ghost">
            Home
          </Link>
        </div>
      </header>

      <section className="calc-shell">
        <form className="panel form-panel" onSubmit={handleSubmit}>
          <div className="panel-head">
            <h2>Kalkulator multiplikatora</h2>
            <p>
              Unesi osnovne finansijske podatke i dobij procjenu u nekoliko
              sekundi.
            </p>
          </div>

          <div className="form-grid">
            <label className="field full">
              <span>Naziv firme</span>
              <input
                value={form.ime_firme}
                onChange={(e) =>
                  setForm({ ...form, ime_firme: e.target.value })
                }
              />
            </label>

            <label className="field">
              <span>Industrija</span>
              {loadingIndustries ? (
                <div className="loading-select">Učitavam industrije...</div>
              ) : industries.length === 0 ? (
                <select disabled>
                  <option>Nema dostupnih industrija</option>
                </select>
              ) : (
                <select
                  value={form.kategorija}
                  onChange={(e) =>
                    setForm({ ...form, kategorija: e.target.value })
                  }
                  disabled={loadingIndustries}
                >
                  {industries.map((industrija) => (
                    <option key={industrija} value={industrija}>
                      {industrija}
                    </option>
                  ))}
                </select>
              )}
            </label>

            <label className="field">
              <span>PBV</span>
              <input
                type="text"
                inputMode="numeric"
                value={form.pbv}
                onChange={(e) =>
                  handleFormattedNumberChange("pbv", e.target.value)
                }
              />
            </label>

            <label className="field">
              <span>EBITDA</span>
              <input
                type="text"
                inputMode="numeric"
                value={form.ebitda}
                onChange={(e) =>
                  handleFormattedNumberChange("ebitda", e.target.value)
                }
              />
            </label>

            <label className="field">
              <span>EBIT</span>
              <input
                type="text"
                inputMode="numeric"
                value={form.ebit}
                onChange={(e) =>
                  handleFormattedNumberChange("ebit", e.target.value)
                }
              />
            </label>

            <label className="field">
              <span>Prodaja</span>
              <input
                type="text"
                inputMode="numeric"
                value={form.prodaja}
                onChange={(e) =>
                  handleFormattedNumberChange("prodaja", e.target.value)
                }
              />
            </label>

            <label className="field">
              <span>Dug</span>
              <input
                type="text"
                inputMode="numeric"
                value={form.dug}
                onChange={(e) =>
                  handleFormattedNumberChange("dug", e.target.value)
                }
              />
            </label>

            <label className="field">
              <span>Gotovina</span>
              <input
                type="text"
                inputMode="numeric"
                value={form.gotovina}
                onChange={(e) =>
                  handleFormattedNumberChange("gotovina", e.target.value)
                }
              />
            </label>

            <label className="field">
              <span>Broj dionica</span>
              <input
                type="text"
                inputMode="numeric"
                value={form.broj_dionica}
                onChange={(e) =>
                  handleFormattedNumberChange("broj_dionica", e.target.value)
                }
              />
            </label>
          </div>

          <button
            className="btn btn-primary btn-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Računam..." : "Izračunaj vrijednost"}
          </button>

          {error && <div className="alert alert-error">{error}</div>}
        </form>

        <aside className="panel result-panel">
          <div className="panel-head">
            <h2>Rezultat</h2>
            <p>Sažetak procjene i ključnih finansijskih pokazatelja.</p>
          </div>

          {result ? (
            <>
              <div className="result-kpis">
                <div className="kpi">
                  <span>Vrijednost firme</span>
                  <strong>{formatCurrency(result.vrijednost_firme)}</strong>
                </div>
                <div className="kpi">
                  <span>Vrijednost kapitala</span>
                  <strong>
                    {formatCurrency(result.vrijednost_kapitala)}
                  </strong>
                </div>
                 {result.cijena_pd != 0 &&
                <div className="kpi">
                  <span>Vrijednost dionice</span>
                  <strong>
                    {formatCurrency(result.cijena_pd)}
                  </strong>
                </div>} 
              </div>

              <div className="summary-box">
                <p className="summary-text">{result.zakljucak}</p>
              </div>

              <div className="result-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleSaveReport}
                  disabled={savingReport}
                >
                  {savingReport ? "Spašavam..." : "Spasi izvještaj"}
                </button>
              </div>

              {saveMessage && (
                <div className="alert alert-success">{saveMessage}</div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-illustration" aria-hidden="true">
                <div className="mock-chart mock-chart--lg" />
                <div className="mock-chart mock-chart--sm" />
                <div className="mock-chart mock-chart--md" />
              </div>
              <h3>Nema rezultata još</h3>
              <p>
                Popuni formu lijevo i pokreni kalkulator da vidiš procjenu u
                desnoj kartici.
              </p>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("bs-BA", {
    style: "currency",
    currency: "BAM",
    maximumFractionDigits: 0,
  }).format(value);
}