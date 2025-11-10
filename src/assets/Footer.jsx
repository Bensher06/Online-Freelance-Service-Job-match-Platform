import React from "react";

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0F172A",
        padding: "30px 20px",
        color: "white",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: 20,
        }}
      >

        <div style={{ minWidth: 200 }}>
          <h2 style={{ marginBottom: 8, fontSize: 22 }}>
            <img src="2.png" alt="img" style={{height: 30}}/>
          </h2>
          <p style={{ color: "#cbd5e1", fontSize: 14 }}>
            Your local job finder for real opportunities near you.
          </p>
        </div>

        <div style={{ minWidth: 150 }}>
          <h4 style={{ marginBottom: 10, fontSize: 16 }}>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
            <li><a href="/jobs" style={{ color: "#cbd5e1", textDecoration: "none" }}>Find Jobs</a></li>
            <li><a href="/companies" style={{ color: "#cbd5e1", textDecoration: "none" }}>Companies</a></li>
            <li><a href="/about" style={{ color: "#cbd5e1", textDecoration: "none" }}>About Us</a></li>
            <li><a href="/contact" style={{ color: "#cbd5e1", textDecoration: "none" }}>Contact</a></li>
          </ul>
        </div>

        <div style={{ minWidth: 150 }}>
          <h4 style={{ marginBottom: 10, fontSize: 16 }}>Support</h4>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
            <li><a href="/faq" style={{ color: "#cbd5e1", textDecoration: "none" }}>FAQ</a></li>
            <li><a href="/policy" style={{ color: "#cbd5e1", textDecoration: "none" }}>Privacy Policy</a></li>
            <li><a href="/terms" style={{ color: "#cbd5e1", textDecoration: "none" }}>Terms of Use</a></li>
          </ul>
        </div>
      </div>

      <p
        style={{
          textAlign: "center",
          marginTop: 30,
          fontSize: 13,
          color: "#94a3b8",
        }}
      >
        © {new Date().getFullYear()} Job+. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;