import React from "react";

function Navigation({ setActiveTab }) {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="container-fluid">
        <a
          className="navbar-brand fw-bold fs-4 text-primary"
          href="#"
          onClick={() => setActiveTab("data")}
          style={{
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          AQMonitor
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                className="nav-link text-white"
                href="#"
                onClick={() => setActiveTab("data")}
                style={{
                  position: "relative",
                  transition: "color 0.2s ease, background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#0d6efd";
                  e.target.style.backgroundColor = "rgba(13, 110, 253, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                City Data
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white"
                href="#"
                onClick={() => setActiveTab("visualize")}
                style={{
                  position: "relative",
                  transition: "color 0.2s ease, background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#0d6efd";
                  e.target.style.backgroundColor = "rgba(13, 110, 253, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Visualize
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-white"
                href="#"
                onClick={() => setActiveTab("rank")}
                style={{
                  position: "relative",
                  transition: "color 0.2s ease, background-color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#0d6efd";
                  e.target.style.backgroundColor = "rgba(13, 110, 253, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "white";
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                AQ Ranking (real-time)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

