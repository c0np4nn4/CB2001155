$(document).ready(function() {
  // Function to fetch air quality and weather data by city

  //
  let citi_names = [];

  //
  let citi_status = [];
  let citi_status_good = [];
  let citi_status_bad = [];

  function fetchCityDataRanking(city) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${localStorage.getItem("API_KEY")}&units=metric`;
    $.ajax({
      url: weatherUrl,
      method: 'GET',
      success: function(data) {
        // $('#temperature').text(`${data.main.temp} °C`);
        // $('#humidity').text(`${data.main.humidity} %`);
        const lat = data.coord.lat;
        const lon = data.coord.lon;

        fetchAirPollutionDataRanking(city, lat, lon);
        // currentCity = city;
        // $('#current-city').text(`Current city: ${currentCity}`);
      },
      error: function(error) {
        console.log('error city:', city);
        console.error('Error fetching weather data:', error);
        // alert('Failed to fetch data for the city. Please check the city name and try again.');
      }
    });
  }

  function getAirQualityGrade(pm25, pm10, no2, so2, co, nh3, no) {
    // Reference:
    // - PM2.5 and PM10 levels are referenced from EPA's AQI standards.
    // - NO2, SO2, CO, NH3, NO levels are inferred from typical AQI assessments.

    if (
      pm25 <= 12 &&
      pm10 <= 54 &&
      no2 <= 50 &&
      so2 <= 20 &&
      co <= 4 &&
      nh3 <= 200 &&
      no <= 50
    ) {
      return 'good 😊'; // Green: All pollutants are within healthy limits
    } else if (
      (pm25 > 12 && pm25 <= 35.4) ||
      (pm10 > 54 && pm10 <= 154) ||
      (no2 > 50 && no2 <= 100) ||
      (so2 > 20 && so2 <= 80) ||
      (co > 4 && co <= 9) ||
      (nh3 > 200 && nh3 <= 400) ||
      (no > 50 && no <= 100)
    ) {
      return 'moderate 😐'; // Orange: Some pollutants are at moderate levels
    } else if (
      (pm25 > 35.4 && pm25 <= 55.4) ||
      (pm10 > 154 && pm10 <= 254) ||
      (no2 > 100 && no2 <= 200) ||
      (so2 > 80 && so2 <= 160) ||
      (co > 9 && co <= 15) ||
      (nh3 > 400 && nh3 <= 600) ||
      (no > 100 && no <= 200)
    ) {
      return 'unhealthy for sensitive groups ☹️'; // pink: Unhealthy for sensitive groups
    } else {
      return 'unhealthy 😷'; // Red: High levels of multiple pollutants
    }
  }



  function fetchAirPollutionDataRanking(city_name, lat, lon) {
    const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${localStorage.getItem("API_KEY")}`;
    $.ajax({
      url: airPollutionUrl,
      method: 'GET',
      success: function(data) {
        const pm25 = data.list[0].components.pm2_5;
        const pm10 = data.list[0].components.pm10;
        const no2 = data.list[0].components.no2;
        const so2 = data.list[0].components.so2;
        const co = data.list[0].components.co;
        const nh3 = data.list[0].components.nh3;
        const no = data.list[0].components.no;

        // Set pollution values
        $('#pm25').text(`${pm25} µg/m³`);
        $('#pm10').text(`${pm10} µg/m³`);
        $('#no2').text(`${no2} µg/m³`);
        $('#so2').text(`${so2} µg/m³`);
        $('#co').text(`${co} µg/m³`);
        $('#nh3').text(`${nh3} µg/m³`);
        $('#nox').text(`${no} µg/m³`);

        // Get air quality grade and apply color coding
        const airQualityGrade = getAirQualityGrade(pm25, pm10, no2, so2, co, nh3, no);

        citi_status.push({ city_name, airQualityGrade })

        if (airQualityGrade == 'good 😊' || airQualityGrade == 'moderate 😐') {
          citi_status_good.push({ city_name, airQualityGrade })
        }

        if (airQualityGrade == 'unhealthy 😷') {
          citi_status_bad.push({ city_name, airQualityGrade })
        }

        // return airQualityGrade;
      },
      error: function(error) {
        console.error('Error fetching air pollution data:', error);
      }
    });
  }


  function fetchCitiNames() {
    const country_names = `https://restcountries.com/v3.1/independent?status=true&fields=capital`
    $.ajax({
      url: country_names,
      method: 'GET',
      success: function(data) {

        // console.log('!!!!!!!!!!!!!')
        // console.log(data);
        // console.log('!!!!!!!!!!!!!')
        //
        for (i = 0; i < data.length; i++) {
          // console.log(data[i].name.common)
          citi_names.push(data[i].capital);
          // console.log(i, data[i].name.common);
        }

        for (i = 0; i < citi_names.length; i++) {
          // console.log(i)
          // console.log(citi_names[i])
          fetchCityDataRanking(citi_names[i])
        }

        console.log(citi_status);
        console.log(citi_status_good)
        console.log(citi_status_bad)

      },
      error: function(error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch data for the city. Please check the city name and try again.');
      }
    });
  }

  // function scoring() {

  //   console.log(citi_names)
  //   for (i = 0; i < citi_names.length; i++) {
  //     // console.log(i)
  //     // console.log(citi_names[i])
  //     fetchCityDataRanking(citi_names[i])
  //   }

  //   console.log(citi_status);
  //   console.log(citi_status_good)
  //   console.log(citi_status_bad)

  // }

  fetchCitiNames();
  // scoring();

})
