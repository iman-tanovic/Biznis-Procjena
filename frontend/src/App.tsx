import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CalculatorPage from "./pages/CalculatorPage";
import DashboardPage from "./pages/DashboardPage";
import VerifyEmailPage from "./components/verify_email";
import VerifyAccountPage from "./pages/VerifyAccountPage";

function NotFoundPage() {
  return <div>404 - Stranica ne postoji</div>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify/:token" element={<VerifyAccountPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/app" element={<Navigate to="/dashboard" replace />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}