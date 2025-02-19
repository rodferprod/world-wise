import PropTypes from 'prop-types';
import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();

AuthProvider.propTypes = {
    children: PropTypes.element
}

const initialState = {
    isAuthenticated: false,
    user: null
}

function reducerFn(currentState, action) {
    switch (action.type) {
        case 'login':
            return {
                ...currentState,
                isAuthenticated: true,
                user: action.user
            }
        case 'logout':
            return {
                ...currentState,
                isAuthenticated: false,
                user: null
            }
        default: throw new Error("Unknown action provided!")
    }
}

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducerFn, initialState);
    const { isAuthenticated, user } = state;

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: 'login', user: FAKE_USER });
        }
    }

    function logout() {
        dispatch({ type: 'logout' });
    }

    return <AuthContext.Provider value={{
        isAuthenticated,
        user,
        login,
        logout
    }}>
        {children}
    </AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error("Can't access the context outside the provider!");
    return context;
}

export { AuthProvider, useAuth }