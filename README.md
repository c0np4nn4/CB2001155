# Air Quality Monitoring Dashboard

> 201824590 조승현

## TODO
- [ ] ranking dashboard UI
- [ ] (maybe) integreate with Web3 (token minting based on weather or air pollution data)
- [ ] (maybe) integreate additional API such as `three.js` or other weather-related APIs

## Demo
https://github.com/user-attachments/assets/ea64c0c5-a7a3-4070-b86c-2bbc427eb21e

## Screenshots
<img width="480" alt="image" src="https://github.com/user-attachments/assets/47f7126c-a838-4e9d-8acf-ebc0d4a4702c">
<img width="480" alt="image" src="https://github.com/user-attachments/assets/3d73f960-bbf6-4380-ac65-151bef0c755e">

## Overview
The **Air Quality Monitoring Dashboard** is a web-based application that allows users to monitor real-time air quality and visualize weather data for different cities. Users can search by city name, view temperature, humidity, and pollution levels, and see a visual representation of the data using various charts.

The dashboard features:
- Real-time monitoring of air quality, temperature, and humidity data.
- Air quality assessment with visual indicators (color coding and emojis).
- A chart-based visualization for temperature, humidity, and air pollutant data.

The application leverages **OpenWeather API** for data retrieval, **Chart.js** for data visualization, and **Bootstrap** for styling.

## Key Features
- **Real-time Air Quality Data**: View up-to-date information on pollutants like PM2.5, PM10, NOx, SO2, NH3, CO, and NO levels.
- **Weather Metrics**: Temperature and humidity data presented in a clear, user-friendly way.
- **Air Quality Status**: Color-coded indicators and emoji-based feedback on air quality ranging from good to unhealthy.
- **Data Visualization**: Interactive line and bar charts displaying trends in temperature, humidity, and pollutant levels.

## Libraries and Tools Used
1. **[Bootstrap 5](https://getbootstrap.com/)** - For responsive styling and layout.
2. **[Chart.js](https://www.chartjs.org/)** - For creating dynamic charts to visualize temperature, humidity, and pollutant data.
3. **[jQuery](https://jquery.com/)** - To manage DOM manipulation and handle API requests.
4. **[Moment.js](https://momentjs.com/)** - For date formatting.
5. **[PapaParse](https://www.papaparse.com/)** - For parsing CSV files to provide custom data.
6. **OpenWeather API** - To fetch real-time weather and pollution data.

## How to Run the Application

### Prerequisites
- You need a web browser to run this dashboard.
- Make sure you have a valid **OpenWeather API Key**.

### Setting Up the Project
1. **Clone the Repository**: Clone the GitHub repository to your local machine.
   ```sh
   git clone <repository-url>
   cd air-quality-monitoring-dashboard
   ```

2. **API Key Setup**: Add your OpenWeather API key to `utils/constants.js`. The API key is not included in the repository for security reasons and is gitignored.
   ```js
   // utils/constants.js
   const API_KEY = 'your_openweather_api_key_here';
   ```

3. **Open in Browser**: Simply open `index.html` in your preferred browser.

### Folder Structure
- `index.html`: Main HTML file for the Air Quality Monitoring Dashboard.
- `css/styles.css`: Custom styling for the dashboard.
- `utils/constants.js`: Contains API keys and constants used across the project.
- `utils/dataSimulation.js`: Handles air quality and weather data fetching and manipulation.
- `utils/chartSimulation.js`: Handles data visualization and chart rendering.
- `utils/navigation.js`: Manages page navigation between sections.

## Simulation Process
The Air Quality Monitoring Dashboard allows users to either manually input a city or upload a CSV file for bulk data processing.

### How It Works
1. **City Data Input**: The user can type in a city name to fetch real-time data for temperature, humidity, and pollution.
2. **API Calls**:
   - **Weather Data**: The dashboard uses the OpenWeather API to get the temperature and humidity values.
   - **Air Pollution Data**: Air pollutant levels are fetched using OpenWeather's Air Pollution API.
3. **Color Coding and Emoji Display**:
   - The air quality status is dynamically displayed next to the current city name, with emojis representing different air quality levels:
     - 😊 (Good): Green color, PM2.5, PM10, NO2, SO2, CO, NH3, and NO levels are in acceptable ranges.
     - 😐 (Moderate): Orange color, moderate levels of some pollutants.
     - ☹️ (Unhealthy for Sensitive Groups): Yellow color, elevated pollutant levels that might affect sensitive groups.
     - 😷 (Unhealthy): Red color, high levels of multiple pollutants.
4. **Charts and Graphs**: The visual representation section provides a graphical view of historical weather and pollution trends.
   - **Temperature Chart**: Shows temperature trends over the past 30 time periods.
   - **Humidity Chart**: Displays the humidity trend.
   - **Pollutant Chart**: A bar chart showcasing pollutant levels (PM2.5, PM10, NOx, NH3, CO, SO2, etc.) over time.

## How to Use the Dashboard
1. **Search for a City**: Use the input field at the top of the dashboard to type in a city name and click "Get Data". The current temperature, humidity, and pollutant levels will be displayed.
2. **Air Quality Status**: The air quality will be assessed and color-coded with an emoji. This information will be displayed next to the current city name.
3. **Visualize Data**: Click the "Visualize" tab to see graphical representations of the weather and air quality data.
4. **Upload CSV File**: Users can upload a CSV file to simulate data input. The parsed data will be visualized in the charts.

## Troubleshooting
- **API Key Issues**: Make sure the OpenWeather API key is valid. The `constants.js` file must be correctly configured.
- **Data Not Displaying**: Double-check if the API key is properly entered, and that there's no CORS or network error.
