import React, { useState } from "react";

/**
 * Gallery: grid of images; click to open modal preview
 * props.images = [{ src, caption }]
 */
export default function Gallery({ images = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  function open(i) { setOpenIndex(i); document.body.style.overflow = "hidden"; }
  function close() { setOpenIndex(null); document.body.style.overflow = ""; }

  return (
    <>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <div className="gallery-item" key={i} onClick={() => open(i)}>
            <img src={img.src} alt={img.caption || `img-${i}`} />
            <div className="gallery-caption">{img.caption}</div>
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
              <button className="btn btn-sm btn-outline-primary" onClick={() => setOpenIndex((openIndex-1+images.length)%images.length)}>Prev</button>
              <button className="btn btn-sm btn-outline-primary" onClick={() => setOpenIndex((openIndex+1)%images.length)}>Next</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}