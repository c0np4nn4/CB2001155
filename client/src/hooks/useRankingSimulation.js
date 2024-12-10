import { useState } from "react";
import axios from "axios";

function useRankingSimulation() {
  const [topCountries, setTopCountries] = useState([]);
  const [bottomCountries, setBottomCountries] = useState([]);

  // Function to fetch air pollution data for a country's capital
  const fetchAirPollutionForCapital = async (capital) => {
    const API_KEY = localStorage.getItem("API_KEY");
    try {
      // Get latitude and longitude for the capital city
      const geocodeResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${API_KEY}`
      );
      const { lat, lon } = geocodeResponse.data[0];

      // Fetch air pollution data
      const pollutionResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      return pollutionResponse.data.list[0].components;
    } catch (error) {
      console.error(`Error fetching pollution data for ${capital}:`, error);
      return null; // Return null if there's an error
    }
  };

  // Function to calculate a score based on pollutant levels
  const calculatePollutionScore = (components) => {
    const { pm2_5, pm10, no2, so2, co, nh3, no } = components;

    // Calculate score by combining pollutant levels
    return (
      (pm2_5 || 0) * 5 + // PM2.5 has the highest weight
      (pm10 || 0) * 3 +
      (no2 || 0) * 2 +
      (so2 || 0) * 1.5 +
      (co || 0) * 1 +
      (nh3 || 0) * 1 +
      (no || 0) * 1
    );
  };

  // Main function to fetch and rank countries
  const fetchRankingData = async () => {
    const API_KEY = localStorage.getItem("API_KEY");
    if (!API_KEY) {
      alert("Please enter an API key first.");
      return;
    }

    try {
      const countryResponse = await axios.get(
        "https://restcountries.com/v3.1/independent?status=true"
      );

      const countryData = await Promise.all(
        countryResponse.data.map(async (country) => {
          const capital = country.capital ? country.capital[0] : null;
          if (!capital) {
            return null; // Skip if no capital city is available
          }

          const components = await fetchAirPollutionForCapital(capital);
          if (!components) {
            return null; // Skip if unable to fetch pollution data
          }

          const score = calculatePollutionScore(components);

          return {
            name: country.name.common,
            capital,
            score,
          };
        })
      );

      // Filter out null values and sort the data
      const validCountries = countryData.filter((data) => data !== null);
      const sortedCountries = validCountries.sort((a, b) => b.score - a.score);

      // Set top and bottom 4 countries
      setTopCountries(sortedCountries.slice(0, 4));
      setBottomCountries(sortedCountries.slice(-4));
    } catch (error) {
      console.error("Error fetching ranking data:", error);
    }
  };

  return { fetchRankingData, topCountries, bottomCountries };
}

export default useRankingSimulation;

