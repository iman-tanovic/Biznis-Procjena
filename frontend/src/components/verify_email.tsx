import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Background from "./Background";
import "../App.css";

export default function VerifyEmailPage() {
  const navigate = useNavigate();

    return (
        <main className="auth-page">
            <Background />
            <div className="auth-card" id="verify">
            <h1>Provjera email adrese</h1>
            <p>Provjerite svoj email i kliknite na link za potvrdu registracije.
            Ako niste dobili email, provjerite spam folder ili pokušajte ponovo.</p>
            <button onClick={() => navigate("/")} className="btn btn-primary">Početna stranica</button>
            <button onClick={() => navigate("/login")} className="btn btn-primary">Nazad na prijavu</button>
        </div>
        </main>
    );
}