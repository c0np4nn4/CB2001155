# AQMonitor - Air Quality Monitoring Dashboard

AQMonitor is a simple yet functional web application that provides real-time air quality data for cities worldwide. It offers features such as data visualization, global air quality rankings, and an intuitive user experience, making it an accessible tool for environmental awareness.

## Features

- **Landing Page**: Welcoming page introducing the platform's purpose and functionality.
- **City Data Section**: Fetch and view real-time air quality data for specific cities.
- **Visualize Section**: Interactive charts and graphs to analyze air quality trends.
- **Ranking Section**: Global air quality rankings enabling city-to-city comparisons.
- **Responsive Design**: Optimized for usability across all device types.

## Project Structure

```
.
├── App.jsx
├── Section
│   ├── Charts.jsx
│   ├── CityData.jsx
│   ├── Landing.jsx
│   └── Ranking.jsx
├── components
│   ├── Footer.jsx
│   ├── Header.jsx
│   └── Navigation.jsx
├── hooks
│   ├── useChartSimulation.js
│   ├── useFetchCityData.js
│   └── useRankingSimulation.js
├── utils
    └── api.js
```

## Technologies Used

- **React.js**: Modular and scalable frontend development.
- **Bootstrap**: For responsive and visually appealing components.
- **Chart.js**: Interactive chart rendering.
- **OpenWeatherMap API**: Provides real-time weather and air quality data.
- **GitHub Pages**: For live hosting and deployment.

## Project Highlights

1. **Transition to Modern Frameworks**: Initially developed with HTML, CSS, and vanilla JavaScript using jQuery for API calls, later transitioned to React and Axios for better scalability and performance.
2. **Responsive Design**: CSS Flexbox and Grid for layout and Skeleton Code for improved UX during data loading.
3. **API Integration**: Leveraged OpenWeatherMap API for comprehensive data retrieval while considering alternative APIs like AccuWeather.

## Live Hosting

The application is live and accessible at:  
[https://c0np4nn4.github.io/CB2001155](https://c0np4nn4.github.io/CB2001155)

## Final Report

For a detailed description of the project, including its development process, challenges, and solutions, refer to the [Final Report](https://github.com/c0np4nn4/CB2001155/blob/main/Final_Report.pdf).


## Key Lessons Learned

- **Frontend Development**: Learned to structure and modularize React applications.
- **API Integration**: Gained experience in handling real-time data efficiently using Axios.
- **Responsive UX**: Applied Skeleton Code and CSS techniques for enhanced user experience.
- **Project Scalability**: Refactored file structure to improve maintainability.

