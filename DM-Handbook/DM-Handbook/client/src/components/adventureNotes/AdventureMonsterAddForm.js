import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { MonsterNpcsContext } from "../../providers/MonsterNpcsProvider";
import { AdventureMonsterContext } from "../../providers/AdventureMonsterAndNpcProvider";
export const AdventureMonsterForm = () => {
    const { addAdventureMonsters } = useContext(AdventureMonsterContext);
    const { getAllMonsters, monsters, setMonsters, getMonstersByAdventureId, monstersOnAdventure } = useContext(
        MonsterNpcsContext
    );

    //sets the state to an empty string 
    const [adventureMonsters, setAdventureMonsters] = useState("");
    const [availableMonsters, setAvailableMonsters] = useState([]);

    const history = useHistory();

    //url parameter
    const { adventureNoteId } = useParams();

    const handleControlledInputChange = (event) => {
        //for debugging purposes to make sure I was getting the right Id
        console.log(adventureNoteId);
        //uses the add function and sets the state, then refreshes the page
        addAdventureMonsters({
            adventureId: adventureNoteId,
            monsterNpcId: adventureMonsters
        }).then(() => {
            history.go(0);
        });
    };

    //gets all the monsters
    useEffect(() => {
        getAllMonsters()

    }, []);


    //will return a dropdown so users can add monsters to a note
    return (
        <form className="adventureMonsterForm">
            <Button
                className="back_button"
                onClick={() => {
                    history.goBack();
                }}
            >
                Back
      </Button>
            <div className="form_background">
                <FormGroup>
                    <Label for="adventureMonster">Add a Monster or Npc </Label>
                    <select id="adventureMonster" onChange={(e) => setAdventureMonsters(e.target.value)}>
                        <option value="0">Select a Monster Or Npc </option>
                        {monsters.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.name}
                            </option>
                        ))}
                    </select>
                </FormGroup>
                <Button
                    variant="secondary"
                    style={{
                        color: "black",
                    }}
                    className="add_button"
                    onClick={handleControlledInputChange}
                >
                    Add Monsters or Npcs
        </Button>
            </div>
        </form>
    );
};
export default AdventureMonsterForm;