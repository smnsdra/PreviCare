import React, { useState } from "react";
import Gallery from "../components/Gallery";

const activityImages = [
  { src: "/assets/img/gallery/workshop-1.jpg", caption: "Community Health Screening — Beirut" },
  { src: "/assets/img/gallery/workshop-2.jpg", caption: "Vaccination Awareness Workshop — Tripoli" },
  { src: "/assets/img/gallery/workshop-3.jpg", caption: "School Health Education Program — Sidon" },
  { src: "/assets/img/gallery/workshop-4.jpg", caption: "Nutrition & Wellness Workshop — Byblos" },
  { src: "/assets/img/gallery/workshop-5.jpg", caption: "Mental Health Meetup — Beirut" },
  { src: "/assets/img/gallery/workshop-6.jpg", caption: "Volunteer Training Day — Beirut HQ" }
];

const teamOptions = ["Education", "Screenings", "Events", "Data & Research"];

export default function Services() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", education: "", major: "",
    institution: "", motivation: "", passion: "", teams: [], teamExplanation: "",
    hoursPerWeek: "", additional: ""
  });
  const [cvFileName, setCvFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm({
        ...form,
        teams: checked ? [...form.teams, value] : form.teams.filter(t => t !== value)
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFile = (e) => {
    if (e.target.files.length > 0) setCvFileName(e.target.files[0].name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* ====================== SERVICES ====================== */}
      <section id="services" className="services section">
        <div className="container section-title">
          <h2>Our Services & Features</h2>
          <p>
            PreviCare empowers communities in Lebanon through preventive healthcare programs, 
            tele-consultations, workshops, and volunteer-led initiatives for early disease detection 
            and improved public health outcomes.
          </p>
        </div>

        <div className="container">
          <div className="row gy-4">

            {/* Preventive Education */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up">
              <div className="service-item position-relative" style={{ cursor: "pointer" }} onClick={() => scrollToSection("education-section")}>
                <div className="icon"><i className="fas fa-book-medical"></i></div>
                <h3>Preventive Education</h3>
                <p>
                  Health awareness programs for schools, youth centers, and elderly homes on nutrition, hygiene, and lifestyle habits.  
                  Includes interactive lessons, practical demonstrations, and take-home guides for families.
                </p>
              </div>
            </div>

            {/* Tele-Consultations */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up">
              <div className="service-item position-relative" style={{ cursor: "pointer" }} onClick={() => scrollToSection("teleconsult-section")}>
                <div className="icon"><i className="fas fa-stethoscope"></i></div>
                <h3>Tele-Consultations</h3>
                <p>
                  Remote consultations with preventive medicine specialists.  
                  Personalized health advice, early symptom detection, and follow-up monitoring.  
                  Ensures access for remote areas without local clinics.
                </p>
              </div>
            </div>

            {/* Community Workshops */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up">
              <div className="service-item position-relative" style={{ cursor: "pointer" }} onClick={() => scrollToSection("workshops-section")}>
                <div className="icon"><i className="fas fa-hands-helping"></i></div>
                <h3>Community Workshops</h3>
                <p>
                  Hands-on workshops covering vaccination, nutrition, and mental health.  
                  Interactive activities for families, children, and teens.  
                  Workshop sessions are customized for each community's needs.
                </p>
              </div>
            </div>

            {/* Volunteer Support */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up">
              <div className="service-item position-relative" style={{ cursor: "pointer" }} onClick={() => scrollToSection("apply-volunteer")}>
                <div className="icon"><i className="fas fa-users"></i></div>
                <h3>Volunteer Support</h3>
                <p>
                  Volunteer-led outreach, event organization, and follow-up programs for community continuity.  
                  Provides mentorship and training for new volunteers to actively participate in health programs.
                </p>
              </div>
            </div>

            {/* Vaccine Info & Updates */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up">
              <div className="service-item position-relative" style={{ cursor: "pointer" }} onClick={() => scrollToSection("vaccine-section")}>
                <div className="icon"><i className="fas fa-syringe"></i></div>
                <h3>Vaccine Info & Updates</h3>
                <p>
                  Latest guidance on vaccines for all age groups.  
                  Information includes schedules, availability, and local community campaigns for immunization.
                </p>
              </div>
            </div>

            {/* Research & Data */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up">
              <div className="service-item position-relative" style={{ cursor: "pointer" }} onClick={() => scrollToSection("research-section")}>
                <div className="icon"><i className="fas fa-chart-line"></i></div>
                <h3>Research & Data</h3>
                <p>
                  Curated hub of research articles, reports, and statistics supporting preventive strategies.  
                  Volunteers and staff analyze data to design evidence-based programs.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
