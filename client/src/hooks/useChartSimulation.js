import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

function useChartSimulation() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [pollutantData, setPollutantData] = useState({});
  const [weatherData, setWeatherData] = useState([]);
  const [dates, setDates] = useState([]);

  // Function to fetch forecast data (temperature, humidity, and weather)
  const fetchWeatherForecast = async (city, API_KEY) => {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(forecastUrl);
      const data = response.data.list;

      // Extract temperature, humidity, weather descriptions, and timestamps
      setTemperatureData(data.map((entry) => entry.main.temp));
      setHumidityData(data.map((entry) => entry.main.humidity));
      setWeatherData(data.map((entry) => entry.weather[0].main));
      setDates(data.map((entry) => entry.dt_txt));
    } catch (error) {
      console.error("Error fetching weather forecast:", error);
    }
  };

  // Function to fetch pollutant data (e.g., PM2.5, PM10, NOx)
  const fetchAirPollutantData = async (city, API_KEY) => {
    const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
    try {
      // Get coordinates for the city
      const geocodeResponse = await axios.get(geocodeUrl);
      const { lat, lon } = geocodeResponse.data[0];

      const currentTime = Math.floor(Date.now() / 1000);
      const startTime = currentTime - 5 * 24 * 60 * 60; // Last 5 days
      const pollutantUrl = `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${startTime}&end=${currentTime}&appid=${API_KEY}`;

      const pollutantResponse = await axios.get(pollutantUrl);
      const pollutantList = pollutantResponse.data.list;

      setPollutantData({
        PM25: pollutantList.map((entry) => entry.components.pm2_5),
        PM10: pollutantList.map((entry) => entry.components.pm10),
        NOx: pollutantList.map((entry) => entry.components.no2),
        NH3: pollutantList.map((entry) => entry.components.nh3),
        CO: pollutantList.map((entry) => entry.components.co / 10),
        SO2: pollutantList.map((entry) => entry.components.so2),
      });
    } catch (error) {
      console.error("Error fetching air pollutant data:", error);
    }
  };

  // Function to render temperature and humidity line charts
  const renderTemperatureAndHumidityCharts = () => {
    const ctxTempElement = document.getElementById("temperature-chart");
    const ctxHumElement = document.getElementById("humidity-chart");

    // 캔버스 요소가 존재하지 않으면 함수 종료
    if (!ctxTempElement || !ctxHumElement) {
      console.error("Canvas elements for charts are not yet loaded.");
      return;
    }

    const ctxTemp = ctxTempElement.getContext("2d");
    const ctxHum = ctxHumElement.getContext("2d");

    // Destroy existing charts if any
    if (window.temperatureChart) window.temperatureChart.destroy();
    if (window.humidityChart) window.humidityChart.destroy();

    window.temperatureChart = new Chart(ctxTemp, {
      type: "line",
      data: {
        labels: dates.map((date) => new Date(date).toLocaleDateString()),
        datasets: [
          {
            label: "Temperature (°C)",
            data: temperatureData,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });

    window.humidityChart = new Chart(ctxHum, {
      type: "line",
      data: {
        labels: dates.map((date) => new Date(date).toLocaleDateString()),
        datasets: [
          {
            label: "Humidity (%)",
            data: humidityData,
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  // Function to render pollutant bar chart
  const renderPollutantBarChart = () => {
    const ctxPollutElement = document.getElementById("pollutant-bar-chart");

    // 캔버스 요소가 존재하지 않으면 함수 종료
    if (!ctxPollutElement) {
      console.error("Canvas elements for charts are not yet loaded.");
      return;
    }

    const ctxPollutant = ctxPollutElement.getContext("2d");


    if (window.pollutantBarChart) window.pollutantBarChart.destroy();

    window.pollutantBarChart = new Chart(ctxPollutant, {
      type: "bar",
      data: {
        labels: dates.slice(-5).map((date) => new Date(date).toLocaleDateString()),
        datasets: Object.entries(pollutantData).map(([key, values], index) => ({
          label: key,
          data: values.slice(-5),
          backgroundColor: `rgba(${(index * 50) % 255}, ${(index * 100) % 255}, ${(index * 150) % 255}, 0.8)`,
        })),
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  // Function to render weather distribution doughnut chart
  const renderWeatherDoughnutChart = () => {
    // const ctxWeather = document.getElementById("weather-doughnut-chart").getContext("2d");
    const ctxWeatherElement = document.getElementById("weather-doughnut-chart");

    if (!ctxWeatherElement) {
      console.error("Canvas elements for charts are not yet loaded.");
      return;
    }

    const ctxWeather = ctxWeatherElement.getContext("2d");

    if (window.weatherDoughnutChart) window.weatherDoughnutChart.destroy();

    const weatherCounts = weatherData.reduce((acc, weather) => {
      acc[weather] = (acc[weather] || 0) + 1;
      return acc;
    }, {});

    window.weatherDoughnutChart = new Chart(ctxWeather, {
      type: "doughnut",
      data: {
        labels: Object.keys(weatherCounts),
        datasets: [
          {
            label: "Weather Distribution",
            data: Object.values(weatherCounts),
            backgroundColor: [
              "rgba(255, 99, 132, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(255, 205, 86, 0.8)",
              "rgba(153, 102, 255, 0.8)",
            ],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  };

  // Function to fetch and render all charts
  const fetchChartData = async (city) => {
    const API_KEY = localStorage.getItem("API_KEY");

    if (!API_KEY) {
      console.error("API Key is missing. Please register the API Key.");
      return;
    }

    await fetchWeatherForecast(city, API_KEY);
    await fetchAirPollutantData(city, API_KEY);

    renderTemperatureAndHumidityCharts();
    renderPollutantBarChart();
    renderWeatherDoughnutChart();
  };

  return { fetchChartData, renderTemperatureAndHumidityCharts, renderPollutantBarChart, renderWeatherDoughnutChart };
}

export default useChartSimulation;

