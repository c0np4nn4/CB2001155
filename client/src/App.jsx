import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import CityData from "./Section/CityData";
import Charts from "./Section/Charts";
import Ranking from "./Section/Ranking";

import "./styles.css";
import { saveApiKey } from "./utils/api";

function App() {
  const [activeTab, setActiveTab] = useState("data");

  useEffect(() => {
    saveApiKey();
  }, []);

  return (
    <div>
      <Header />
      <Navigation setActiveTab={setActiveTab} />
      <main className="container my-4">
        {activeTab === "data" && <CityData />}
        {activeTab === "visualize" && <Charts />}
        {activeTab === "rank" && <Ranking />}
      </main >
      <Footer />
    </div >
  );
}

export default App;

