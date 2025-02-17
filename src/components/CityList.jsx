import { useCities } from "../contexts/CitiesProvider";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

export default function CityList() {

    const { isLoading, cities, formatDate } = useCities();

    if (isLoading) return <Spinner />;

    if (!cities.length) {
        return <Message message="Add your first city by clicking on the map" />
    }

    return (
        <ul className={styles.cityList}>
            {cities.map((city) => <CityItem key={city.id} city={city} formatDate={formatDate} />)}
        </ul>
    )
}