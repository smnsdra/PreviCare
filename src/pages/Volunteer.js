import React, { useState } from "react";

export default function Volunteer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    major: "",
    institution: "",
    motivation: "",
    passion: "",
    teams: [],
    teamExplanation: "",
    hoursPerWeek: "",
    additional: ""
  });
  const [cvFileName, setCvFileName] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "teams") {
      const val = e.target.value;
      setForm(prev => {
        const exists = prev.teams.includes(val);
        const teams = exists ? prev.teams.filter(t => t !== val) : [...prev.teams, val];
        return { ...prev, teams };
      });
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  }

  function handleFile(e) {
    const file = e.target.files[0];
    if (file) {
      setCvFileName(file.name);
    } else {
      setCvFileName(null);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const applications = JSON.parse(localStorage.getItem("previcare_volunteers") || "[]");
    const payload = { ...form, cvFileName, submittedAt: new Date().toISOString() };
    applications.unshift(payload);
    localStorage.setItem("previcare_volunteers", JSON.stringify(applications));
    setSubmitted(true);
    console.log("Volunteer application saved:", payload);
  }

  const teamOptions = [
    "Health Education and Awareness (Speakers)",
    "Research and Data Collection (Content)",
    "Event Planning and Coordination",
    "Social Media and Marketing",
    "Design",
    "Logistics",
    "IT",
    "PR (Public Relations)",
    "Other"
  ];

  // Offers (same content) but we'll render them in a horizontal ribbon strip (no boxed cards)
    const offers = [
      {
        id: "cert",
        icon: "bi-award-fill",
        title: "Free Volunteer Certificate",
        text: (
          <>
            Official certificate after verified hours <br />
            A credible addition to your CV.
          </>
        )
      },
      {
        id: "mentorship",
        icon: "bi-person-lines-fill",
        title: "Mentorship",
        text: (
          <>
            Pair with experienced mentors <br /> 
            for guidance during your journey.
          </>
        )
      },
      {
        id: "training",
        icon: "bi-mortarboard-fill",
        title: "Structured Training",
        text: (
          <>
            Practical, role-specific workshops <br />
            to build real skills.
          </>
        )
      },
      {
        id: "network",
        icon: "bi-people",
        title: "Network & References",
        text: (
          <>
            Grow professional connections <br />
            & access references from project leads.
          </>
        )
      },
      {
        id: "resources",
        icon: "bi-journal-text",
        title: "Learning Resources",
        text: (
          <>
            Guides, templates and recordings <br />
            you can use anytime.
          </>
        )
      },
      {
        id: "events",
        icon: "bi-calendar2-event",
        title: "Priority Events",
        text: (
          <>
            Invitation priority to advanced <br /> 
            workshops and partner events.
          </>
        )
      }
    ];


  // Duplicate offers so the marquee loops seamlessly
  const duplicatedOffers = [...offers, ...offers];

  // animation duration in seconds (longer if more items)
  const animationDuration = Math.max(12, offers.length * 4);

  // roles to display in the Roles & Skills bar (icon + title)
  const rolesBar = [
    { icon: "bi-person-lines-fill", title: "Health Education" },
    { icon: "bi-bar-chart", title: "Research & Data" },
    { icon: "bi-calendar-event", title: "Event Planning" },
    { icon: "bi-megaphone", title: "Social Media" },
    { icon: "bi-brush", title: "Design" },
    { icon: "bi-truck", title: "Logistics" },
    { icon: "bi-laptop", title: "IT" },
    { icon: "bi-people", title: "PR & Outreach" }
  ];

  return (
    <>
      {/* Page header */}
      <section id="volunteer-hero" className="section light-background">
        <div className="container section-title">
          <h2>Volunteer with PreviCare</h2>
          <p className="small-muted">
            Help us reach underserved communities — training, recognition, and professional development included.
          </p>
          <p className="small-muted">Practical support and perks for active volunteers</p>
        </div>

        {/* NEW: Offers ribbon — visually distinct, auto-scrolling marquee (no slider controls) */}
        <div className="container">
          <div className="offers-ribbon-wrap">
            <div className="offers-ribbon" role="list" aria-label="Volunteer offers ribbon">
              <div
                className="offers-ribbon-track"
                role="presentation"
                // dynamic duration keeps speed consistent if number of items changes
                style={{ animationDuration: `${animationDuration}s` }}
                aria-hidden="false"
              >
                {duplicatedOffers.map((o, i) => (
                  <div key={`${o.id}-${i}`} className="offer-pill" role="listitem" title={o.title}>
                    <div className="offer-pill-icon" aria-hidden="true">
                      <i className={`bi ${o.icon}`}></i>
                    </div>
                    <div className="offer-pill-body">
                      <div className="offer-pill-title">{o.title}</div>
                      <div className="offer-pill-text small-muted">{o.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ribbon hint (small gradient band) */}
            <div className="offers-ribbon-hint" aria-hidden="true" />
          </div>
        </div>

      </section>

      {/* WHY: explanation + centered video */}
      <section id="why-volunteer" className="section">
        <div className="container">
          <div className="section-title">
            <h3>Why volunteer?</h3>
            <p className="small-muted">
              Volunteers facilitate workshops, create content, manage social media, run screenings and support logistics.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-md-8 text-center">
              <div className="video-wrapper" style={{ display: "flex", justifyContent: "center" }}>
                <video
                  controls
                  className="vertical-video"
                  src={`${process.env.PUBLIC_URL}/assets/videos/volunteer.mp4`}
                  style={{ width: 300, maxWidth: "100%", borderRadius: 8 }}
                  aria-label="PreviCare volunteer introduction video"
                />
              </div>

              <h5 className="mt-4">Roles & Skills</h5>
              <p>
                Volunteers help across many areas. Below are common roles we recruit for:
              </p>

              {/* Roles & Skills rendered as an icon+title bar */}
              <div className="roles-bar d-flex flex-wrap justify-content-center gap-3" role="list" aria-label="Volunteer roles">
                {rolesBar.map((r, idx) => (
                  <div key={idx} className="roles-bar-item text-center" role="listitem" style={{ minWidth: 120 }}>
                    <i className={`bi ${r.icon}`} style={{ fontSize: "1.5rem", color: "var(--pc-turquoise)" }} aria-hidden="true"></i>
                    <div style={{ marginTop: 6, fontSize: ".95rem", color: "var(--pc-dark)" }}>{r.title}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION: full-width stacked section with the form */}
      <section id="apply-volunteer" className="section">
        <div className="container">
          <div className="section-title">
            <h3>Apply to volunteer</h3>
            <p className="small-muted">Complete the form below and we'll be in touch about next steps.</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="php-email-form">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input type="text" name="name" className="form-control" placeholder="Your Name" required value={form.name} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input type="email" name="email" className="form-control" placeholder="Your Email" required value={form.email} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 form-group mt-3">
                      <input type="tel" name="phone" className="form-control" placeholder="Phone" required value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="col-md-6 form-group mt-3">
                      <input type="text" name="education" className="form-control" placeholder="Current educational state" value={form.education} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <input type="text" name="major" className="form-control" placeholder="Major" value={form.major} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <input type="text" name="institution" className="form-control" placeholder="University / School" value={form.institution} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-group mt-3">
                    <textarea name="motivation" className="form-control" rows="4" placeholder="Why are you applying to volunteer with PreviCare?" value={form.motivation} onChange={handleChange}></textarea>
                  </div>

                  <div className="form-group mt-3">
                    <textarea name="passion" className="form-control" rows="3" placeholder="What are you passionate about in the healthcare field?" value={form.passion} onChange={handleChange}></textarea>
                  </div>

                  <h5 className="mt-3">Team Preference and Eligibility</h5>
                  <div className="row">
                    {teamOptions.map(item => (
                      <div className="col-md-6" key={item}>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="teams" value={item} id={item} onChange={handleChange} checked={form.teams.includes(item)} />
                          <label className="form-check-label" htmlFor={item}>{item}</label>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="form-group mt-3">
                    <textarea name="teamExplanation" className="form-control" rows="3" placeholder="Please explain why you are interested in this/these team(s) (include any relevant experience)" value={form.teamExplanation} onChange={handleChange}></textarea>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-8">
                      <label className="file-note">Upload your CV (optional)</label>
                      <input type="file" className="form-control" accept=".pdf,.doc,.docx" onChange={handleFile} />
                      {cvFileName && <p className="file-note mt-2">Selected: {cvFileName}</p>}
                    </div>
                    <div className="col-md-4">
                      <input type="number" name="hoursPerWeek" min="0" className="form-control" placeholder="Hours/week" value={form.hoursPerWeek} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-group mt-3">
                    <textarea name="additional" className="form-control" rows="3" placeholder="Is there any additional information you would like us to know?" value={form.additional} onChange={handleChange}></textarea>
                  </div>

                  <div className="mt-3 text-center"><button type="submit" className="btn btn-primary">Submit Application</button></div>
                </form>
              ) : (
                <div className="sent-message alert alert-success">Thank you! Your application has been received. We will contact you soon.</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
