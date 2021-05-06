import React, { useState, createContext, useContext } from "react";
import { UserProfilesContext } from "./UserProfilesProvider";
import "firebase/auth";

export const MonsterOrNpcTypesContext = createContext();

export function MonsterOrNpcTypesProvider(props) {
    const [monsterTypes, setMonsterTypes] = useState([]);
    const { getToken } = useContext(UserProfilesContext);
    const apiUrl = "/api/monsterOrNpcTypes";

    const getAllMonsterTypes = () => {
        return getToken()
            .then(token => fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setMonsterTypes));
    };

    return (
        <MonsterOrNpcTypesContext.Provider value={{ monsterTypes, setMonsterTypes, getAllMonsterTypes }}>
            {props.children}
        </MonsterOrNpcTypesContext.Provider>
    );
};