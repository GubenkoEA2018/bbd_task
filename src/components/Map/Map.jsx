import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';

const MapSetup = ({ position, withControls, address }) => {
  const defaultOptions = {
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    showingInfoWindow: false,
  };
  return (
    <GoogleMap
      defaultZoom={17}
      defaultCenter={position}
      defaultOptions={defaultOptions}
    >
      <MarkerWithLabel
        position={position}
        labelAnchor={new window.google.maps.Point(0, 30)}
        labelStyle={{
          color: 'red',
          fontSize: '16px',
          paddingLeft: '12px',
          width: '250px',
        }}
      >
        <div>{address}</div>
      </MarkerWithLabel>
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(MapSetup));

const Map = ({ position, withControls, address }) => {
  return (
    <WrappedMap


        // https://www.google.com/maps/place/%D0%94%D1%83%D0%B1%D0%B8%D0%BD%D0%B8%D0%BD%D1%81%D0%BA%D0%B0%D1%8F+%D1%83%D0%BB.,+61,+%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0,+115054/@55.718315,37.635085,16z/data=!4m5!3m4!1s0x46b54b3c45cf14ef:0xa7b3b34022fb9f2b!8m2!3d55.718315!4d37.6350849?hl=ru-RU

      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`}
      loadingElement={<div style={{ height: '100%', width: '100%' }} />}
      containerElement={<div style={{ height: '100%', width: '100%' }} />}
      mapElement={<div style={{ height: '100%', width: '100%' }} />}
      position={position}
      withControls={withControls}
      address={address}
    />
  );
};

export default Map;
