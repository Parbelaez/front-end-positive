import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useNavigate } from "react-router-dom";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
    console.log("Current user provider");
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    //console log the current user provider - is it changing?
    console.log("Current user provider");

    const handleMount = async () => {
        console.log("handle mount");
        try {
            const { data } = await axiosRes.get("dj-rest-auth/user/");
            console.log("Context data", data);
            setCurrentUser(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleMount();
    }, []);

    useMemo(() => {
        axiosReq.interceptors.request.use(
            console.log("axiosReq interceptors"),
            async (config) => {
                if (shouldRefreshToken()) {
                    try {
                        await axios.post("/dj-rest-auth/token/refresh/");
                    } catch (error) {
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                navigate("/login");
                            }
                            return null;
                        });
                        removeTokenTimestamp();
                        return config;
                    }
                }
                return config;
            },
            (error) => {
                Promise.reject(error);
            }
        );

        axiosRes.interceptors.response.use(
            console.log("axiosRes interceptors"),
            (response) => response,
            async (error) => {
                if (error.response?.status === 401) {
                    try {
                        await axios.post("/dj-rest-auth/token/refresh/");
                    } catch (error) {
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                navigate("/login");
                            }
                            return null;
                        });
                        removeTokenTimestamp();
                    }
                    return axiosRes(error.config);
                }
                return Promise.reject(error);
            }
        );
    }, [navigate]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    );
};
