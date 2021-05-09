import React, { useState, createContext, useContext } from "react";
import { UserProfilesContext } from "./UserProfilesProvider";
import "firebase/auth";

export const MonsterNpcsContext = createContext();

export function MonsterNpcsProvider(props) {
    const [monsters, setMonsters] = useState([]);
    const [monstersOnAdventure, setMonstersOnAdventure] = useState([]);
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


    const getMonsterById = (monsterId) => {
        return getToken()
            .then(token => fetch(`${apiUrl}/${monsterId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then(res => res.json())
    };


    const saveMonster = (monster) => {
        return getToken()
            .then(token => fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(monster),
            }))
            .then(resp => resp.json())
    };


    const deleteMonster = monster => {
        return getToken()
            .then(token => fetch(`${apiUrl}/${monster.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then(getAllMonsters)

    };


    const updateMonster = (monster) => {
        return getToken()
            .then(token => fetch(`${apiUrl}/${monster.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(monster),
            }))
    };


    const getMonstersByAdventureId = (adventureNoteId) => {
        return getToken().then((token) =>
            fetch(`/api/monsterNpcs/getMonsterByAdventureId/${adventureNoteId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then(setMonsters)
        );
    };



    return (
        <MonsterNpcsContext.Provider value={{ monsters, setMonsters, getAllMonsters, getMonsterById, saveMonster, deleteMonster, updateMonster, getMonstersByAdventureId, monstersOnAdventure }}>
            {props.children}
        </MonsterNpcsContext.Provider>
    );
};