import React, { useEffect, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
// eslint-disable-next-line no-unused-vars
import Locate from "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import { getTile, downloadTile, saveTile } from "leaflet.offline";
import PopupInfo from "./PopupInfo";

export default function Map(props) {
  const mapRef = useRef(null);
  const tileRef = useRef(null);
  const controlRef = useRef(null);
  const layerRef = useRef(null);

  // Base tile for the map:
  tileRef.current = L.tileLayer(
    `https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}`,
    {
      attribution: '<a href="https://usgs.gov/">U.S. Geological Survey</a>',
    }
  );

  const satLayer = L.tileLayer(
    `https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}`,
    {
      attribution: '<a href="https://usgs.gov/">U.S. Geological Survey</a>',
    }
  );

  const lidarLayer = L.tileLayer.wms(
    "https://elevation.nationalmap.gov/arcgis/services/3DEPElevation/ImageServer/WMSServer?",
    {
      layers: "3DEPElevation:Hillshade Multidirectional",

      format: "image/png",
      attribution: '<a href="https://usgs.gov/">U.S. Geological Survey</a>',
    }
  );

  const mapStyles = {
    overflow: "hidden",
    width: "100%",
    height: "92vh",
  };

  // Map creation:
  useEffect(() => {
    // Options for our map instance:
    const mapParams = {
      center: [36.498002, -105.502372],
      zoom: 10,
      maxZoom: 16,
      zoomControl: false,
      maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
      closePopupOnClick: false,
      layers: [tileRef.current], // Start with just the base layer
      preferCanvas: true,
      renderer: L.canvas({ padding: 0.5, tolerance: 10 }),
    };

    mapRef.current = L.map("map", mapParams);
  }, []);

  // Controls:
  useEffect(() => {
    // Add the base layer to the control:
    controlRef.current = L.control
      .layers({
        OpenStreetMap: tileRef.current,
        Satellite: satLayer,
        Lidar: lidarLayer,
      })
      .addTo(mapRef.current);

    // Add zoomControl:
    L.control
      .zoom({
        position: "topleft",
      })
      .addTo(mapRef.current);

    // Add location control:
    L.control
      .locate({
        keepCurrentZoomLevel: true,
        flyTo: true,
      })
      .addTo(mapRef.current);
  }, [lidarLayer, satLayer]);

  // Create the layerGroup:
  useEffect(() => {
    layerRef.current = L.layerGroup().addTo(mapRef.current);
    // controlRef.current.addOverlay(layerRef.current, "Circles");
  }, []);

  // Add GeoJSON to map:
  useEffect(() => {
    const trailColor = "#0d6efd";
    const trailHoverColor = "red";

    if (props.trails) {
      L.geoJSON(props.trails, {
        color: trailColor,
        onEachFeature: (feature, layer) => {
          // Add tooltip on each feature
          layer.bindTooltip(feature.properties.TRAIL_NAME_LOWER, {
            sticky: true, // Tooltip will follow the mouse
          });

          // Add mouseover event to change the color of the trail
          layer.on({
            mouseover: (e) => {
              //   console.log(e.target);
              e.target.setStyle({ color: trailHoverColor });
            },
            mouseout: (e) => {
              e.target.setStyle({ color: trailColor });
            },
          });

          // Add popup on click
          layer.bindPopup(
            ReactDOMServer.renderToString(
              <PopupInfo
                name={feature.properties.TRAIL_NAME_LOWER}
                distance={feature.properties.TRAIL_LENGTH}
                id={feature.properties.ECTA_index}
              />
            )
          );
        },
      }).addTo(layerRef.current);
    }
  }, [props.trails]);

  // Map events:
  //   useEffect(() => {
  //     mapRef.current.on("zoomstart", () => {
  //       console.log("ZOOM STARTED");
  //     });
  //   }, []);

  // Add the city circles to the map:
  //   useEffect(() => {
  //     layerRef.current.clearLayers();
  //     Array.from(cityData).forEach((city) => {
  //       L.circle(city.latLng, { radius: 100000 }).addTo(layerRef.current);
  //     });
  //   }, [cityData]);

  // Add offline to Lidar Map:
  lidarLayer.on("tileloadstart", (event) => {
    const { tile } = event;
    const url = tile.src;
    // reset tile.src, to not start download yet
    tile.src = "";
    getTile(url).then((blob) => {
      if (blob) {
        tile.src = URL.createObjectURL(blob);
        console.debug(`Loaded ${url} from idb`);
        return;
      }
      tile.src = url;
      // create helper function for it?
      const { x, y, z } = event.coords;
      const { _url: urlTemplate } = event.target;
      const tileInfo = {
        key: url,
        url,
        x,
        y,
        z,
        urlTemplate,
        createdAt: Date.now(),
      };
      downloadTile(url)
        .then((dl) => saveTile(tileInfo, dl))
        .then(() => console.debug(`Saved ${url} in idb`));
    });
  });

  // Add offline to Satellite Map:
  satLayer.on("tileloadstart", (event) => {
    const { tile } = event;
    const url = tile.src;
    // reset tile.src, to not start download yet
    tile.src = "";
    getTile(url).then((blob) => {
      if (blob) {
        tile.src = URL.createObjectURL(blob);
        console.debug(`Loaded ${url} from idb`);
        return;
      }
      tile.src = url;
      // create helper function for it?
      const { x, y, z } = event.coords;
      const { _url: urlTemplate } = event.target;
      const tileInfo = {
        key: url,
        url,
        x,
        y,
        z,
        urlTemplate,
        createdAt: Date.now(),
      };
      downloadTile(url)
        .then((dl) => saveTile(tileInfo, dl))
        .then(() => console.debug(`Saved ${url} in idb`));
    });
  });

  // Add offline to base layer
  tileRef.current.on("tileloadstart", (event) => {
    const { tile } = event;
    const url = tile.src;
    // reset tile.src, to not start download yet
    tile.src = "";
    getTile(url).then((blob) => {
      if (blob) {
        tile.src = URL.createObjectURL(blob);
        console.debug(`Loaded ${url} from idb`);
        return;
      }
      tile.src = url;
      // create helper function for it?
      const { x, y, z } = event.coords;
      const { _url: urlTemplate } = event.target;
      const tileInfo = {
        key: url,
        url,
        x,
        y,
        z,
        urlTemplate,
        createdAt: Date.now(),
      };
      downloadTile(url)
        .then((dl) => saveTile(tileInfo, dl))
        .then(() => console.debug(`Saved ${url} in idb`));
    });
  });

  return (
    <div>
      <div id="map" style={mapStyles} />
    </div>
  );
}
