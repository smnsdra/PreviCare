import React, { useState, useEffect } from "react";
import "./HealthTrack.css";

/* ================= ICONS ================= */
const ICONS = {
  bmi: (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <ellipse cx="18" cy="18" rx="17" ry="17" stroke="var(--pc-turquoise)" strokeWidth="2.8" fill="#f7faf9"/>
      <rect x="17" y="13" width="2" height="10.5" rx="1" fill="var(--pc-green)" />
      <polygon points="18,7 16,13 20,13" fill="var(--pc-green)" />
      <circle cx="18" cy="12.4" r="2" fill="var(--pc-turquoise)" />
    </svg>
  ),
  sleep_ok: (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <ellipse cx="18" cy="18" rx="17" ry="17" stroke="#8B82FF" strokeWidth="2.8" fill="#f6f8fe"/>
      <ellipse cx="15.5" cy="16.2" rx="1.2" ry="1.4" fill="#8B82FF"/>
      <ellipse cx="20.5" cy="16.2" rx="1.2" ry="1.4" fill="#8B82FF"/>
      <path d="M15 22 Q18 24.6 21 22" stroke="#625be9" strokeWidth="1.45" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  sleep_bad: (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <ellipse cx="18" cy="18" rx="17" ry="17" stroke="#8B82FF" strokeWidth="2.8" fill="#f6f8fe"/>
      <ellipse cx="15.5" cy="16.2" rx="1.2" ry="1.4" fill="#8B82FF"/>
      <ellipse cx="20.5" cy="16.2" rx="1.2" ry="1.4" fill="#8B82FF"/>
      <path d="M15 23 Q18 20.2 21 23" stroke="#625be9" strokeWidth="1.45" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  water: (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <ellipse cx="18" cy="18" rx="17" ry="17" stroke="#0EC4B3" strokeWidth="2.8" fill="#f3fcfa"/>
      <ellipse cx="18" cy="23" rx="7" ry="3.4" fill="#0EC4B3" opacity="0.20" />
      <path d="M18 10 Q22.7 19 18 27 Q13.3 19 18 10Z" fill="#0EC4B3" opacity="0.18"/>
    </svg>
  ),
  steps: (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <ellipse cx="18" cy="18" rx="17" ry="17" stroke="#fb7171" strokeWidth="2.8" fill="#fef7f5"/>
      <path d="M10 25 Q18 14 26 22" stroke="#fb7171" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  heart: (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <ellipse cx="18" cy="18" rx="17" ry="17" stroke="#ff4666" strokeWidth="2.7" fill="#fef6fa"/>
      <polyline points="9,22 16,17 20,26 24,8 29,27" fill="none" stroke="#ff4666" strokeWidth="2.1" strokeLinecap="round"/>
    </svg>
  ),
};

const MOODS = [
  { key: "happy", icon: "😊" },
  { key: "neutral", icon: "😐" },
  { key: "tired", icon: "😑" },
  { key: "sad", icon: "😞" }
];

const DEFAULT_HEIGHT = 1.66;

/* ================= COMPONENT ================= */
export default function HealthTrack() {

  const [entries, setEntries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("health_entries")) || [];
    } catch {
      return [];
    }
  });

  const emptyForm = {
    weight: "", height: "",
    systolic: "", diastolic: "",
    heartRate: "", sleepHours: "",
    water: 1.5, steps: 0,
    mood: "neutral", notes: ""
  };

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  /* ---------- LOCAL STORAGE ---------- */
  useEffect(() => {
    localStorage.setItem("health_entries", JSON.stringify(entries));
  }, [entries]);

  /* ---------- ADD / UPDATE ---------- */
  function submitEntry(e) {
    e.preventDefault();

    if (editingId) {
      setEntries(prev =>
        prev.map(en => en.id === editingId ? { ...en, ...form } : en)
      );
      setEditingId(null);
    } else {
      setEntries(prev => [
        { id: Date.now(), date: new Date().toISOString(), ...form },
        ...prev
      ]);
    }
    setForm(emptyForm);
  }

  /* ---------- EDIT ---------- */
  function editEntry(e) {
    setForm({ ...e });
    setEditingId(e.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------- DELETE ---------- */
  function deleteEntry(id) {
    if (!window.confirm("Delete this entry?")) return;
    setEntries(prev => prev.filter(e => e.id !== id));
  }

  function bmi(e) {
    const w = Number(e.weight);
    const h = Number(e.height) || DEFAULT_HEIGHT;
    return w && h ? (w / (h * h)).toFixed(1) : "-";
  }

  function tableMood(m) {
    return MOODS.find(x => x.key === m)?.icon || "-";
  }

  /* ================= UI ================= */
  return (
    <div className="healthtrack-container">

      {/* -------- FORM -------- */}
      <form onSubmit={submitEntry} style={{ maxWidth: 520, margin: "30px auto", display: "grid", gap: 10 }}>
        <h3 style={{ textAlign: "center" }}>
          {editingId ? "Edit Entry" : "Add Entry"}
        </h3>

        <input className="healthtrack-input" placeholder="Weight (kg)"
          value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))} />

        <input className="healthtrack-input" placeholder="Height (m)"
          value={form.height} onChange={e => setForm(f => ({ ...f, height: e.target.value }))} />

        <input className="healthtrack-input" placeholder="Sleep (h)"
          value={form.sleepHours} onChange={e => setForm(f => ({ ...f, sleepHours: e.target.value }))} />

        <input className="healthtrack-input" placeholder="Water (L)"
          value={form.water} onChange={e => setForm(f => ({ ...f, water: e.target.value }))} />

        <input className="healthtrack-input" placeholder="Steps"
          value={form.steps} onChange={e => setForm(f => ({ ...f, steps: e.target.value }))} />

        <input className="healthtrack-input" placeholder="Heart rate"
          value={form.heartRate} onChange={e => setForm(f => ({ ...f, heartRate: e.target.value }))} />

        <textarea className="healthtrack-input" placeholder="Notes"
          value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />

        <button className="btn-primary">
          {editingId ? "Update Entry" : "Add Entry"}
        </button>
      </form>

      {/* -------- TABLE (CRUD) -------- */}
      <section className="recent-entries-section" style={{ maxWidth: 900, margin: "40px auto" }}>
        <h4 className="small-muted">Recent Entries</h4>

        <table className="recent-entries-table-ui">
          <thead>
            <tr>
              <th>Date</th>
              <th>BMI</th>
              <th>Sleep</th>
              <th>Water</th>
              <th>Steps</th>
              <th>Heart</th>
              <th>Mood</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {entries.slice(0, 12).map(e => (
              <tr key={e.id}>
                <td>{new Date(e.date).toLocaleDateString()}</td>
                <td>{bmi(e)}</td>
                <td>{e.sleepHours || "-"}</td>
                <td>{e.water || "-"}</td>
                <td>{e.steps || "-"}</td>
                <td>{e.heartRate || "-"}</td>
                <td>{tableMood(e.mood)}</td>
                <td>
                  <button onClick={() => editEntry(e)} style={{ marginRight: 6 }}>✏️</button>
                  <button onClick={() => deleteEntry(e.id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
