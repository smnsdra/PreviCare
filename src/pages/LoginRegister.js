import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HealthTrack.css";

const API_URL = "https://brilliant-solace-production.up.railway.app";

/* ======================================================
   LOGIN PAGE
====================================================== */
export function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState(""); // "", loading, error
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
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
      setStatus("error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Sign in to Health Track</h2>
        <p className="small-muted">Welcome back! Please log in.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-row">
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="healthtrack-input"
          />
        </div>

        <div className="auth-row">
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="healthtrack-input"
          />
        </div>

        {status === "error" && <div className="auth-error">{error}</div>}

        <button className="btn-primary" disabled={status === "loading"}>
          {status === "loading" ? "Logging in..." : "Log In"}
        </button>
      </form>

      <div className="auth-footer small-muted">
        Don’t have an account?{" "}
        <Link to="/register">Create one</Link>
      </div>
    </div>
  );
}

/* ======================================================
   REGISTER PAGE
====================================================== */
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

  const [status, setStatus] = useState(""); // "", loading, error
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    setStatus("loading");

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
      setStatus("error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Create your Health Track account</h2>
        <p className="small-muted">Sign up and get started.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="healthtrack-input"
          name="first_name"
          placeholder="First name"
          required
          onChange={handleChange}
        />

        <input
          className="healthtrack-input"
          name="last_name"
          placeholder="Last name"
          required
          onChange={handleChange}
        />

        <input
          type="email"
          className="healthtrack-input"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />

        <input
          type="password"
          className="healthtrack-input"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <input
          type="password"
          className="healthtrack-input"
          name="confirm"
          placeholder="Confirm password"
          required
          onChange={handleChange}
        />

        <select
          className="healthtrack-input"
          name="gender"
          required
          onChange={handleChange}
        >
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          type="date"
          className="healthtrack-input"
          name="date_of_birth"
          required
          onChange={handleChange}
        />

        <input
          type="number"
          step="0.01"
          className="healthtrack-input"
          name="height"
          placeholder="Height (m)"
          onChange={handleChange}
        />

        <input
          type="number"
          step="0.1"
          className="healthtrack-input"
          name="weight"
          placeholder="Weight (kg)"
          onChange={handleChange}
        />

        {status === "error" && <div className="auth-error">{error}</div>}

        <button className="btn-primary" disabled={status === "loading"}>
          {status === "loading" ? "Creating account..." : "Register"}
        </button>
      </form>

      <div className="auth-footer small-muted">
        Already have an account?{" "}
        <Link to="/login">Sign in</Link>
      </div>
    </div>
  );
}
