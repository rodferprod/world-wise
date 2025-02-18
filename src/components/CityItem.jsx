import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesProvider';
import styles from './CityItem.module.css';

CityItem.propTypes = {
    city: PropTypes.object,
    formatDate: PropTypes.func
}

function CityItem({ city, formatDate }) {
    const {
        id,
        cityName,
        emoji,
        date,
        position
    } = city;

    const { currentCity, deleteCity } = useCities();

    function handleDeleteCity(ev) {
        ev.preventDefault();
        deleteCity(id);
    }

    return (
        <li>
            <Link
                className={`${styles.cityItem} ${currentCity.id === city.id ? styles['cityItem--active'] : ''}`}
                to={`${id}?lat=${position.lat}&lng=${position.lng}`}
            >
                <span className={styles.emoji}>{emoji}</span>
                <h2 className={styles.name}>{cityName}</h2>
                <time className={styles.date}>{formatDate(date)}</time>
                <button onClick={handleDeleteCity} className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem
