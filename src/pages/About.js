import React from "react";
import Gallery from "../components/Gallery1";


const workshopImages = [
{ src: `${process.env.PUBLIC_URL}/assets/img/gallery/workshop-1.jpg`, caption: "Community Screening — Beirut" }
{ src: `${process.env.PUBLIC_URL}/assets/img/gallery/workshop-2.jpg`, caption: "Vaccination Awareness Session" }
{ src: `${process.env.PUBLIC_URL}/assets/img/gallery/workshop-3.jpg`, caption: "School Health Workshop" }
{ src: `${process.env.PUBLIC_URL}/assets/img/gallery/workshop-4.jpg`, caption: "Nutrition & Wellness" }
{ src: `${process.env.PUBLIC_URL}/assets/img/gallery/workshop-5.jpg`, caption: "Mental Health Meetup" }
{ src: `${process.env.PUBLIC_URL}/assets/img/gallery/workshop-6.jpg`, caption: "Volunteer Training Day" }
];


export default function About() {
  const programs = [
    {
      icon: "bi-journal-medical",
      title: "Educational Content",
      text: "Evidence-based guides, short videos and quick actionable tips for families and communities."
    },
    {
      icon: "bi-megaphone-fill",
      title: "Workshops & Events",
      text: "Interactive sessions, school programs and community screenings run with local partners."
    },
    {
      icon: "bi-people-fill",
      title: "Volunteer Network",
      text: "Train, recognize and support volunteers who deliver outreach at scale."
    },
    {
      icon: "bi-heart-pulse",
      title: "Community Screening",
      text: "On-site risk checks and referral pathways to connect people with care early."
    },
    {
      icon: "bi-phone-fill",
      title: "Tele-Consultation",
      text: "Remote guidance from preventive-medicine specialists for early decision-making."
    },
    {
      icon: "bi-bar-chart-line",
      title: "Research & Data",
      text: "Collect local insights and measure program impact to improve services."
    }
  ];

  const goals = [
    {
      icon: "bi-bullseye",
      title: "Raise Awareness",
      text: "Increase community knowledge about prevention and early detection through campaigns and media."
    },
    {
      icon: "bi-people",
      title: "Build Volunteer Capacity",
      text: "Recruit, train and retain volunteers with certificates, mentorship and practical experience."
    },
    {
      icon: "bi-cash-stack",
      title: "Sustainable Funding",
      text: "Develop fundraising streams and partnerships to scale programs responsibly."
    },
    {
      icon: "bi-book",
      title: "Educate & Empower",
      text: "Deliver clear, actionable health education for all ages and literacy levels."
    },
    {
      icon: "bi-hand-thumbs-up",
      title: "Community Partnerships",
      text: "Work with schools, clinics and NGOs to strengthen local prevention networks."
    },
    {
      icon: "bi-bar-chart",
      title: "Measure Impact",
      text: "Collect data to refine programs, show outcomes and inform stakeholders."
    }
  ];

  // team roles (icons + titles) shown in a horizontal bar below the intro row (under both description and photo)
  const teamRoles = [
    { icon: "bi-brush", title: "Graphic Designer(s)" },
    { icon: "bi-stars", title: "Brand Strategist" },
    { icon: "bi-code-slash", title: "Web Designer/Developer" },
    { icon: "bi-phone", title: "UI/UX Designer" },
    { icon: "bi-file-earmark-text", title: "Content Creator" },
    { icon: "bi-megaphone", title: "Social Media Manager" },
    { icon: "bi-kanban", title: "Project Manager" }
  ];

  return (
    <>
      {/* ABOUT: intro overview with photo on the right */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>About PreviCare</h2>
            <p className="small-muted"> Empowering communities with prevention, education and early care</p>
          </div>

          <div className="row gy-4 align-items-start">
            <div className="col-lg-8">
              <p style={{ fontSize: "1.1rem", width: "90%",  lineHeight: "1.6", marginTop: "3rem" }}>
                PreviCare is a health awareness organization focused on prevention and community empowerment.
                We run workshops, educational campaigns, volunteer training, and community screenings to reduce late-stage diagnoses
                and improve health outcomes. Our approach combines evidence-based content, community partnerships, and a volunteer-driven model.
              </p>
            </div>

            {/* RIGHT: single photo (kept) */}
            <div className="col-lg-4">
              <div className="team-photo-wrapper">
                <img src={`${process.env.PUBLIC_URL}/assets/img//about/team-photo.jpg`} alt="PreviCare team" className="team-photo"  />
              </div>
            </div>
          </div>

          {/* TEAM BAR: icons with titles below both the about description and the image */}
          <div className="team-bar mt-4" role="list" aria-label="Design and delivery team roles">
            {teamRoles.map((r, i) => (
              <div className="team-bar-item" role="listitem" key={i} title={r.title} aria-label={r.title}>
                <i className={`bi ${r.icon} team-bar-icon`} aria-hidden="true"></i>
                <div className="team-bar-title">{r.title}</div>
              </div>
            ))}
          </div>
        <p style={{ fontSize: "1rem", width: "90%",  lineHeight: "1.6", marginTop: "2.5rem" , marginLeft: "3rem", textAlign: "center" }}>
                To effectively support our mission we bring together a small multidisciplinary design and delivery team (graphic designers,
                content creators, web & UX specialists, and project managers) working with a wider network of trained volunteers and local partners.
                The team's outputs include brand identity, outreach materials, digital platforms, workshops, training courses and evaluation reports.
        </p>
        </div>
      </section>

      {/* Activities gallery (automatic carousel) */}
      <section className="section about-gallery-section">
        <div className="container">
          <div className="section-title">
            <h2>Activities & Events</h2>
            <p className="small-muted">A visual tour of PreviCare in action — workshops, screenings and volunteer training.</p>
          </div>

          <div className="mt-3">
            <Gallery images={activityImages} autoplay />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section light-background">
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-md-6">
              <div className="card about-card p-4">
                <div className="card-icon"><i className="bi bi-bullseye"></i></div>
                <h3>Our Mission</h3>
                <p>
                  To prevent disease and promote wellness by educating communities, empowering volunteers, and connecting people to early care.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card about-card p-4">
                <div className="card-icon"><i className="bi bi-eye"></i></div>
                <h3>Our Vision</h3>
                <p>
                  A world where prevention is the norm, communities are informed and supported, and early action reduces disease burden for all.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Programs / Core services displayed as icon cards */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>What We Do</h2>
            <p className="small-muted">Programs and services we deliver to build healthier communities.</p>
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
        </div>
      </section>

      {/* Impact / Stats & Team cards */}
      <section className="section light-background">
        <div className="container">
          <div className="section-title">
            <h2>Impact & Team</h2>
            <p className="small-muted">Numbers, stories and the people behind PreviCare.</p>
          </div>

          <div className="row gy-4">
            <div className="col-md-4">
              <div className="about-card stat-card p-4">
                <div className="card-icon"><i className="bi bi-people-fill"></i></div>
                <h4>Volunteers</h4>
                <p className="small-muted">Hundreds trained and active in community outreach and events.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="about-card stat-card p-4">
                <div className="card-icon"><i className="bi bi-activity"></i></div>
                <h4>Events</h4>
                <p className="small-muted">Regular workshops and screenings in schools, workplaces, and public spaces.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="about-card stat-card p-4">
                <div className="card-icon"><i className="bi bi-bar-chart-line"></i></div>
                <h4>Local Insights</h4>
                <p className="small-muted">Evidence collected to guide programs and measure outcomes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
