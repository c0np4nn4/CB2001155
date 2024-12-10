import React, { useState, useEffect } from "react";
import useFetchCityData from "../hooks/useFetchCityData";
import axios from "axios";

function CityData() {
  const [city, setCity] = useState("Seoul");
  const [airQuality, setAirQuality] = useState("N/A");
  const [pollutantData, setPollutantData] = useState({
    pm25: "N/A",
    pm10: "N/A",
    so2: "N/A",
    nox: "N/A",
    nh3: "N/A",
    no2: "N/A",
    co: "N/A",
    o3: "N/A",
  });
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const { fetchCityData, temperature, humidity } = useFetchCityData(city);

  useEffect(() => {
    // 기본값으로 Seoul 데이터를 Fetch
    const fetchDefaultData = async () => {
      await handleGetData();
      setLoading(false);
    };
    fetchDefaultData();
  }, []); // 처음 렌더링 시 실행

  const fetchAirPollutionData = async (lat, lon) => {
    const API_KEY = localStorage.getItem("API_KEY");
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      const components = response.data.list[0].components;

      setPollutantData({
        pm25: `${components.pm2_5.toFixed(2)} µg/m³`,
        pm10: `${components.pm10.toFixed(2)} µg/m³`,
        so2: `${components.so2.toFixed(2)} µg/m³`,
        nox: `${components.no.toFixed(2)} µg/m³`,
        nh3: `${components.nh3.toFixed(2)} µg/m³`,
        no2: `${components.no2.toFixed(2)} µg/m³`,
        co: `${components.co.toFixed(2)} µg/m³`,
        o3: `${components.o3 ? components.o3.toFixed(2) : "N/A"} µg/m³`,
      });

      const grade = getAirQualityGrade(
        components.pm2_5,
        components.pm10,
        components.no2,
        components.so2,
        components.co,
        components.nh3,
        components.no
      );
      setAirQuality(`${grade}`);
    } catch (error) {
      console.error("Error fetching air pollution data:", error);
    }
  };

  const handleGetData = async () => {
    const API_KEY = localStorage.getItem("API_KEY");
    if (!API_KEY) {
      alert("Please enter an API key first.");
      return;
    }

    setLoading(true); // 데이터 로드 중 상태로 전환
    try {
      await fetchCityData();

      const geocodeResponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );

      const { lat, lon } = geocodeResponse.data[0];
      await fetchAirPollutionData(lat, lon);
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
    setLoading(false); // 데이터 로드 완료 상태로 전환
  };

  const getAirQualityGrade = (pm25, pm10, no2, so2, co, nh3, nox) => {
    const score =
      pm25 * 3 +
      pm10 * 2 +
      no2 * 2 +
      so2 * 1.5 +
      co * 2.5 +
      nh3 * 1.2 +
      nox * 1;

    if (score <= 50) {
      return "Good 😊";
    } else if (score > 50 && score <= 100) {
      return "Moderate 😐";
    } else {
      return "Unhealthy 😷";
    }
  };

  const SkeletonLoader = () => (
    <div className="row">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="col-md-4 mb-3">
          <div className="card skeleton-card">
            <div className="card-body">
              <div className="skeleton skeleton-header"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Real-time Air Quality Data</h2>
      <div className="input-group mb-3 justify-content-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="form-control w-50"
          placeholder="Enter city name"
        />
        <button onClick={handleGetData} className="btn btn-primary ms-2">
          Get Data
        </button>
      </div>
      <h3 className="text-center mb-4">Current city: {city}</h3>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <div>
          <div className="row text-center">
            <div className="col-md-4">
              <div className="card text-white bg-info mb-3">
                <div className="card-header">Air Quality</div>
                <div className="card-body">
                  <h5 className="card-title">{airQuality}</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-primary mb-3">
                <div className="card-header">Temperature</div>
                <div className="card-body">
                  <h5 className="card-title">{temperature || "N/A"} °C</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-white bg-success mb-3">
                <div className="card-header">Humidity</div>
                <div className="card-body">
                  <h5 className="card-title">{humidity || "N/A"}%</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {Object.entries(pollutantData).map(([key, value], index) => (
              <div key={index} className="col-md-4">
                <div
                  className={`card text-white ${key === "co"
                    ? "bg-danger"
                    : key === "pm25" || key === "pm10" || key === "no2"
                      ? "bg-warning"
                      : "bg-secondary"
                    } mb-3`}
                >
                  <div className="card-header">{key.toUpperCase()}</div>
                  <div className="card-body">
                    <h5 className="card-title">{value}</h5>
                    <p className="card-text">{`${key} level`}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default CityData;

