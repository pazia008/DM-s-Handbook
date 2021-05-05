import React, { useState, createContext, useContext } from "react";
import { UserProfilesContext } from "./UserProfilesProvider";
import "firebase/auth";

export const PlayersContext = createContext();

export function PlayersProvider(props) {
    const [players, setPlayers] = useState([]);
    const { getToken } = useContext(UserProfilesContext);
    const apiUrl = "/api/players";

    const getAllPlayers = () => {
        return getToken()
            .then(token => fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then(res => res.json())
            .then(setPlayers)
    };





    return (
        <PlayersContext.Provider value={{ players, getAllPlayers, setPlayers }}>
            {props.children}
        </PlayersContext.Provider>
    );
};