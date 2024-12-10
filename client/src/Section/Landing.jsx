import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section
        className="text-white text-center py-5"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558211583-d26bbddc0d0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 className="display-4 fw-bold">Welcome to AQMonitor</h1>
        <p className="lead mt-3">
          Real-time Air Quality Monitoring and Data Visualization Platform
        </p>
        <button
          className="btn btn-primary btn-lg mt-4"
          onClick={() => navigate("/dashboard")}
        >
          Explore Dashboard
        </button>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Why Use AQMonitor?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Real-Time Data</h5>
                  <p className="card-text">
                    Get up-to-date air quality data for any city in the world.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Interactive Visualizations</h5>
                  <p className="card-text">
                    View interactive charts and graphs for pollutant levels and
                    weather data.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Custom Rankings</h5>
                  <p className="card-text">
                    See real-time air quality rankings for cities worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold">Ready to Get Started?</h2>
          <p className="lead mt-3">
            Explore the air quality data and make informed decisions today.
          </p>
          <button
            className="btn btn-success btn-lg mt-4"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;

