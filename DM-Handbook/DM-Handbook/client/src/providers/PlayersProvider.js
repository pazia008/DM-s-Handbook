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


    const getPlayerById = (playerId) => {
        return getToken()
            .then(token => fetch(`${apiUrl}/${playerId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then(res => res.json())
    };


    const savePlayer = (player) => {
        return getToken()
            .then(token => fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(player),
            }))
            .then(resp => resp.json())
    };



    return (
        <PlayersContext.Provider value={{ players, getAllPlayers, setPlayers, getPlayerById, savePlayer }}>
            {props.children}
        </PlayersContext.Provider>
    );
};