import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useCities } from "../contexts/CitiesProvider";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import styles from './Map.module.css'
import Button from "./Button";

function Map() {
    const { cities } = useCities();
    const { isLoading, position, getPosition } = useGeolocation();

    const [mapPosition, setMapPosition] = useState([40, 0]);

    const [lat, lng] = useUrlPosition();

    useEffect(() => {
        if (lat && lng) setMapPosition([lat, lng]);
    }, [lat, lng]);

    useEffect(() => {
        if (position) setMapPosition([position.lat, position.lng]);
    }, [position]);

    return (
        <div className={styles.mapContainer}>
            <Button type='position' handleClick={getPosition}>
                {isLoading ? "Loading..." : "Use your position"}
            </Button>
            <MapContainer
                className={styles.map}
                center={mapPosition}
                zoom={10}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) =>
                    <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                        <Popup>
                            <span>{city.emoji}</span> <span>{city.cityName}</span>
                            <p>{city.notes}</p>
                        </Popup>
                    </Marker>
                )}
                <ChangeMapPosition position={mapPosition} />
                <DetectClickedPosition />
            </MapContainer>
        </div>
    )
}

ChangeMapPosition.propTypes = {
    position: PropTypes.array
}

function ChangeMapPosition({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClickedPosition() {
    const navigate = useNavigate();

    useMapEvents({
        click: (ev) => {
            console.log(ev);
            navigate(`form?lat=${ev.latlng.lat}&lng=${ev.latlng.lng}`);
        },
    })
}

export default Map
