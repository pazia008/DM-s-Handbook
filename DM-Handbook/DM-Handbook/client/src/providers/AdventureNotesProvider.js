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


    const getAdventureNoteById = (adventureNoteId) => {
        return getToken()
            .then(token => fetch(`${apiUrl}/${adventureNoteId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then(res => res.json())
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


    const deleteAdventureNote = adventureNote => {
        return getToken()
            .then(token => fetch(`${apiUrl}/${adventureNote.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then(getAllAdventureNotes)

    };


    const updateAdventureNote = (adventureNote) => {
        return getToken()
            .then(token => fetch(`${apiUrl}/${adventureNote.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(adventureNote),
            }))
    };


    return (
        <AdventureNotesContext.Provider value={{ adventureNotes, getAllAdventureNotes, getAdventureNoteById, saveAdventureNote, deleteAdventureNote, updateAdventureNote }}>
            {props.children}
        </AdventureNotesContext.Provider>
    );
};