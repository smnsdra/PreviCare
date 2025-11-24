import React, { useState } from "react";
import "../styles/perks-section.css";

export default function Promos() {
  const promos = [
    {
      id: 1,
      icon: "bi-award-fill",
      title: "Certificate",
      note: "Earn certificates for trainings",
      colorClass: "promo-color-1",
    },
    {
      id: 2,
      icon: "bi-journal-medical",
      title: "Free Training",
      note: "Access subject workshops",
      colorClass: "promo-color-2",
    },
    {
      id: 3,
      icon: "bi-people-fill",
      title: "Mentorship",
      note: "Priority mentorship slots",
      colorClass: "promo-color-3",
    },
    {
      id: 4,
      icon: "bi-heart-pulse",
      title: "Priority Events",
      note: "Early event registration",
      colorClass: "promo-color-4",
    },
  ];

  const [flipped, setFlipped] = useState(new Set());

  function toggleFlip(id) {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function onKey(e, id) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip(id);
    }
  }

  return (
    <div className="perks-root promos-with-heading" aria-label="Perks and promotions">
      <div className="perks-inner">
        <div className="promo-grid" role="list" aria-label="Perks list">
          {promos.map((p) => {
            const isFlipped = flipped.has(p.id);
            return (
              <button
                key={p.id}
                type="button"
                role="listitem"
                aria-pressed={isFlipped}
                className={`promo-item ${p.colorClass} ${isFlipped ? "is-flipped" : ""}`}
                onClick={() => toggleFlip(p.id)}
                onKeyDown={(e) => onKey(e, p.id)}
                title={p.title}
              >
                <div className="promo-inner" aria-hidden="false">
                  <div className="promo-face front">
                    <div className="promo-front-wrap">
                      <i className={`bi ${p.icon} promo-icon`} aria-hidden="true" />
                      <div className="promo-title">{p.title.toUpperCase()}</div>
                    </div>
                  </div>

                  <div className="promo-face back">
                    <div className="promo-back-content">
                      <strong>{p.title}</strong>
                      <div className="promo-back-note">{p.note}</div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
