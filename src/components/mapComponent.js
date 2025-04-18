import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const geocodeAddress = async (address) => {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc`
          );
          const { results } = response.data;
          if (results.length > 0) {
            const { lat, lng } = results[0].geometry.location;
            return { lat, lng };
          } else {
            throw new Error('Address not found');
          }
        } catch (error) {
          console.error('Error geocoding address:', error);
          return null;
        }
      };

    const MapComponent = ({ address }) => {
        const [coordinates, setCoordinates] = useState(null);
      
        useEffect(() => {
          const fetchCoordinates = async () => {
            const coords = await geocodeAddress(address);
            if (coords) {
              setCoordinates(coords);
            }
          };
      
          fetchCoordinates();
        }, [address]);
      
        const mapContainerStyle = {
          height: '400px',
          width: '100%',
        };
      
        const center = coordinates || { lat: 0, lng: 0 }; // Default center
      
        return (
          <LoadScript googleMapsApiKey="AIzaSyA0s1a7phLN0iaD6-UE7m4qP-z21pH0eSc">
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
              {coordinates && <Marker position={coordinates} />}
            </GoogleMap>
          </LoadScript>
        );
      };
      export default MapComponent;
      