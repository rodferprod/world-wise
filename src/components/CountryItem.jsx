import styles from "./CountryItem.module.css";
import PropTypes from 'prop-types';

CountryItem.propTypes = {
    country: PropTypes.object,
    currentCity: PropTypes.object
}

function CountryItem({ country, currentCity }) {

    return (
        <li className={`${styles.countryItem} ${currentCity.country === country.country ? styles['countryItem--active'] : ''}`}>
            <span>{country.emoji}</span>
            <span>{country.country}</span>
        </li>
    );
}

export default CountryItem;
