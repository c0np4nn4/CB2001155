import React from "react";
import "../Header.css";

function Header() {
  return (
    <header className="animated-header text-white text-center d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1447767819330-4adf93b62dfe?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGJyZWV6ZSUyMGZyZXNofGVufDB8MHwwfHx8MA%3D%3D')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"

      }}>
      <div className="content">
        <h2 className="display-6 fw-bold">Air Quality Monitoring Dashboard</h2>
        <p className="mt-2 lead">
          Real-time monitoring and visualization of air quality data
        </p>
      </div>
    </header>
  );
}

export default Header;

