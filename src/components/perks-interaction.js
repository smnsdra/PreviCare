import React, { useState } from "react";
<link href="%PUBLIC_URL%/styles/perks-section.css" rel="stylesheet">


/**
 * PerksSection
 * - Self-contained React component that centers the section and makes the
 *   circular items flip on click / Enter or Space.
 * - Import and render inside a full-width column (e.g. <div className="col-12"><PerksSection/></div>)
 *
 * Note: this component imports the CSS file next to it (perks-section.css).
 * Make sure the file is placed at src/components/perks-section.css
 */
export default function PerksSection() {
  const promos = [
    { id: 1, icon: "bi-award-fill", title: "Certificate", note: "Earn certificates for trainings", colorClass: "promo-color-1" },
    { id: 2, icon: "bi-journal-medical", title: "Free Training", note: "Access subject workshops", colorClass: "promo-color-2" },
    { id: 3, icon: "bi-people-fill", title: "Mentorship", note: "Priority mentorship slots", colorClass: "promo-color-3" },
    { id: 4, icon: "bi-heart-pulse", title: "Priority Events", note: "Early event registration", colorClass: "promo-color-4" }
  ];

  const [flipped, setFlipped] = useState(new Set());

  function toggleFlip(id) {
    setFlipped(prev => {
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
    <section className="perks-section" aria-labelledby="perks-title">
      <div className="perks-inner">
        <h2 id="perks-title">Perks &amp; Promotions</h2>
        <p className="perks-sub">Benefits for volunteers and participants</p>

        <div className="perks-explain">
          <h5>Why we offer perks</h5>
          <p className="small-muted">
            Perks such as certificates, free training and workshops help sustain volunteer engagement, improve skills and
            ensure quality outreach. These incentives support retention and continuous improvement.
          </p>
        </div>

        <div className="promo-grid" role="list" aria-label="Perks list">
          {promos.map(p => {
            const isFlipped = flipped.has(p.id);
            return (
              <button
                key={p.id}
                type="button"
                role="listitem"
                aria-pressed={isFlipped}
                className={`promo-item ${p.colorClass} ${isFlipped ? "is-flipped" : ""}`}
                onClick={() => toggleFlip(p.id)}
                onKeyDown={e => onKey(e, p.id)}
                title={p.title}
              >
                <div className="promo-inner" aria-hidden={false}>
                  <div className="promo-face front" aria-hidden={isFlipped}>
                    <div className="promo-front-wrap">
                      <i className={`bi ${p.icon} promo-icon`} aria-hidden="true" />
                      <div className="promo-title">{p.title.toUpperCase()}</div>
                      <div className="promo-subtext"> {/* small subtitle inside circle if desired */}
                        <strong className="promo-strong">{p.title}</strong>
                        <div className="promo-desc">{p.note}</div>
                      </div>
                    </div>
                  </div>

                  <div className="promo-face back" aria-hidden={!isFlipped}>
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
    </section>
  );
}
