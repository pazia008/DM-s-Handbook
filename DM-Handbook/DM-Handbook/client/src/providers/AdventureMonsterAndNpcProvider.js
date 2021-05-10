import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import "firebase/auth";
export const AdventureMonsterContext = createContext();

export const AdventureMonsterProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [adventureMonsters, setAdventureMonsters] = useState([]);

    const addAdventureMonsters = (adventureMonster) => {
        return getToken().then((token) => {
            return fetch("/api/adventureMonsters", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(adventureMonster), //this stringifies our post object meaning it changes our object into string object
            });
        });
    };

    return (
        <AdventureMonsterContext.Provider
            value={{ addAdventureMonsters, adventureMonsters, setAdventureMonsters }}
        >
            {props.children}
        </AdventureMonsterContext.Provider>
    );
};