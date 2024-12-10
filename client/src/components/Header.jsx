import React from "react";

function Header() {
  return (
    <header
      className="text-white text-center d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1688068705061-0305b5828e58?q=80&w=2542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "20vh", // 화면 높이의 20% 차지
        minHeight: "150px", // 최소 높이 설정
        padding: "1rem",
      }}
    >
      <h1 className="display-4 fw-bold">Air Quality Monitoring Dashboard</h1>
      <p className="mt-2 lead">
        Real-time monitoring and visualization of air quality data
      </p>
    </header>
  );
}

export default Header;

