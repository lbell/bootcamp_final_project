import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

export default function LocationMarker(props) {
  const [position, setPosition] = useState(null);
  const [bbox, setBbox] = useState([]);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      console.log(e.latlng); // DEBUG

      setPosition(e.latlng);
      //   map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius);
      circle.addTo(map);
      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here.</Popup>
    </Marker>
  );
}
