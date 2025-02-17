import { useContext, useState, useEffect, createContext } from "react";
import PropTypes from 'prop-types';

CitiesProvider.propTypes = {
    children: PropTypes.element
}

const BASE_URL = "http://localhost:8000";

const formatDate = (date) =>
    new Intl.DateTimeFormat(
        "en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }
    ).format(new Date(date));

function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}


const CitiesContext = createContext();

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [currentCity, setCurrentCity] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }

        getCities();
    }, []);

    async function getCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    return <CitiesContext.Provider value={{
        cities,
        isLoading,
        formatDate,
        convertToEmoji,
        currentCity,
        getCity
    }}>
        {children}
    </CitiesContext.Provider>
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("Can't access the context outside the provider!");
    return context;
}

export { CitiesProvider, useCities }