import { useEffect, useState } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../contexts/CitiesProvider";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import Message from "./Message";
import { useNavigate } from "react-router-dom";

function Form() {
    const { convertToEmoji, addCity, isLoading } = useCities();
    const [lat, lng] = useUrlPosition();
    const navigate = useNavigate();
    const [isLoadingGeo, setIsLoadingGeo] = useState(false);
    const [geocodeError, setGeocodeError] = useState("");
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [emoji, setEmoji] = useState("");

    const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

    useEffect(() => {
        if (!lat && !lng) {
            setGeocodeError("Please, start by clicking somewhere on the map 😉");
            return;
        }
        async function fetchCityInfo() {
            try {
                setIsLoadingGeo(true);
                setGeocodeError("");
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                const data = await res.json();
                console.log('data:', data);
                if (!data.countryCode) {
                    throw new Error("Seams that this place isn't a city. Please, click on somewhere else 😉");
                }
                setCityName(data.city || data.locality || "");
                setCountry(data.countryName || "");
                setEmoji(convertToEmoji(data.countryCode));
            } catch (err) {
                setGeocodeError(err.message);
            } finally {
                setIsLoadingGeo(false);
            }
        }
        fetchCityInfo();

    }, [lat, lng]);

    async function handleSubmit(ev) {
        ev.preventDefault();
        if (!cityName || !date) {
            return;
        }

        const newVisitedCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: { lat, lng }
        }

        await addCity(newVisitedCity);
        navigate("/app/cities");
    }

    if (isLoadingGeo) return <Spinner />;
    if (geocodeError) return <Message message={geocodeError} />

    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                {/* <input
                    id="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                /> */}
                <DatePicker id="date" selected={date} onChange={(date) => setDate(date)} dateFormat="dd/MM/yyy" />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type='primary'>
                    Add
                </Button>
                <BackButton />
            </div>
        </form>
    );
}

export default Form;
