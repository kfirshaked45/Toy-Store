import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from 'google-map-react';

export default function GoogleMap() {
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const defaultProps = {
    center: {
      lat: 51.5074,
      lng: -0.2278,
    },
    zoom: 11,
  };

  const markers = [
    { lat: 51.5074, lng: -0.1278 }, // marker for branch 1
    { lat: 51.5202, lng: -0.0979 }, // marker for branch 2
    // Add more markers for each shop branch
  ];

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }} // Replace with your actual API key
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={markers[0].lat} lng={markers[0].lng} text={`Branch 1`} />
        <AnyReactComponent lat={markers[1].lat} lng={markers[1].lng} text={`Branch 2`} />
      </GoogleMapReact>
    </div>
  );
}
