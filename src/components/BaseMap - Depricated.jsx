import React from "react";
import {
  MapContainer,
  TileLayer,
  //   Marker,
  Popup,
  LayersControl,
  GeoJSON,
  Tooltip,
} from "react-leaflet";
import { WMSTileLayer } from "react-leaflet/WMSTileLayer";
import L from "leaflet";
import "./BaseMap.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
// import LocationMarker from "./LocationMarker";
import PopupInfo from "./PopupInfo";
import TooltipInfo from "./TooltipInfo";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;


// Sets a buffer around lines that are clickable to make it easier to click on
// them. Default is 1 pixel, so we're setting it to 10 pixels.
const bufferedRenderer = L.canvas({ padding: 0.5, tolerance: 10 });
const lineColor = "blue";

export default function BaseMap({ trails }) {
  // And filter out empty features (shouldn't be any, but just in case)
  let filteredTrails = trails.features.filter(
    (trail) => trail.geometry.coordinates.length > 0
  );
  console.log(typeof trails); // DEBUG

  const position = [36.556847, -105.416913];

  return (
    <MapContainer
      center={position}
      zoom={11}
      scrollWheelZoom={true}
      preferCanvas={true}
      renderer={bufferedRenderer}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Topo">
          <TileLayer
            maxZoom={16}
            attribution='<a href="https://usgs.gov/">U.S. Geological Survey</a>'
            url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}"
            attribution='<a href="https://usgs.gov/">U.S. Geological Survey</a>'
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Lidar (SLOW)">
          <WMSTileLayer
            // center={position}
            // zoom={11}
            // scrollWheelZoom={true}
            attribution='<a href="https://usgs.gov/">U.S. Geological Survey</a>'
            url="https://elevation.nationalmap.gov/arcgis/services/3DEPElevation/ImageServer/WMSServer?"
            layers="3DEPElevation:Hillshade Multidirectional"
            format="image/png"
            // transparent="true"
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="Current Snow Cover">
          <WMSTileLayer
            className="snow"
            url="https://gis.postholer.com/services/reflect?"
            layers="sweLatest"
            // layers="nlcdlite,snowcover8dayLatest,sweLatest,demshade,countylines,statelines,trace,wptByTrailType,pop"

            // &bbox=-123.88,43.12,-107.44,49.11
            // &trail_id=1
            // &ids=4
            // width="1024"
            // t_srs="EPSG:3857"
            format="image/png"
            transparent="true"
            opacity="0.7"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Current Radar">
          <WMSTileLayer
            url="https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0q.cgi"
            layers="nexrad-n0q-900913"
            format="image/png"
            transparent="true"
            // format="image/png"
          />
        </LayersControl.Overlay>
      </LayersControl>

      {filteredTrails.map((feature) => {
        // Note for this to work, appears to need CRS to be set

        const trailName = feature.properties.TRAIL_NAME_LOWER || "Trail Name";

        return (
          <GeoJSON
            key={feature.properties.ECTA_index}
            data={feature}
            style={{ color: lineColor }}
            onEachFeature={(feature, layer) => {
              layer.on({
                mouseover: (e) => {
                  //   console.log(e.target);
                  e.target.setStyle({ color: "red" });
                },
                mouseout: (e) => {
                  e.target.setStyle({ color: lineColor });
                },
              });
            }}
          >
            <Popup>
              <PopupInfo
                name={trailName}
                distance={feature.properties.TRAIL_LENGTH}
                id={feature.properties.ECTA_index}
              />
            </Popup>
            <Tooltip sticky>
              <TooltipInfo name={trailName} />
            </Tooltip>
          </GeoJSON>
        );
      })}
      {/* <LocationMarker /> */}
    </MapContainer>
  );
}
