import React from "react";

export default function Footer() {
  return (
    <footer id="footer" className="footer light-background">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6 footer-about">
            <a href="/" className="logo d-flex align-items-center">
              <span className="sitename">PreviCare</span>
            </a>
            <div className="footer-contact pt-3">
              <p>A108 Adam Street</p>
              <p>Beirut, Lebanon</p>
              <p className="mt-3"><strong>Phone:</strong> <span>+961 3 370 665</span></p>
              <p><strong>Email:</strong> <span>previcarelb@gmail.com</span></p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href="https://instagram.com/PREVICARE_LB"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="col-lg-6 col-md-6">
            <h4>Our Mission</h4>
            <p>PreviCare works to improve preventive healthcare awareness and reduce the burden of preventable diseases through education, community outreach, and accessible digital tools.</p>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>© <strong className="px-1 sitename">PreviCare</strong> All Rights Reserved</p>
        <div className="credits">
          Designed by PreviCare Team
        </div>
      </div>
    </footer>
  );
}