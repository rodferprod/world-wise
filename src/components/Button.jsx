import styles from './Button.module.css';
import PropTypes from 'prop-types';

Button.propTypes = {
    children: PropTypes.element,
    handleClick: PropTypes.func,
    type: PropTypes.string
}

function Button({ children, handleClick, type }) {
    return (
        <button onClick={handleClick} className={`${styles.btn} ${styles[type]}`}>
            {children}
        </button>
    )
}

export default Button;
