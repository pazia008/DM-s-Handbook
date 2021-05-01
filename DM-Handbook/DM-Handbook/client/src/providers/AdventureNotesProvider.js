import React, { useState, createContext, useContext } from "react";
import { UserProfilesContext } from "./UserProfilesProvider";
import "firebase/auth";

export const AdventureNotesContext = createContext();

export function AdventureNotesProvider(props) {
    const [adventureNotes, setAdventureNotes] = useState([]);
    const { getToken } = useContext(UserProfilesContext);
    const apiUrl = "/api/adventureNote";

    const getAllAdventureNotes = () => {
        return getToken()
            .then(token => fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then(res => res.json())
            .then(setAdventureNotes)
    };

    return (
        <AdventureNotesContext.Provider value={{ adventureNotes, getAllAdventureNotes }}>
            {props.children}
        </AdventureNotesContext.Provider>
    );
};