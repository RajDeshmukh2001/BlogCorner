import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || '');

    const login = async (inputs) => {
        const res = await axios.post(`${process.env.REACT_APP_DOMAIN}/auth/login`, inputs);
        setCurrentUser(res.data);
    };

    const logout = async (inputs) => {
        await axios.post(`${process.env.REACT_APP_DOMAIN}/auth/logout`);
        setCurrentUser('');
    };

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};