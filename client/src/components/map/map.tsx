import React, { FC, ReactElement } from "react";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoib2xseWhpdGUiLCJhIjoiY2xhcmR1bGcyMDRxMjNvbXMxY3lnZ2xqOSJ9.Y3YUFKRACl5_8-jIo5LRoQ";

export const MapBox: FC = (): ReactElement => {
  const [viewState, setViewState] = React.useState({
    longitude: 0,
    latitude: 0,
    zoom: 0,
  });
  return (
    <Map
      {...viewState}
      style={{ width: 800, height: 600 }}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
};
