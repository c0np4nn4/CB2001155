import React, { useState, useEffect } from "react";
import useChartSimulation from "../hooks/useChartSimulation";

function VisualRepresentation() {
  const [city, setCity] = useState("Seoul");
  const [loading, setLoading] = useState(true); // Loading state 추가
  const { fetchChartData } = useChartSimulation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 시작 시 로딩 상태 활성화
      await fetchChartData("Seoul");
      setLoading(false); // 데이터 로드 후 로딩 상태 비활성화
    };

    fetchData();
  }, []);

  // Skeleton 컴포넌트
  const Skeleton = () => (
    <div className="skeleton-chart" style={{ height: "300px", backgroundColor: "#e0e0e0", borderRadius: "8px" }} />
  );

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Visual Representation</h2>
      <div className="input-group mb-3 justify-content-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="form-control w-50"
          placeholder="Enter city name for temperature tracking"
        />
        <button
          onClick={() => fetchChartData(city)}
          className="btn btn-primary ms-2"
        >
          Get Weather Data
        </button>
      </div>
      <div className="row g-4">
        {loading ? (
          <>
            <div className="col-md-6">
              <Skeleton />
            </div>
            <div className="col-md-6">
              <Skeleton />
            </div>
            <div className="col-md-6">
              <Skeleton />
            </div>
            <div className="col-md-6">
              <Skeleton />
            </div>
          </>
        ) : (
          <>
            <div className="col-md-6">
              <div className="chart-container">
                <canvas id="temperature-chart"></canvas>
              </div>
            </div>
            <div className="col-md-6">
              <div className="chart-container">
                <canvas id="humidity-chart"></canvas>
              </div>
            </div>
            <div className="col-md-6">
              <div className="chart-container">
                <canvas id="pollutant-bar-chart"></canvas>
              </div>
            </div>
            <div className="col-md-6">
              <div className="chart-container">
                <canvas id="weather-doughnut-chart"></canvas>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default VisualRepresentation;

