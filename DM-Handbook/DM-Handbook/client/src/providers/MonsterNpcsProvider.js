import React, { useState, createContext, useContext } from "react";
import { UserProfilesContext } from "./UserProfilesProvider";
import "firebase/auth";

export const MonsterNpcsContext = createContext();

export function MonsterNpcsProvider(props) {
    const [monsters, setMonsters] = useState([]);
    const { getToken } = useContext(UserProfilesContext);
    const apiUrl = "/api/monsterNpcs";

    const getAllMonsters = () => {
        return getToken()
            .then(token => fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then(res => res.json())
            .then(setMonsters)
    };


    return (
        <MonsterNpcsContext.Provider value={{ monsters, setMonsters, getAllMonsters }}>
            {props.children}
        </MonsterNpcsContext.Provider>
    );
};