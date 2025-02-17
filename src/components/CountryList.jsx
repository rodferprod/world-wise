import { useCities } from "../contexts/CitiesProvider";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

export default function CountryList() {

    const { isLoading, cities } = useCities();

    if (isLoading) return <Spinner />;

    if (!cities.length) {
        return <Message message="Add your first travel by clicking on the map" />
    }

    const countries = cities.reduce((accumulator, currentCity) => {
        // If the accumulator array don't have an item with the current country
        if (!accumulator.map((elem) => elem.country).includes(currentCity.country)) {
            // ... then we'll return all itens accumulated plus the new one
            return [...accumulator, { country: currentCity.country, emoji: currentCity.emoji }]
        } else {
            // ... if it's already exists we'll return just the accumulated itens until now 
            return accumulator;
        }

    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => <CountryItem key={country.country} country={country} />)}
        </ul>
    )
}