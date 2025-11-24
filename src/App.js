import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Volunteer from "./pages/Volunteer";
import Contact from "./pages/Contact";
import HealthTrack from "./pages/HealthTrack";
import { LoginPage, RegisterPage } from "./pages/LoginRegister"; // <-- Add RegisterPage if you want

function App() {
  return (
    <Router>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/healthtrack" element={<HealthTrack />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />           {/* <-- Add this! */}
          <Route path="/register" element={<RegisterPage />} />     {/* <-- Optional: registration */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;