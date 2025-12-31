import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(
        "https://brilliant-solace-production.up.railway.app/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error");

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container section-title">
        <h2>Contact</h2>
        <p>Questions, partnership requests, or workshop registrations — get in touch.</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4">
            <div className="info-item d-flex">
              <i className="bi bi-geo-alt"></i>
              <div>
                <h3>Location</h3>
                <p>Beirut, Lebanon</p>
              </div>
            </div>

            <div className="info-item d-flex">
              <i className="bi bi-telephone"></i>
              <div>
                <h3>Call Us</h3>
                <p>+961 3 370 665</p>
              </div>
            </div>

            <div className="info-item d-flex">
              <i className="bi bi-envelope"></i>
              <div>
                <h3>Email Us</h3>
                <p>previcarelb@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <form onSubmit={handleSubmit} className="php-email-form">
              <div className="row gy-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-12">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-12">
                  <textarea
                    name="message"
                    rows="6"
                    className="form-control"
                    placeholder="Message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-12 text-center">
                  {status === "loading" && <div className="loading">Sending...</div>}
                  {status === "success" && <div className="sent-message">Your message has been sent. Thank you!</div>}
                  {status === "error" && <div className="error-message">Something went wrong. Try again.</div>}
                  <button type="submit">Send Message</button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
