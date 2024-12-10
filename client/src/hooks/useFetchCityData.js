import { useState } from "react";
import axios from "axios";

function useFetchCityData(city) {
  const [airQuality, setAirQuality] = useState("N/A");
  const [temperature, setTemperature] = useState("N/A");
  const [humidity, setHumidity] = useState("N/A");

  const fetchCityData = async () => {
    const API_KEY = localStorage.getItem("API_KEY");
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setTemperature(response.data.main.temp);
      setHumidity(response.data.main.humidity);
      setAirQuality("Good"); // Placeholder logic for air quality
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return { fetchCityData, airQuality, temperature, humidity };
}

export default useFetchCityData;

