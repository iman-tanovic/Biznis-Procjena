import { Link } from "react-router-dom";
import  Navbar  from "../components/Navbar";
import Background from "../components/Background";
import Footer from "../components/Footer";
import "../App.css";
import "./HomePage.css";

function HomePage() {
  return (
    <main className="home-page">
      <Navbar />
      <section className="home-hero home-hero--dark">
  
    <Background />
  <div className="home-hero__content home-hero__content--centered">
    <span className="home-hero__eyebrow">Beta</span>

    <h1>Procjena vrijednosti firme</h1>

    <p className="home-hero__lead">
      Procijeni vrijednost firme brzo, jasno i bez komplikovanog unosa.
    </p>

    <div className="home-hero__actions">
      <Link to="/register" className="btn btn-primary">
        Preuzmi besplatan test
      </Link>
      <a href="#demo" className="btn btn-ghost">
        Saznaj više
      </a>
    </div>
  </div>
</section>
      <section id="demo" className="demo-section">
        <div className="demo-section__inner">
          <div className="demo-section__copy">
            <span className="demo-section__eyebrow">Demonstracija</span>
            <h2>Jednostavan Kalkulator</h2>
            <p>
              *procjena je informativnog karaktera i ne predstavlja fer vrijednost kapitala*
            </p>
          </div>

          <video
            className="demo-video"
            controls
            preload="metadata"
            poster="/images/demo.jpg"
          >
            <source src="/videos/demo.mp4" type="video/mp4" />
            Vaš browser ne podržava video.
          </video>
          </div>
      </section>
      <section className="home-proof">
        <div className="container">
          <div className="home-proof__grid">
            <div className="home-proof__visual">
              <div className="home-proof-card">
                <div className="home-proof-card__header">
                  <span className="home-proof-card__eyebrow">Pregled analize</span>
                  <span className="home-proof-card__status"></span>
                </div>

                <div className="home-proof-card__metric">
                  <span className="home-proof-card__label">Procjena vrijednosti</span>
                  <strong>KM 310.000</strong>
                </div>

                <div className="home-proof-card__bars">
                  <span className="bar bar--1"></span>
                  <span className="bar bar--2"></span>
                  <span className="bar bar--3"></span>
                  <span className="bar bar--4"></span>
                </div>

                <div className="home-proof-card__rows">
                  <div className="home-proof-card__row">
                    <span>EV</span>
                    <strong>BAM 310.000</strong>
                  </div>
                  <div className="home-proof-card__row">
                    <span>Kapital</span>
                    <strong>BAM 296.000</strong>
                  </div>
                  <div className="home-proof-card__row">
                    <span>Vrijednost dionice</span>
                    <strong>BAM 5</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="home-proof__content">
              <span className="section-heading__eyebrow">Zašto koristiti alat</span>
              <h2 className="home-proof__title">
                Početni pregled vrijednosti firme bez komplikovanog procesa
              </h2>
              <p className="home-proof__text">
                Alat je namijenjen vlasnicima koji žele brz i uredan uvid u vrijednost
                svog biznisa kroz jednostavan unos ključnih finansijskih podataka.
              </p>

              <div className="home-proof__list">
                <div className="home-proof__item">
                  <h3>Brz početak</h3>
                  <p>Nema dugog procesa ni tehnički komplikovanih koraka za prvi pregled.</p>
                </div>

                <div className="home-proof__item">
                  <h3>Pregledan rezultat</h3>
                  <p>Dobijate čist prikaz procjene i osnovnih pokazatelja na jednom mjestu.</p>
                </div>
              </div>
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
            Vrijednost firme, kapitala i sažetak zaključka  koji predstavljaju procjenu informativnog karaktera, prikazani su jasno i dostupni u vidu izvjestaja.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default HomePage;