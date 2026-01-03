import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./HealthTrack.css";

const API_URL = "https://brilliant-solace-production.up.railway.app/api";

/* ================= LOGIN ================= */
export function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
      if (!res.ok) throw new Error(data.error);

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
      <h2>Sign in</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="healthtrack-input"
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />

        <input
          className="healthtrack-input"
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        {status === "error" && <div className="auth-error">{error}</div>}

        <button className="btn-primary">
          {status === "loading" ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="small-muted">
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
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
  });

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

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
      <h2>Create Account</h2>

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
          className="healthtrack-input"
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />

        <input
          className="healthtrack-input"
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <input
          className="healthtrack-input"
          type="password"
          name="confirm"
          placeholder="Confirm password"
          required
          onChange={handleChange}
        />

        {status === "error" && <div className="auth-error">{error}</div>}

        <button className="btn-primary">
          {status === "loading" ? "Creating..." : "Register"}
        </button>
      </form>

      <p className="small-muted">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
