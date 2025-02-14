import PropTypes from 'prop-types';
import styles from './CityItem.module.css';

CityItem.propTypes = {
    city: PropTypes.func,
    formatDate: PropTypes.func
}

function CityItem({ city, formatDate }) {
    const {
        cityName,
        emoji,
        date,
        //notes
    } = city;

    return (
        <li className={styles.cityItem}>
            <span className={styles.emoji}>{emoji}</span>
            <h2 className={styles.name}>{cityName}</h2>
            <time className={styles.date}>{formatDate(date)}</time>
            <button className={styles.deleteBtn}>&times;</button>
        </li>
    )
}

export default CityItem
