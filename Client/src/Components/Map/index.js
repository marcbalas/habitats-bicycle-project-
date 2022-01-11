import React from "react";
import { GoogleMap, InfoWindow, Marker, MarkerClusterer } from "@react-google-maps/api";
import { formatRelative, parse } from "date-fns";
import Axios from "axios";
import {
  BoxSelectDanger,
  BoxDangerDescription,
  GpsLocation,
  SearchBox,
  BoxDangerList,
} from "../";
import { useGlobalMapContext } from "../../Context/mapContext";
import "./map.css";
import "../BoxSelectDanger/boxSelectDanger.css";
import logo from "./Polygon38.png";

import logoBlue from "./PolygonBlue.png";


const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 52.52,
  lng: 13.405,
};

const mapOptions = {
  styles: [
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ],
  disableDefaultUI: true,
  zoomControl: true,
};

/*const clusterStyles = [{
    width: 35,
    height: 35,
    textColor: '#ff00ff',
    textSize: 20
  }, {
    width: 45,
    height: 45,
    textColor: '#ff0000',
    textSize: 25
  }, {
    width: 55,
    height: 55,
    textColor: '#ffffff',
    textSize: 30
  }]*/



export default function Map() {
  const {
    markers,
    isBoxSelectDangerOpen,
    finalMarkers,
    onMapClick,
    onMapLoad,
    selected,
    setSelected,
    panTo,
    handleBoxDangerDetails,
  } = useGlobalMapContext();

  
  return (
    <div>

    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      options={mapOptions}
      onClick={onMapClick}
      onLoad={onMapLoad}
      yesIWantToUseGoogleMapApiInternals
    >
      <div className="search-map-location">
        <SearchBox panTo={panTo} />
      </div>
        <GpsLocation panTo={panTo} />
       {/*
      {clusters.map(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties;

         
            return (
              
              <Marker
                key={`cluster-${cluster.id}`}
                lat={latitude}
                lng={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    mapRef.current.setZoom(expansionZoom);
                    mapRef.current.panTo({ lat: latitude, lng: longitude });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }
        })}
      */}
  <MarkerClusterer
        /*styles={clusterStyles}*/
        gridSize = {60}
  >
        {(clusterer) =>
            finalMarkers.map((fMarker) => (
              <Marker key={fMarker.id}
                position={{ lat: Number(fMarker.lat), lng: Number(fMarker.lng) }}
                clusterer={clusterer}
                icon={{
                    url: logo,
                    scaledSize: new window.google.maps.Size(50, 50),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(25, 25),
                }}
                onClick={() => {
                  setSelected(fMarker);
              }} 
              />
          ))}
    </MarkerClusterer>
 

      {selected ? (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>
            <p>Categorias</p>
            <button type="button" onClick={handleBoxDangerDetails}>
              More details
            </button>
            <p>{formatRelative(selected.time, new Date())}</p>
          </div>
        </InfoWindow>
      ) : null}

      {isBoxSelectDangerOpen ? <Marker position={markers} icons={{
        url: logoBlue,
        scaledSize: new window.google.maps.Size(50, 50),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(25, 25),}} /> : "box-overlay"}
      {isBoxSelectDangerOpen ? <BoxSelectDanger /> : "box-overlay"}
      <BoxDangerDescription />
      <BoxDangerList />
    </GoogleMap>
    </div>
  );
}
