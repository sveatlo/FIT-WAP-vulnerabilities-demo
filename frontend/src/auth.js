import React, { useState, useContext, createContext } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

import config from "./config";

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

export const useProvideAuth = () => {
    let userData = window.localStorage.getItem("user");
    if (userData !== null) {
        try {
            userData = JSON.parse(userData);
        } catch (e) {
            userData = null;
            window.localStorage.removeItem("user");
        }
    }

    const [user, setUser] = useState(userData);

    const logout = () => {
        setUser(null);
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("xsrf_token");
    };

    const login = async (username, password) => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        try {
            const response = await axios({
                method: "post",
                url: `${config.BACKEND_URL}/login.php`,
                headers: { "Content-Type": "multipart/form-data" },
                data: formData,
                withCredentials: true,
            });

            setUser(response.data.user);
            window.localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );
            window.localStorage.setItem("xsrf_token", response.data.xsrf_token);
            return response.data;
        } catch (error) {
            console.error(error);

            logout();

            throw error.response ? error.response.data : error;
        }
    };

    return {
        user,
        login,
        logout,
    };
};

export const PrivateRoute = ({ children, ...rest }) => {
    let auth = useAuth();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};
