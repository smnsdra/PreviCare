import React, { useState, useRef, useEffect } from "react";

/**
 * Gallery component
 * - Default behavior: grid with modal preview (existing behavior)
 * - If prop `autoplay` is true -> renders a Bootstrap carousel that auto-rotates
 *
 * Props:
 * - images: [{ src, caption }]
 * - autoplay: boolean
 */
export default function Gallery1({ images = [], autoplay = false }) {
  const [openIndex, setOpenIndex] = useState(null);
  const idRef = useRef(`galleryCarousel-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    // No-op: Bootstrap data attributes handle carousel behavior automatically.
    // If you later want JS control, you can initialize the carousel here.
  }, []);

  function open(i) {
    setOpenIndex(i);
    document.body.style.overflow = "hidden";
  }
  function close() {
    setOpenIndex(null);
    document.body.style.overflow = "";
  }

  if (autoplay) {
    const carouselId = idRef.current;
    return (
      <div className="about-gallery-carousel">
        <div id={carouselId} className="carousel slide" data-bs-ride="carousel" data-bs-interval="3500">
          {images.length > 1 && (
            <div className="carousel-indicators">
              {images.map((_, idx) => (
                <button
                  type="button"
                  key={idx}
                  data-bs-target={`#${carouselId}`}
                  data-bs-slide-to={idx}
                  className={idx === 0 ? "active" : ""}
                  aria-current={idx === 0 ? "true" : undefined}
                  aria-label={`Slide ${idx + 1}`}
                ></button>
              ))}
            </div>
          )}

          <div className="carousel-inner">
            {images.map((img, idx) => (
              <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
                <img src={img.src} className="d-block w-100 carousel-image" alt={img.caption || `slide-${idx}`} />
                {img.caption && (
                  <div className="carousel-caption d-none d-md-block">
                    <p>{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <>
              <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Existing grid+modal behavior (unchanged)
  return (
    <>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <div className="gallery-item" key={i} onClick={() => open(i)}>
            <img src={img.src} alt={img.caption || `img-${i}`} />
            {img.caption && <div className="gallery-caption">{img.caption}</div>}
          </div>
        ))}
      </div>

      {openIndex !== null && (
        <div className="gallery-modal" onClick={close} role="dialog" aria-modal="true">
          <div className="gallery-modal-inner" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close btn btn-sm btn-light" onClick={close}><i className="bi bi-x-lg"></i></button>
            <img src={images[openIndex].src} alt={images[openIndex].caption} />
            <div className="modal-caption">{images[openIndex].caption}</div>
            <div className="modal-controls mt-2 d-flex justify-content-between">
              <button className="btn btn-sm btn-outline-primary" onClick={() => setOpenIndex((openIndex - 1 + images.length) % images.length)}>Prev</button>
              <button className="btn btn-sm btn-outline-primary" onClick={() => setOpenIndex((openIndex + 1) % images.length)}>Next</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}