import React from "react";

function LandingPage({ setActiveTab }) {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1688068705061-0305b5828e58?q=80&w=2542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          // backgroundColor: "#0d6efd",
          color: "white",
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
          Welcome to AQMonitor
        </h1>
        <p style={{ fontSize: "1.3rem", marginTop: "0.8rem", maxWidth: "900px", textAlign: "center" }}>
          Real-time Air Quality Monitoring and Visualization.
          <br />
          Access city air quality data, explore interactive charts, and compare global air quality rankings.
          <br />
          Make informed choices for a healthier environment.
        </p>

        <button
          style={{
            backgroundColor: "white",
            color: "#0d6efd",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginTop: "2rem",
            cursor: "pointer",
            transition: "transform 0.2s ease, background-color 0.3s ease",
          }}
          onClick={() => setActiveTab("data")}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#0b5ed7";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "white";
            e.target.style.color = "#0d6efd";
          }}
        >
          Explore Dashboard
        </button>
      </section>


    </div>
  );
}

export default LandingPage;

