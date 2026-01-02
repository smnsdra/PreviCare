import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HealthTrack.css";

const API_URL = "https://brilliant-solace-production.up.railway.app/api";

/* ================= LOGIN ================= */
export function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("healthtrack-token", data.token);
      localStorage.setItem("healthtrack-user", JSON.stringify(data.user));

      navigate("/healthtrack");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Sign in to Health Track</h2>
        <p className="small-muted">Welcome back! Please log in.</p>
      </div>

      <form className="auth-form" onSubmit={submit}>
        <div className="auth-row">
          <label>Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="healthtrack-input"
          />
        </div>

        <div className="auth-row">
          <label>Password</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="healthtrack-input"
          />
        </div>

        {error && <div className="auth-error">{error}</div>}
        <button className="btn-primary">Log In</button>
      </form>

      <div className="auth-footer small-muted">
        Don’t have an account?{" "}
        <Link to="/register">Create one</Link>
      </div>
    </div>
  );
}

/* ================= REGISTER ================= */
export function RegisterPage() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm: "",
    gender: "",
    date_of_birth: "",
    height: "",
    weight: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Register failed");

      localStorage.setItem("healthtrack-token", data.token);
      localStorage.setItem("healthtrack-user", JSON.stringify(data.user));

      navigate("/healthtrack");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Create your Health Track account</h2>
        <p className="small-muted">Sign up to get started.</p>
      </div>

      <form className="auth-form" onSubmit={submit}>
        <input className="healthtrack-input" placeholder="First name"
          onChange={e => setForm({ ...form, first_name: e.target.value })} required />
        <input className="healthtrack-input" placeholder="Last name"
          onChange={e => setForm({ ...form, last_name: e.target.value })} required />
        <input type="email" className="healthtrack-input" placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" className="healthtrack-input" placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })} required />
        <input type="password" className="healthtrack-input" placeholder="Confirm password"
          onChange={e => setForm({ ...form, confirm: e.target.value })} required />

        <select className="healthtrack-input"
          onChange={e => setForm({ ...form, gender: e.target.value })} required>
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input type="date" className="healthtrack-input"
          onChange={e => setForm({ ...form, date_of_birth: e.target.value })} required />

        <input type="number" step="0.01" className="healthtrack-input"
          placeholder="Height (m)"
          onChange={e => setForm({ ...form, height: e.target.value })} />

        <input type="number" step="0.1" className="healthtrack-input"
          placeholder="Weight (kg)"
          onChange={e => setForm({ ...form, weight: e.target.value })} />

        {error && <div className="auth-error">{error}</div>}
        <button className="btn-primary">Register</button>
      </form>

      <div className="auth-footer small-muted">
        Already have an account? <Link to="/login">Sign in</Link>
      </div>
    </div>
  );
}
