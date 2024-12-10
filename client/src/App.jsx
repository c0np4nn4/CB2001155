import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import CityData from "./section/CityData";
import Charts from "./section/Charts";
import Ranking from "./section/Ranking";

import "./styles.css";
import { saveApiKey } from "./utils/api";
import LandingPage from "./section/Landing";

function App() {
  const [activeTab, setActiveTab] = useState("landing");

  useEffect(() => {
    saveApiKey();
  }, []);

  return (
    <div className='app-layout'>
      <Header />
      <Navigation setActiveTab={setActiveTab} />
      <main className="container my-4">
        {activeTab === "landing" && <LandingPage setActiveTab={setActiveTab} />}
        {activeTab === "data" && <CityData />}
        {activeTab === "visualize" && <Charts />}
        {activeTab === "rank" && <Ranking />}
      </main >
      <Footer />
    </div >
  );
}

export default App;

