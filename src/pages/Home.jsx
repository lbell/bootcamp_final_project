import React from "react";
// import BaseMap from "../components/BaseMap.jsx";
import Map from "../components/Map.jsx";

export default function Home({ trails }) {
  return (
    <div>
      <div className="map-box">
        {/* <BaseMap trails={trails} /> */}
        <Map trails={trails} />
      </div>
    </div>
  );
}
