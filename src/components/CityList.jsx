import styles from "./CityList.module.css";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

CityList.propTypes = {
    isLoading: PropTypes.bool,
    cities: PropTypes.array,
    formatDate: PropTypes.func
}

export default function CityList({ isLoading, cities, formatDate }) {

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