import { Link, Navigate } from "react-router-dom";
import "../App.css"
import "./HomePage.css";

function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero__content">
          <span className="home-hero__eyebrow">Procjena vrijednosti biznisa</span>

          <h1>
            Procijeni vrijednost firme brzo, jasno i bez komplikovanog unosa
          </h1>

          <p className="home-hero__lead">
            Web aplikacija za procjenu vrijednosti biznisa preko multiplikatora.
            Unesi ključne finansijske podatke, odaberi industriju i odmah dobij
            pregled vrijednosti firme i kapitala.
          </p>

          <div className="home-hero__actions">
            {/*<Link to="/register" className="btn btn-primary">
              Kreiraj račun
            </Link>*/}
            <Link to="/login" className="btn btn-secondary">
              Prijavi se
            </Link>
          </div>
        </div>

        <div className="home-hero__visual">
          <div className="calculator-preview">
            <div className="calculator-preview__header">
              <div>
                <span className="calculator-preview__eyebrow">Procjena vrijednosti</span>
                <h3>Kalkulator multiplikatora</h3>
                <p>Unesi osnovne finansijske podatke i dobij procjenu u nekoliko sekundi.</p>
              </div>
            </div>

            <div className="calculator-preview__body">
              <div className="calculator-preview__form">
                <div className="field field--full">
                  <label>Naziv firme</label>
                  <div className="fake-input">Primjer d.o.o.</div>
                </div>

                <div className="field">
                  <label>Industrija</label>
                  <div className="fake-select">Nekretnine</div>
                </div>

                <div className="field">
                  <label>PBV</label>
                  <div className="fake-input">....</div>
                </div>

                <div className="field">
                  <label>EBITDA</label>
                  <div className="fake-input">....</div>
                </div>

                <div className="field">
                  <label>EBIT</label>
                  <div className="fake-input">....</div>
                </div>

                <div className="field">
                  <label>Prodaja</label>
                  <div className="fake-input">....</div>
                </div>

                <div className="field">
                  <label>Dug</label>
                  <div className="fake-input">....</div>
                </div>

                <div className="field">
                  <label>Gotovina</label>
                  <div className="fake-input">....</div>
                </div>

               
              </div>

              <aside className="calculator-preview__result">
                <h3>Rezultat</h3>
              

                <div className="result-empty-box"></div>

                
                
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="feature-card">
          <span className="feature-icon">01</span>
          <h2>Jednostavan unos</h2>
          <p>
            Korisnik unosi osnovne finansijske podatke bez nepotrebnih koraka i
            komplikovane navigacije.
          </p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">02</span>
          <h2>Brza procjena</h2>
          <p>
            Aplikacija računa procjenu na osnovu multiplikatora i odmah vraća
            pregledan rezultat.
          </p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">03</span>
          <h2>Pregled rezultata</h2>
          <p>
            Vrijednost firme, kapitala i sažetak zaključka prikazani su jasno i
            spremni za dalje korištenje.
          </p>
        </div>
      </section>
    </main>
  );
}

export default HomePage;