import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HealthTrack.css";

// --- LOGIN PAGE ---
export function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    if (onLogin) {
      onLogin({ email: form.email });
    }
    // Simulate login and redirect to dashboard
    localStorage.setItem("healthtrack-user", JSON.stringify({ email: form.email }));
    navigate("/healthtrack");
  }

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Sign in to Health Track</h2>
        <p className="small-muted">Welcome back! Please log in to your wellness dashboard.</p>
      </div>
      <form className="auth-form" onSubmit={submit} autoComplete="on">
        <div className="auth-row">
          <label>Email</label>
          <input
            type="email"
            required
            autoFocus
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="you@email.com"
            className="healthtrack-input"
            autoComplete="username"
          />
        </div>
        <div className="auth-row">
          <label>Password</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            placeholder="********"
            className="healthtrack-input"
            autoComplete="current-password"
          />
        </div>
        {error && <div className="auth-error">{error}</div>}
        <button className="btn-primary" type="submit">Log In</button>
      </form>
      <div className="auth-footer small-muted">
        Don’t have an account?{" "}
        <Link to="/register" style={{ color: "var(--pc-turquoise)" }}>Create one</Link>
      </div>
    </div>
  );
}

// --- REGISTER PAGE ---
export function RegisterPage({ onRegister }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    gender: "",
    dateOfBirth: "",
    height: "",
    weight: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.confirm ||
      !form.gender ||
      !form.dateOfBirth
    ) {
      setError("Please fill all required fields.");
      return;
    }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    setError("");
    if (onRegister) {
      onRegister({ email: form.email });
    }
    // Simulate register and redirect to dashboard
    localStorage.setItem("healthtrack-user", JSON.stringify({
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      gender: form.gender,
      dateOfBirth: form.dateOfBirth,
      height: form.height,
      weight: form.weight,
    }));
    navigate("/healthtrack");
  }

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Create your Health Track account</h2>
        <p className="small-muted">Sign up and start tracking your wellbeing now.</p>
      </div>
      <form className="auth-form" onSubmit={submit} autoComplete="on">
        <div className="auth-row">
          <label>First Name <span style={{color:"#e56161"}}>*</span></label>
          <input
            type="text"
            required
            value={form.firstName}
            onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
            placeholder="Your first name"
            className="healthtrack-input"
            autoComplete="given-name"
          />
        </div>
        <div className="auth-row">
          <label>Last Name <span style={{color:"#e56161"}}>*</span></label>
          <input
            type="text"
            required
            value={form.lastName}
            onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
            placeholder="Your last name"
            className="healthtrack-input"
            autoComplete="family-name"
          />
        </div>
        <div className="auth-row">
          <label>Email <span style={{color:"#e56161"}}>*</span></label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="you@email.com"
            className="healthtrack-input"
            autoComplete="username"
          />
        </div>
        <div className="auth-row">
          <label>Password <span style={{color:"#e56161"}}>*</span></label>
          <input
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            placeholder="At least 6 characters"
            className="healthtrack-input"
            autoComplete="new-password"
          />
        </div>
        <div className="auth-row">
          <label>Confirm Password <span style={{color:"#e56161"}}>*</span></label>
          <input
            type="password"
            required
            minLength={6}
            value={form.confirm}
            onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
            placeholder="Re-enter your password"
            className="healthtrack-input"
            autoComplete="new-password"
          />
        </div>
        <div className="auth-row">
          <label>Gender <span style={{color:"#e56161"}}>*</span></label>
          <select
            required
            value={form.gender}
            onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
            className="healthtrack-input"
          >
            <option value="">Select gender…</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
            <option>Prefer not to say</option>
          </select>
        </div>
        <div className="auth-row">
          <label>Date of Birth <span style={{color:"#e56161"}}>*</span></label>
          <input
            type="date"
            required
            value={form.dateOfBirth}
            onChange={e => setForm(f => ({ ...f, dateOfBirth: e.target.value }))}
            className="healthtrack-input"
            autoComplete="bday"
            max={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="auth-row">
          <label>Height (m)</label>
          <input
            type="number"
            min={0.5}
            max={2.5}
            step={0.01}
            value={form.height}
            onChange={e => setForm(f => ({ ...f, height: e.target.value }))}
            placeholder="e.g. 1.65"
            className="healthtrack-input"
          />
        </div>
        <div className="auth-row">
          <label>Weight (kg)</label>
          <input
            type="number"
            min={20}
            max={300}
            step={0.1}
            value={form.weight}
            onChange={e => setForm(f => ({ ...f, weight: e.target.value }))}
            placeholder="e.g. 60"
            className="healthtrack-input"
          />
        </div>
        {error && <div className="auth-error">{error}</div>}
        <button className="btn-primary" type="submit">Register</button>
      </form>
      <div className="auth-footer small-muted">
        Already have an account?{" "}
        <Link to="/login" style={{ color: "var(--pc-turquoise)" }}>Sign in</Link>
      </div>
    </div>
  );
}