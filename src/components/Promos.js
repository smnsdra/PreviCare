import React from "react";
import "../styles/perks-section.css"; // keep CSS imported here if needed by the component

export default function Promos() {
  const promos = [
    {
      id: 1,
      icon: "bi-award-fill",
      title: "Volunteer Certificate",
      text: "Receive an official certificate after verified volunteer hours."
    },
    {
      id: 2,
      icon: "bi-person-lines-fill",
      title: "Mentorship",
      text: "Pair with mentors who guide your growth and learning."
    },
    {
      id: 3,
      icon: "bi-mortarboard-fill",
      title: "Training",
      text: "Role-specific workshops to build practical skills."
    },
    {
      id: 4,
      icon: "bi-people",
      title: "Networking",
      text: "Grow professional connections & access references."
    },
    {
      id: 5,
      icon: "bi-journal-text",
      title: "Resources",
      text: "Guides, templates and recordings available anytime."
    },
    {
      id: 6,
      icon: "bi-calendar2-event",
      title: "Priority Events",
      text: "Priority invitations to advanced workshops and partner events."
    }
  ];

  return (
    <div className="promos-container">
      <h5 className="promos-title">Perks for Volunteers</h5>
      <div className="promos-grid">
        {promos.map(p => (
          <div key={p.id} className="promo-item">
            <div className="promo-icon" aria-hidden="true"><i className={`bi ${p.icon}`} /></div>
            <div className="promo-body">
              <div className="promo-title">{p.title}</div>
              <div className="promo-text small-muted">{p.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
