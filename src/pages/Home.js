import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Promos from "../components/Promos";
import Gallery from "../components/Gallery";
import "../styles/perks-section.css"; // Ensure styles for flipping circles are loaded
// Dynamically load the small interaction helper only in the browser
// (prevents issues when rendering on the server)
function usePerksInteraction() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    import("../components/perks-interaction.js").catch(() => {
      // silent failure - optional helper not critical
    });
  }, []);
}

const workshopImages = [
  { src: "/assets/img/gallery/workshop-1.jpg", caption: "Community Screening — Beirut" },
  { src: "/assets/img/gallery/workshop-2.jpg", caption: "Vaccination Awareness Session" },
  { src: "/assets/img/gallery/workshop-3.jpg", caption: "School Health Workshop" },
  { src: "/assets/img/gallery/workshop-4.jpg", caption: "Nutrition & Wellness" },
  { src: "/assets/img/gallery/workshop-5.jpg", caption: "Mental Health Meetup" },
  { src: "/assets/img/gallery/workshop-6.jpg", caption: "Volunteer Training Day" }
];

export default function Home() {
  usePerksInteraction();

  const petItems = [
    { icon: "bi-shield-check", text: "Prevent" },
    { icon: "bi-book", text: "Educate" },
    { icon: "bi-heart-pulse-fill", text: "Thrive" }
  ];

  return (
    <>
      {/* Hero */}
      <section id="hero" className="hero section light-background" aria-label="Hero">
        <img
          src="/assets/img/hero-bg.jpg"
          alt="PreviCare hero background"
          data-aos="fade-in"
          style={{ width: "100%", objectFit: "cover" }}
        />
        <div className="container position-relative">
          <div className="welcome position-relative text-center" data-aos="fade-down" data-aos-delay="100">
            <h2 className="text-center">Welcome to PreviCare</h2>
            <p className="mb-1" style={{ fontWeight: 600 }}>
              Step into <strong>PreviCare's</strong> world
            </p>

            <div className="d-flex justify-content-center gap-4 mt-3" aria-hidden={false}>
              {petItems.map((p, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <i className={`bi ${p.icon}`} style={{ fontSize: 28, color: "var(--pc-turquoise)" }} aria-hidden="true" />
                  <div
                    style={{
                      fontWeight: 700,
                      marginTop: 6,
                      textTransform: "uppercase",
                      fontSize: 12,
                      color: "var(--pc-dark)"
                    }}
                  >
                    {p.text}
                  </div>
                </div>
              ))}
            </div>

            <p className="small-muted mt-3 text-center">
              Empowering communities with preventive healthcare and accessible resources.
            </p>
            <div className="small-muted mt-1 text-center">PreviCare | Health Awareness</div>
          </div>
        </div>
      </section>

      {/* Intro with video and right column */}
      <section className="section" aria-label="Intro">
        <div className="container">
          <div className="row align-items-stretch justify-content-center">
            <div className="col-12 col-md-10">
              <div className="row gy-4 align-items-stretch">
                <div className="col-12 col-md-4 centered d-flex flex-column align-items-center">
                  <h3 className="text-center">PreviCare's WORLD</h3>
                  <p className="small-muted text-center">Our trusted partner in health!</p>

                  <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
                    <video
                      controls
                      className="vertical-video"
                      src="/assets/videos/intro.mp4"
                      style={{
                        width: 300,
                        maxWidth: "100%",
                        aspectRatio: "9 / 16",
                        objectFit: "cover",
                        borderRadius: 8
                      }}
                      aria-label="PreviCare introduction video"
                    />
                  </div>
                </div>

                <div className="col-12 col-md-8 d-flex">
                  <div className="right-column d-flex flex-column" style={{ width: "100%" }}>
                    <div>
                      <h4>About this video</h4>
                      <p
                        style={{
                          textTransform: "lowercase",
                          fontWeight: 400,
                          color: "var(--pc-dark)",
                          fontSize: "1rem",
                          lineHeight: 1.45,
                          marginBottom: 0
                        }}
                      >
                        This short introduction explains PreviCare's mission to raise preventive health awareness across communities.
                        We highlight workshops, volunteer stories, and the tools we use to detect and prevent disease early.
                      </p>
                    </div>

                    <div className="fill-cards d-flex flex-column gap-3 mt-3" style={{ flex: 1 }}>
                      <div className="fill-card d-flex align-items-start p-3">
                        <div style={{ marginRight: 12 }}>
                          <i className="bi bi-calendar2-event fs-3" style={{ color: "var(--pc-turquoise)" }} aria-hidden="true" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h5 style={{ marginBottom: 6 }}>Upcoming Workshops</h5>
                          <p className="small-muted" style={{ marginBottom: 8 }}>
                            Community screenings, school health sessions, and vaccination awareness events—see schedule and register.
                          </p>
                          <div>
                            <Link to="/services" className="btn btn-sm btn-outline-primary me-2">See Events</Link>
                            <Link to="/contact" className="btn btn-sm btn-primary">Invite Us</Link>
                          </div>
                        </div>
                      </div>

                      <div className="fill-card d-flex align-items-start p-3">
                        <div style={{ marginRight: 12 }}>
                          <i className="bi bi-award fs-3" style={{ color: "var(--pc-green)" }} aria-hidden="true" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h5 style={{ marginBottom: 6 }}>Volunteer Benefits</h5>
                          <p className="small-muted" style={{ marginBottom: 8 }}>
                            Earn certificates, free training, mentorship, and priority access to advanced workshops.
                          </p>
                          <div>
                            <Link to="/volunteer" className="btn btn-sm btn-primary me-2">Apply Now</Link>
                            <Link to="/about" className="btn btn-sm btn-outline-primary">Learn More</Link>
                          </div>
                        </div>
                      </div>

                      <div className="fill-card d-flex align-items-start p-3">
                        <div style={{ marginRight: 12 }}>
                          <i className="bi bi-bar-chart-line fs-3" style={{ color: "var(--pc-lightblue)" }} aria-hidden="true" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h5 style={{ marginBottom: 6 }}>HealthTrack Snapshot</h5>
                          <p className="small-muted" style={{ marginBottom: 8 }}>
                            Quick personal metrics: log weight, steps, water and export your data. Stored locally for privacy.
                          </p>
                          <div>
                            <Link to="/healthtrack" className="btn btn-sm btn-primary me-2">Open HealthTrack</Link>
                            <Link to="/healthtrack" className="btn btn-sm btn-outline-primary">View Stats</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end fill cards */}
                  </div>
                </div>
                {/* end right column */}
              </div>

              {/* Info-pill bar */}
              <div className="mt-4 d-flex justify-content-center">
                <div className="d-flex gap-3 flex-wrap mt-2 justify-content-center" style={{ width: "100%", maxWidth: 980 }}>
                  {[
                    { icon: "bi-award-fill", text: "AWARENESS WORKSHOPS" },
                    { icon: "bi-book-half", text: "GENERAL HEALTH TIPS" },
                    { icon: "bi-heart-pulse-fill", text: "GROWTH & WELLNESS" },
                    { icon: "bi-people-fill", text: "SUPPORT & TRUST" }
                  ].map((p, i) => (
                    <div
                      key={i}
                      className="info-pill"
                      style={{
                        textTransform: "uppercase",
                        fontWeight: 700,
                        padding: "10px 14px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        justifyContent: "center"
                      }}
                      aria-label={p.text}
                    >
                      <i className={`bi ${p.icon}`} style={{ fontSize: 18 }} aria-hidden="true" />
                      <span>{p.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 centered text-center">
                <Link to="/services" className="btn btn-primary me-2">Explore Services</Link>
                <Link to="/volunteer" className="btn btn-outline-primary">Volunteer</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why PreviCare */}
      <section id="why" className="section" aria-label="Why PreviCare">
        <div className="container">
          <div className="section-title">
            <h2>Why PreviCare?</h2>
            <p className="small-muted">We focus on shifting care from reactive to proactive across communities.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="icon-box small h-100 d-flex flex-column justify-content-start">
                <i className="bi bi-book-fill" style={{ fontSize: 28, marginRight: 10 }} aria-hidden="true" />
                <h5>Increase Health Literacy</h5>
                <p>Deliver age-appropriate, evidence-based educational content to empower decisions.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="icon-box small h-100 d-flex flex-column justify-content-start">
                <i className="bi bi-activity" style={{ fontSize: 28, marginRight: 10 }} aria-hidden="true" />
                <h5>Early Risk Detection</h5>
                <p>Run screenings and risk assessments to detect warning signs early and refer them promptly.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="icon-box small h-100 d-flex flex-column justify-content-start">
                <i className="bi bi-currency-dollar" style={{ fontSize: 28, marginRight: 10 }} aria-hidden="true" />
                <h5>Lower Healthcare Costs</h5>
                <p>Preventive measures reduce the long-term economic burden of chronic disease treatment.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="icon-box small h-100 d-flex flex-column justify-content-start">
                <i className="bi bi-people" style={{ fontSize: 28, marginRight: 10 }} aria-hidden="true" />
                <h5>Volunteer Capacity Building</h5>
                <p>Train and recognize volunteers to sustain outreach and create local impact.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section id="core-services" className="section light-background" aria-label="Core Services">
        <div className="container">
          <div className="section-title">
            <h2>Core Services</h2>
            <p className="small-muted">What we offer to communities and partners</p>
          </div>

          <div className="d-flex flex-row flex-wrap justify-content-between gap-3 services-bar">
            <div className="service-pill centered p-3" style={{ minWidth: 170 }}>
              <i className="bi bi-journal-medical fs-2" style={{ color: "var(--pc-turquoise)" }} aria-hidden="true" />
              <h6 className="mt-2">Educational Content</h6>
              <small className="small-muted">Guides, vaccine updates and quick tips.</small>
            </div>

            <div className="service-pill centered p-3" style={{ minWidth: 170 }}>
              <i className="bi bi-megaphone-fill fs-2" style={{ color: "var(--pc-green)" }} aria-hidden="true" />
              <h6 className="mt-2">Workshops & Events</h6>
              <small className="small-muted">Interactive community sessions and screenings.</small>
            </div>

            <div className="service-pill centered p-3" style={{ minWidth: 170 }}>
              <i className="bi bi-people-fill fs-2" style={{ color: "var(--pc-lightblue)" }} aria-hidden="true" />
              <h6 className="mt-2">Volunteer Network</h6>
              <small className="small-muted">Training, certificates & mentorship.</small>
            </div>

            <div className="service-pill centered p-3" style={{ minWidth: 170 }}>
              <i className="bi bi-phone-fill fs-2" style={{ color: "var(--pc-salmon)" }} aria-hidden="true" />
              <h6 className="mt-2">Tele-Consultation</h6>
              <small className="small-muted">Access to preventive medicine specialists.</small>
            </div>

            <div className="service-pill centered p-3" style={{ minWidth: 170 }}>
              <i className="bi bi-heart-pulse fs-2" style={{ color: "var(--pc-turquoise)" }} aria-hidden="true" />
              <h6 className="mt-2">Community Screening</h6>
              <small className="small-muted">On-site screenings and referral pathways.</small>
            </div>

            <div className="service-pill centered p-3" style={{ minWidth: 170 }}>
              <i className="bi bi-bar-chart-line fs-2" style={{ color: "var(--pc-green)" }} aria-hidden="true" />
              <h6 className="mt-2">Research & Data</h6>
              <small className="small-muted">Evidence collection and local health insights.</small>
            </div>
          </div>
        </div>
      </section>

      {/* Perks & Promotions */}
        <section id="perks" className="section" aria-label="Perks and Promotions">
        <div className="container">
          <div className="section-title">
            <h2>Perks & Promotions</h2>
            <p className="small-muted">Benefits for volunteers and participants</p>
          </div>

          <div className="row align-items-start">
            <div className="col-lg-6">
              {/* Promos includes the heading above the circles */}
              <Promos />
            </div>

            <div className="">
              {/* Keep any complementary content here (CTA, testimonials). Do NOT duplicate the "Why we offer" copy here. */}
            </div>
          </div>
        </div>
      </section>

      {/* Workshop gallery */}
      <section className="section" aria-label="Workshop gallery">
        <div className="container">
          <div className="section-title">
            <h2>Workshop Gallery</h2>
            <p className="small-muted">Snapshots from our recent events — click to view.</p>
          </div>
          <Gallery images={workshopImages} />
        </div>
      </section>

      {/* CTA */}
      <section className="section light-background" aria-label="Call to action">
        <div className="container centered">
          <h4>Join Us</h4>
          <p>Become a volunteer, attend a workshop, or invite PreviCare to your institution.</p>
          <Link to="/volunteer" className="btn btn-primary me-2">Apply to Volunteer</Link>
          <Link to="/healthtrack" className="btn btn-outline-primary">Try HealthTrack</Link>
        </div>
      </section>
    </>
  );
}
