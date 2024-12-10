import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4">
      <div className="container">
        <div className="mb-3">
          <a
            href="https://github.com/c0np4nn4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary me-3"
            style={{ textDecoration: "none", fontWeight: "bold" }}
          >
            GitHub
          </a>
          <a
            href="/terms"
            className="text-secondary me-3"
            style={{ textDecoration: "none" }}
          >
            Terms of Service
          </a>
          <a
            href="/privacy"
            className="text-secondary"
            style={{ textDecoration: "none" }}
          >
            Privacy Policy
          </a>
        </div>
        <p>
          &copy; 2024. All rights reserved. Powered by c0np4nn4.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

