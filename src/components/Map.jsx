import { useNavigate, useSearchParams } from "react-router-dom";
import styles from './Map.module.css'

function Map() {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    const changePosition = () => setSearchParams({
        lat: 49.74392874,
        lng: 102.78985735
    });

    return (
        <div className={styles.mapContainer} onClick={() => navigate("form")}>
            <h1>Map</h1>
            <h2>Position: {lat}, {lng}</h2>

            <button onClick={changePosition}>Change position</button>
        </div>
    )
}

export default Map
