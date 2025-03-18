import PropTypes from 'prop-types';
import { useContext, useEffect, createContext, useReducer, useCallback } from "react";

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

const initiaState = {
    cities: [],
    currentCity: {},
    isLoading: false,
    error: ""
}

function reducerFn(currentState, action) {
    switch (action.type) {
        case 'loading':
            return {
                ...currentState,
                isLoading: true
            };
        case 'error':
            return {
                ...currentState,
                error: action.error,
                isLoading: false
            };
        case 'cities/loaded':
            return {
                ...currentState,
                cities: action.cities,
                isLoading: false
            };
        case 'city/loaded':
            return {
                ...currentState,
                currentCity: action.currentCity,
                isLoading: false
            };
        case 'city/created':
            return {
                ...currentState,
                cities: [...currentState.cities, action.city],
                currentCity: action.city,
                isLoading: false
            };
        case 'city/deleted':
            return {
                ...currentState,
                cities: currentState.cities.filter(city => city.id !== action.cityId),
                currentCity: {},
                isLoading: false
            };

        default: throw new Error("Unknown action type");
    }
}

const CitiesContext = createContext();

function CitiesProvider({ children }) {
    //const [cities, setCities] = useState([]);
    //const [currentCity, setCurrentCity] = useState({});
    //const [isLoading, setIsLoading] = useState(false);
    const [state, dispatch] = useReducer(reducerFn, initiaState);
    const {
        cities,
        currentCity,
        isLoading,
        error
    } = state;

    useEffect(() => {
        async function getCities() {
            // setIsLoading(true);
            dispatch({ type: 'loading' });
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                //setCities(data);
                dispatch({ type: 'cities/loaded', cities: data })
            } catch (err) {
                dispatch({ type: 'error', error: "There was an error while fetching the cities:" + err.message });
            }
        }

        getCities();
    }, []);

    const getCity = useCallback(async function getCity(id) {
        if (Number(id) === currentCity.id) return;
        //setIsLoading(true);
        dispatch({ type: 'loading' });
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            //setCurrentCity(data);
            dispatch({ type: 'city/loaded', currentCity: data })
        } catch (err) {
            dispatch({ type: 'error', error: "There was an error while fetching the city:" + err.message });
        }
    }, [currentCity.id]);

    async function addCity(newCity) {
        //setIsLoading(true);
        dispatch({ type: 'loading' });
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            //setCities((cities) => [...cities, data]);
            dispatch({ type: 'city/created', city: data });
        } catch (err) {
            dispatch({ type: 'error', error: "There was an error while adding the city:" + err.message });
        }
    }

    async function deleteCity(id) {
        //setIsLoading(true);
        dispatch({ type: 'loading' });
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE"
            });
            //setCities((cities) => cities.filter(city => city.id !== id));
            dispatch({ type: 'city/deleted', cityId: id })
        } catch (err) {
            dispatch({ type: 'error', error: "There was an error while deleting the city:" + err.message });
        }
    }

    return <CitiesContext.Provider value={{
        cities,
        isLoading,
        error,
        formatDate,
        convertToEmoji,
        currentCity,
        getCity,
        addCity,
        deleteCity
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