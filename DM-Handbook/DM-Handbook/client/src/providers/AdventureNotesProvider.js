import React, { useState, createContext, useContext } from "react";
import { UserProfilesContext } from "./UserProfilesProvider";
import "firebase/auth";

export const AdventureNotesContext = createContext();

export function AdventureNotesProvider(props) {
    const [adventureNotes, setAdventureNotes] = useState([]);
    const { getToken } = useContext(UserProfilesContext);
    const apiUrl = "/api/adventureNotes";

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


    const saveAdventureNote = (adventureNote) => {
        return getToken()
            .then(token => fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(adventureNote),
            }))
            .then(resp => resp.json())
    };


    return (
        <AdventureNotesContext.Provider value={{ adventureNotes, getAllAdventureNotes, saveAdventureNote }}>
            {props.children}
        </AdventureNotesContext.Provider>
    );
};