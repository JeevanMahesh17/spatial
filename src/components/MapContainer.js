import React, { useEffect, useState } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const MapContainer = () => {
    const [points, setPoints] = useState([]);
    const [polygons, setPolygons] = useState([]);
    const [selectedFeature, setSelectedFeature] = useState(null);

    useEffect(() => {
        // Fetch Point Data  
        axios.get('/points.json')
            .then((response) => setPoints(response.data))
            .catch((error) => console.error('Error fetching points data:', error));

        // Fetch Polygon Data  
        axios.get('/api/polygons/all')
            .then(response => setPolygons(response.data))
            .catch(error => console.error('Error fetching polygons data:', error));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pointsResponse, polygonsResponse] = await Promise.all([
                    axios.get('http://localhost:5000/points.json'),
                    axios.get('http://localhost:5000    /api/polygons/all'),
                ]);
                setPoints(pointsResponse.data);
                setPolygons(polygonsResponse.data || []);
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
            <LeafletMap center={[51.505, -0.09]} zoom={11} style={{ height: '800px', width: '100%' }}>
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
                        positions={polygon.geometry.coordinates.map(coord => [coord[1], coord[0]])} // In Leaflet, coordinates are [latitude, longitude]
                        eventHandlers={{ click: () => handlePolygonClick(polygon) }}
                    />
                ))}
            </LeafletMap>
            {selectedFeature && (
                <div className="feature-info">
                    <h3>Feature Info</h3>
                    <pre>{JSON.stringify(selectedFeature, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default MapContainer;



