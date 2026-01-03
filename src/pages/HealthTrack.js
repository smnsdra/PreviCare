import React, { useState, useEffect } from "react";
import "./HealthTrack.css";

/* ================== HEALTH TRACK (CRUD) ================== */

const DEFAULT_HEIGHT = 1.66;

export default function HealthTrack() {
  const [entries, setEntries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("health_entries")) || [];
    } catch {
      return [];
    }
  });

  const emptyForm = {
    weight: "",
    height: "",
    sleepHours: "",
    water: "",
    steps: "",
    heartRate: "",
    mood: "neutral",
    notes: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  /* ---------- LOCAL STORAGE ---------- */
  useEffect(() => {
    localStorage.setItem("health_entries", JSON.stringify(entries));
  }, [entries]);

  /* ---------- CREATE / UPDATE ---------- */
  function handleSubmit(e) {
    e.preventDefault();

    if (editingId) {
      // UPDATE
      setEntries((prev) =>
        prev.map((e) =>
          e.id === editingId ? { ...e, ...form } : e
        )
      );
      setEditingId(null);
    } else {
      // CREATE
      const entry = {
        id: Date.now(), // id يدوي مثل ما بدك
        date: new Date().toISOString(),
        ...form,
      };
      setEntries((prev) => [entry, ...prev]);
    }

    setForm(emptyForm);
  }

  /* ---------- DELETE ---------- */
  function deleteEntry(id) {
    if (!window.confirm("Delete this entry?")) return;
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  /* ---------- EDIT ---------- */
  function editEntry(entry) {
    setForm({
      weight: entry.weight,
      height: entry.height,
      sleepHours: entry.sleepHours,
      water: entry.water,
      steps: entry.steps,
      heartRate: entry.heartRate,
      mood: entry.mood,
      notes: entry.notes,
    });
    setEditingId(entry.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ---------- HELPERS ---------- */
  function bmi(e) {
    const w = Number(e.weight);
    const h = Number(e.height) || DEFAULT_HEIGHT;
    return w && h ? (w / (h * h)).toFixed(1) : "-";
  }

  function moodIcon(m) {
    if (m === "happy") return "😊";
    if (m === "neutral") return "😐";
    if (m === "tired") return "😑";
    if (m === "sad") return "😞";
    return "-";
  }

  /* ================== UI ================== */
  return (
    <div className="healthtrack-container">
      {/* -------- FORM -------- */}
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: 520, margin: "30px auto", display: "grid", gap: 10 }}
      >
        <h3 style={{ textAlign: "center" }}>
          {editingId ? "Edit Entry" : "Add Entry"}
        </h3>

        <input
          className="healthtrack-input"
          type="number"
          placeholder="Weight (kg)"
          value={form.weight}
          onChange={(e) => setForm({ ...form, weight: e.target.value })}
        />

        <input
          className="healthtrack-input"
          type="number"
          step="0.01"
          placeholder="Height (m)"
          value={form.height}
          onChange={(e) => setForm({ ...form, height: e.target.value })}
        />

        <input
          className="healthtrack-input"
          type="number"
          placeholder="Sleep (hours)"
          value={form.sleepHours}
          onChange={(e) =>
            setForm({ ...form, sleepHours: e.target.value })
          }
        />

        <input
          className="healthtrack-input"
          type="number"
          step="0.1"
          placeholder="Water (L)"
          value={form.water}
          onChange={(e) => setForm({ ...form, water: e.target.value })}
        />

        <input
          className="healthtrack-input"
          type="number"
          placeholder="Steps"
          value={form.steps}
          onChange={(e) => setForm({ ...form, steps: e.target.value })}
        />

        <input
          className="healthtrack-input"
          type="number"
          placeholder="Heart rate"
          value={form.heartRate}
          onChange={(e) =>
            setForm({ ...form, heartRate: e.target.value })
          }
        />

        <select
          className="healthtrack-input"
          value={form.mood}
          onChange={(e) => setForm({ ...form, mood: e.target.value })}
        >
          <option value="happy">Happy 😊</option>
          <option value="neutral">Neutral 😐</option>
          <option value="tired">Tired 😑</option>
          <option value="sad">Sad 😞</option>
        </select>

        <textarea
          className="healthtrack-input"
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <button className="btn-primary">
          {editingId ? "Update Entry" : "Add Entry"}
        </button>
      </form>

      {/* -------- TABLE (READ + UPDATE + DELETE) -------- */}
      <section
        className="recent-entries-section"
        style={{ maxWidth: 900, margin: "40px auto" }}
      >
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
            {entries.map((e) => (
              <tr key={e.id}>
                <td>
                  {new Date(e.date).toLocaleDateString()}
                </td>
                <td>{bmi(e)}</td>
                <td>{e.sleepHours || "-"}</td>
                <td>{e.water || "-"}</td>
                <td>{e.steps || "-"}</td>
                <td>{e.heartRate || "-"}</td>
                <td>{moodIcon(e.mood)}</td>
                <td>
                  <button
                    onClick={() => editEntry(e)}
                    style={{
                      marginRight: 6,
                      padding: "4px 8px",
                      borderRadius: 8,
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteEntry(e.id)}
                    style={{
                      padding: "4px 8px",
                      borderRadius: 8,
                    }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
