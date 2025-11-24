import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="contact section">
      <div className="container section-title">
        <h2>Contact</h2>
        <p>Questions, partnership requests, or workshop registrations — get in touch.</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4">
            <div className="info-item d-flex">
              <i className="bi bi-geo-alt flex-shrink-0"></i>
              <div>
                <h3>Location</h3>
                <p>Beirut, Lebanon</p>
              </div>
            </div>

            <div className="info-item d-flex">
              <i className="bi bi-telephone flex-shrink-0"></i>
              <div>
                <h3>Call Us</h3>
                <p>+961 3 370 665</p>
              </div>
            </div>

            <div className="info-item d-flex">
              <i className="bi bi-envelope flex-shrink-0"></i>
              <div>
                <h3>Email Us</h3>
                <p>previcarelb@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <form action="#" method="post" className="php-email-form">
              <div className="row gy-4">
                <div className="col-md-6"><input type="text" name="name" className="form-control" placeholder="Your Name" required /></div>
                <div className="col-md-6"><input type="email" name="email" className="form-control" placeholder="Your Email" required /></div>
                <div className="col-md-12"><input type="text" name="subject" className="form-control" placeholder="Subject" required /></div>
                <div className="col-md-12"><textarea name="message" className="form-control" rows="6" placeholder="Message" required></textarea></div>
                <div className="col-md-12 text-center">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">Your message has been sent. Thank you!</div>
                  <button type="submit">Send Message</button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}