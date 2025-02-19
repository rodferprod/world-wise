import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthProvider";
import { useEffect } from "react";
import PropTypes from 'prop-types';

ProtectRoutes.propTypes = {
    children: PropTypes.element
}

function ProtectRoutes({ children }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null;
}

export default ProtectRoutes
