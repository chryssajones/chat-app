import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import './MapBox.css';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiY2hyeXNzYWpvbmVzIiwiYSI6ImNqY3ZodGU3bTAweGsycXBieGg4c2dnMm8ifQ.NFg7mVNG0J8uLn4aEwWguA'
});

<Map
  style="mapbox://styles/mapbox/streets-v10"
   containerStyle={{
    height: "100vh",
    width: "100vw"
  }}>
    <Layer
      type="symbol"
      id="marker"
      layout={{ "icon-image": "marker-15" }}>
      <Feature coordinates={[-117.183011, 32.853151]}/>
    </Layer>
</Map>

export default Map;