import React, { useEffect, useState } from "react";
import useRankingSimulation from "../hooks/useRankingSimulation";
import { OverlayTrigger, Popover } from "react-bootstrap";

function RankingSection() {
  const { fetchRankingData, topCountries, bottomCountries } =
    useRankingSimulation();

  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchRankingData();
      setLoading(false);
    };

    fetchData();
  }, []);

  // Popover content for scoring explanation
  const scoringPopover = (
    <Popover id="scoring-popover" className="shadow-sm">
      <Popover.Body>
        <p>
          Scores are calculated based on the following formula:
        </p>
        <pre>
          <code>
            Score = (PM2.5 × 5) + (PM10 × 3) + (NO₂ × 2) + (SO₂ × 1.5) + (CO ×
            1) + (NH₃ × 1) + (NO × 1)
          </code>
        </pre>
        <p className="mb-0">
          Higher scores indicate worse air quality. The weights are assigned
          based on pollutant severity and health impact.
        </p>
      </Popover.Body>
    </Popover>
  );

  const Skeleton = () => (
    <div className="skeleton-loader">
      <div className="skeleton-line" style={{ width: "80%" }}></div>
      <div className="skeleton-line" style={{ width: "60%" }}></div>
      <div className="skeleton-line" style={{ width: "70%" }}></div>
      <div className="skeleton-line" style={{ width: "50%" }}></div>
    </div>
  );


  return (
    <div className="container my-4">
      {/* Title with Explanation Button */}
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-center mb-4">Air Quality Ranking</h2>
        <OverlayTrigger
          trigger="click"
          placement="top"
          overlay={scoringPopover}
          rootClose // Close on outside click
        >
          <button className="btn btn-outline-secondary btn-sm rounded-pill">
            How to get scored?
          </button>
        </OverlayTrigger>
      </div>

      {loading ? (
        <div>
          <h3>Loading Best Countries...</h3>
          <Skeleton />
          <h3>Loading Worst Countries...</h3>
          <Skeleton />
        </div>
      ) : (
        <div>
          {/* Best 4 Countries */}
          <h3 className="text-success">Best 4 Countries</h3>
          <ul className="list-group mb-4">
            {bottomCountries.map((country) => (
              <li
                key={country.name}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {country.name} ({country.capital})
                <span className="badge bg-success">
                  {country.score.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          {/* Worst 4 Countries */}
          <h3 className="text-danger">Worst 4 Countries</h3>
          <ul className="list-group">
            {topCountries.map((country) => (
              <li
                key={country.name}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {country.name} ({country.capital})
                <span className="badge bg-danger">
                  {country.score.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RankingSection;

