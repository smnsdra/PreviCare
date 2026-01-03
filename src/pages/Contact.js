import React, { useEffect, useState } from "react";

const API_URL =
  "https://brilliant-solace-production.up.railway.app/api/contact";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [contacts, setContacts] = useState([]); // READ
  const [status, setStatus] = useState("");

  /* ================= CREATE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      fetchContacts(); // تحديث القائمة
    } catch {
      setStatus("error");
    }
  };

  /* ================= READ ================= */
  const fetchContacts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  /* ================= DELETE ================= */
  const deleteContact = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchContacts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="contact section">
      <div className="container">
        <h2>Contact</h2>

        {/* ============ FORM (CREATE) ============ */}
        <form onSubmit={handleSubmit} className="php-email-form">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send</button>

          {status === "success" && <p>Message sent ✔</p>}
          {status === "error" && <p>Error ❌</p>}
        </form>

        {/* ============ READ + DELETE ============ */}
        <h3 style={{ marginTop: "40px" }}>Messages</h3>

        <table border="1" width="100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.subject}</td>
                <td>
                  <button onClick={() => deleteContact(c.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* UPDATE (اختياري – مش مطلوب للمشروع)
        <button>Edit</button>
        */}
      </div>
    </section>
  );
}
