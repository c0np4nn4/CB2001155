import React from "react";

function Navigation({ setActiveTab }) {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "linear-gradient(to right, #0575e6 , #021b79)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // 그림자 추가로 입체감
      }}
    >

      <div className="container">
        {/* Logo */}
        <a
          className="navbar-brand fw-bold fs-4"
          href="#"
          onClick={() => setActiveTab("landing")}
          style={{
            cursor: "pointer",
            color: "white",
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={(e) => { e.target.style.transform = "scale(1.1)"; e.target.style.color = "lime" }}
          onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.color = "white" }}
        >
          AQMonitor
        </a>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{ color: "white" }}></span>
        </button>

        {/* Menu Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Navigation Links */}
            {["data", "visualize", "rank"].map((tab, index) => (
              <li key={index} className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setActiveTab(tab)}
                  style={{
                    color: "white",
                    position: "relative",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    transition: "color 0.3s ease, background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "lime";
                    e.target.style.backgroundColor = "rgba(50, 205, 50, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "white";
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav >
  );
}

export default Navigation;

