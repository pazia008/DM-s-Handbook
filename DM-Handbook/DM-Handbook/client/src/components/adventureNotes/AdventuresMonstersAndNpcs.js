import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CardHeader } from "reactstrap";
import { AdventureNotesContext } from "../../providers/AdventureNotesProvider";
import { MonsterNpcsContext } from "../../providers/MonsterNpcsProvider";
import Monster from "../monstersAndNpcs/Monster";
import AdventureNote from "./AdventureNotes";


const AdventureMonstersAndNpcs = () => {
    const [adventure, setAdventure] = useState({
        // userProfile: {},
    });

    const { getAdventureNoteById } = useContext(AdventureNotesContext);
    const { getMonstersByAdventureId, monstersOnAdventure } = useContext(MonsterNpcsContext);
    const { id } = useParams();

    // useEffect(() => {
    //     getAdventureNoteById(id).then((response) => {
    //         setAdventure(response);
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    const manageMonsters = (adventure) => {
        let currentUser = JSON.parse(sessionStorage.getItem("userProfile"));
        console.log(adventure.userProfile)
        console.log(currentUser)
        console.log(adventure)
        if (adventure.userProfileId === currentUser.id) {

            return (
                <Link to={`/adventuretMonsters/${id}`} className="nav-link">
                    Manage Monsters and Npcs
                </Link>
            );
        }
    };

    useEffect(() => {
        getMonstersByAdventureId(id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!adventure) {
        return null;
    }

    return (
        <div className="container">
            {manageMonsters(adventure)}
            <div className="row justify-content-center">
                <div className="col-sm-12 col-lg-6">
                    {monstersOnAdventure.map((m) => (
                        <Monster key={m.id} monsterNpc={m} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdventureMonstersAndNpcs;