import React, { useEffect, useState } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const MapContainer = () => {
    const [points, setPoints] = useState([]);
    const [polygons, setPolygons] = useState([]);
    const [selectedFeature, setSelectedFeature] = useState(null);

    // useEffect(() => {  
    //     // Fetch Point Data  
    //     axios.get('/points.json').then((response) => setPoints(response.data));  
      
    //     // Fetch Polygon Data  
    //     axios.get('/polygons.json').then((response) => setPolygons(response.data));  
    //   }, []);  

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch both points and polygons in parallel
          const [pointsResponse, polygonsResponse] = await Promise.all([
            axios.get('/points.json'),
            axios.get('/api/polygons/all'),
          ]);
    
          // Set the data
          setPoints(pointsResponse.data);
          setPolygons(polygonsResponse.data);
    
          console.log('Points Data:', pointsResponse.data);
          console.log('Polygons Data:', polygonsResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, []);
    

    const handleMarkerClick = (point) => {
        setSelectedFeature(point);
    };

    const handlePolygonClick = (polygon) => {
        setSelectedFeature(polygon);
    };

    return (
        <div>
            <LeafletMap center={[51.505, -0.09]} zoom={13} style={{ height: '800px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                />
                {points.map((point) => (
                    <Marker
                        key={point.id}
                        position={[point.lat, point.lng]}
                        eventHandlers={{ click: () => handleMarkerClick(point) }}
                    >
                        <Popup>{point.name}</Popup>
                    </Marker>
                ))}
                {polygons.map((polygon) => (
                    <Polygon
                        key={polygon.id}
                        positions={polygon.coordinates}
                        eventHandlers={{ click: () => handlePolygonClick(polygon) }}
                    />
                ))}
            </LeafletMap>
            {selectedFeature && (
                <div className="feature-info">
                    { <h3>Feature Info</h3> }           
                    { <pre>{JSON.stringify(selectedFeature, null, 2)}</pre> }
                </div>
            )}
        </div>
    );
};

export default MapContainer;  
