import PropTypes from 'prop-types';
import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';

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

    return (
        <li>
            <Link className={styles.cityItem} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h2 className={styles.name}>{cityName}</h2>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem
