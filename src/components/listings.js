import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import PlaceCard from './placeCard';

const containerStyle = {
  // width: '60%',
  height: '500px',
};

function Listings() {
  const mapRef = useRef(null);
  const googleRef = useRef(null);
  const drawnPolygonsRef = useRef([]);
  const [searchQuery, setSearchQuery] = useState('');
  // const [mapLoaded, setMapLoaded] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const placeRefs = useRef({});
  const markerMapRef = useRef({});
  const currentInfoWindowRef = useRef(null);

  const clearMarkers = useCallback(() => {
    setMarkers((prevMarkers) => {
      prevMarkers.forEach((marker) => {
        marker.setMap(null); // Remove marker from map
      });
      return []; // Clear marker list
    });
  }, []);

  const searchNearbyHospitals = useCallback((location) => {
    const service = new googleRef.current.maps.places.PlacesService(mapRef.current);
  
    clearMarkers();
  
    const infowindow = new googleRef.current.maps.InfoWindow();
  
    service.nearbySearch(
      {
        location,
        radius: 3000,
        type: 'hospital',
      },
      (results, status) => {
        if (status === googleRef.current.maps.places.PlacesServiceStatus.OK) {
          markerMapRef.current = {};
          const newMarkers = results.map((place) => {
            const marker = new googleRef.current.maps.Marker({
              map: mapRef.current,
              position: place.geometry.location,
              title: place.name,
            });

            markerMapRef.current[place.place_id] = marker;

            marker.addListener('mouseover', () => {
              infowindow.setContent(`
                <div>
                  <strong>${place.name}</strong><br/>
                  ${place.vicinity || ''}
                </div>
              `);
              infowindow.open(mapRef.current, marker);
            });
  
            marker.addListener('mouseout', () => {
              infowindow.close();
            });

            marker.addListener('click', () => {
              setSelectedPlaceId(place.place_id);
            });
  
            return marker;
          });
          
          setMarkers(newMarkers);
          setPlaces(results);
        } else {
          console.error('PlacesService failed:', status);
          alert('No hospitals found nearby.');
        }
      }
    );
  }, [clearMarkers]);

  // 🔥 When places update, create fresh refs
  useEffect(() => {
    placeRefs.current = {};
    places.forEach((place) => {
      placeRefs.current[place.place_id] = React.createRef();
    });
  }, [places]);

  // 🔥 Scroll to selected card when selectedPlaceId changes
  useEffect(() => {
    if (selectedPlaceId && placeRefs.current[selectedPlaceId]) {
      placeRefs.current[selectedPlaceId].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [selectedPlaceId]);

  const handleSearch = useCallback(() => {
    if (!googleRef.current || !mapRef.current || !searchQuery) return;

    const geocoder = new googleRef.current.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, async (results, status) => {
      if (status === 'OK') {
        const location = results[0].geometry.location;
        mapRef.current.setCenter(location);

        // Fetch boundary data for the searched city
        const cityBoundary = await fetchCityBoundary(searchQuery);
        if (cityBoundary) {
          displayCityBoundary(cityBoundary);
        }

        // Optionally, search for nearby hospitals or places here
        searchNearbyHospitals(location);
      } else {
        console.error(`Geocoding failed with status: ${status}`);
        alert('Location not found.');
      }
    });
  },[searchNearbyHospitals, searchQuery]);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyCIur_CuwGeaZRCho1sYuB4RFN391qEEKk',
      version: 'weekly',
      libraries: ['places', 'geometry'],
    });
  
    loader.load().then((google) => {
      googleRef.current = google;
  
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.7749, lng: -122.4194 }, // Default: SF
        zoom: 13,
        mapId: '6c1889787779912c',
      });
  
      mapRef.current = map;
  
      // On map click
      map.addListener('click', async (e) => {
        const clickedLocation = e.latLng;
        map.setCenter(clickedLocation);
  
        const lat = clickedLocation.lat();
        const lng = clickedLocation.lng();
  
        // Fetch boundary by coordinates
        const boundary = await fetchCityBoundaryByCoords(lat, lng);
        if (boundary) {
          displayCityBoundary(boundary);
        }
  
        // show hospitals
        searchNearbyHospitals(clickedLocation);
      });
    });
  }, [searchNearbyHospitals]); // 🧼 Removed handleSearch from deps
  
  const fetchCityBoundary = async (cityName) => {
    const apiKey = 'fb316171aa834bdd9403da61821e36b0';
  
    try {
      // Step 1: Get coordinates
      const geocodeUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(cityName)}&limit=1&apiKey=${apiKey}`;
      const geoRes = await fetch(geocodeUrl);
      const geoData = await geoRes.json();
  
      if (!geoData.features || geoData.features.length === 0) {
        console.error('City not found:', cityName);
        return null;
      }
  
      const { lat, lon } = geoData.features[0].properties;
  
      // Step 2: Get boundaries
      const boundaryUrl = `https://api.geoapify.com/v1/boundaries/part-of?lat=${lat}&lon=${lon}&geometry=geometry_1000&apiKey=${apiKey}`;
      const boundaryRes = await fetch(boundaryUrl);
      const boundaryData = await boundaryRes.json();
  
      if (boundaryData.features && boundaryData.features.length > 0) {
        console.log("All boundaries found:");
        boundaryData.features.forEach(f => {
          console.log(`${f.properties.name} – ${f.properties.result_type}`);
        });
  
        const cityBoundary = boundaryData.features.find(f =>
          (f.properties.result_type && ['city', 'municipality', 'locality'].includes(f.properties.result_type)) ||
          (f.properties.name && f.properties.name.toLowerCase() === cityName.toLowerCase())
        );
  
        if (cityBoundary) {
          console.log("Found boundary for:", cityBoundary.properties.name);
          return cityBoundary;
        } else {
          console.warn('No matching city boundary found by type or name.');
          return null;
        }
      } else {
        console.error('No boundary data found.');
        return null;
      }
  
    } catch (error) {
      console.error('Error fetching boundary:', error);
      return null;
    }
  };

  const displayCityBoundary = (boundaryData) => {
    if (!boundaryData || !boundaryData.geometry || !boundaryData.geometry.coordinates) {
      console.error("Invalid boundary data");
      return;
    }
  
    // Clear previous polygons
    drawnPolygonsRef.current.forEach((polygon) => polygon.setMap(null));
    drawnPolygonsRef.current = [];
  
    const geometryType = boundaryData.geometry.type;
    const coordinates = boundaryData.geometry.coordinates;
    const bounds = new googleRef.current.maps.LatLngBounds();
  
    const createPolygon = (path) => {
      const polygon = new googleRef.current.maps.Polygon({
        paths: path,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.2,
      });
  
      polygon.setMap(mapRef.current);
      drawnPolygonsRef.current.push(polygon);
    };
  
    if (geometryType === "Polygon") {
      const paths = coordinates[0].map(([lng, lat]) => {
        const point = new googleRef.current.maps.LatLng(lat, lng);
        bounds.extend(point);
        return point;
      });
      createPolygon(paths);
    }
  
    else if (geometryType === "MultiPolygon") {
      coordinates.forEach((polygonCoords) => {
        const outerRing = polygonCoords[0];
        const path = outerRing.map(([lng, lat]) => {
          const point = new googleRef.current.maps.LatLng(lat, lng);
          bounds.extend(point);
          return point;
        });
        createPolygon(path);
      });
    }
  
    else {
      console.warn("Unsupported geometry type:", geometryType);
      return;
    }
  
    mapRef.current.fitBounds(bounds);
  };

  const fetchCityBoundaryByCoords = async (lat, lon) => {
    const apiKey = 'fb316171aa834bdd9403da61821e36b0';
  
    try {
      const boundaryUrl = `https://api.geoapify.com/v1/boundaries/part-of?lat=${lat}&lon=${lon}&geometry=geometry_1000&apiKey=${apiKey}`;
      const boundaryRes = await fetch(boundaryUrl);
      const boundaryData = await boundaryRes.json();
  
      if (!boundaryData.features || boundaryData.features.length === 0) {
        console.error('No boundary data found at location:', lat, lon);
        return null;
      }
  
      const possibleTypes = ['city', 'municipality', 'locality'];
      const cityBoundary = boundaryData.features.find(f =>
        (f.properties.result_type && possibleTypes.includes(f.properties.result_type)) ||
        (f.properties.name)
      );
  
      if (cityBoundary) {
        console.log("Boundary found for:", cityBoundary.properties.name);
        return cityBoundary;
      } else {
        console.warn('No matching city-level boundary found.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching boundary by coords:', error);
      return null;
    }
  };

  const handleCardClick = (placeId) => {
    setSelectedPlaceId(placeId); // highlight card
  
    const marker = markerMapRef.current[placeId];
    if (marker) {
      const map = mapRef.current;
      if (currentInfoWindowRef.current) {
        currentInfoWindowRef.current.close();
        currentInfoWindowRef.current = null;
      }

      Object.values(markerMapRef.current).forEach((m) => m.setAnimation(null));
      map.panTo(marker.getPosition());
      // map.setZoom(10); // Adjust zoom level as needed

      marker.setAnimation(googleRef.current.maps.Animation.BOUNCE);
      setTimeout(() => marker.setAnimation(null), 1200);
  
      const infowindow = new googleRef.current.maps.InfoWindow({
        content: `<div><strong>${marker.getTitle()}</strong></div>`,
      });
  
      infowindow.open(map, marker);
      currentInfoWindowRef.current = infowindow;
    }
  };  

  return (
    <>
        <h1>{"Welcome to Listings Page"}</h1>
        <div style={{ padding: '10px', display: 'flex', gap: '10px' }}>
            <input
            type="text"
            value={searchQuery}
            placeholder="Enter a location"
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, padding: '8px' }}
            />
            <button onClick={handleSearch} style={{ padding: '8px 12px' }}>
            Search
            </button>
        </div>

        <div className="row" style={{ height: '100vh', overflow: 'hidden' }}>
          {/* Map section (fixed) */}
          <div id="map" className="col-md-8 p-0" style={{ height: '100%', position: 'relative' }}></div>

          {/* List section (scrollable) */}
          <div className="col-md-4" style={{ height: '100%', overflowY: 'auto', padding: '1rem' }}>
            <h4>Real Estate & Homes For Sale</h4>
            <p>{places.length} results</p>
            {places.length > 0 ? (
              places.map((place, idx) => (
                <PlaceCard
                  key={idx}
                  ref={placeRefs.current[place.place_id]}
                  place={place}
                  highlighted={selectedPlaceId === place.place_id}
                  onClick={() => handleCardClick(place.place_id)}
                />
              ))
            ) : (
              <p>No places found.</p>
            )}
          </div>
        </div>
    </>
  );
};

export default Listings;