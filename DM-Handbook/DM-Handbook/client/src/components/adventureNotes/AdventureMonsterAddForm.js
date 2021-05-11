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
    const [adventureMonsters, setAdventureMonsters] = useState("");
    const [availableMonsters, setAvailableMonsters] = useState([]);
    const history = useHistory();
    const { adventureNoteId } = useParams();
    const handleControlledInputChange = (event) => {
        console.log(adventureNoteId);

        addAdventureMonsters({
            adventureId: adventureNoteId,
            monsterNpcId: adventureMonsters
        }).then(() => {
            history.go(0);
        });
    };
    useEffect(() => {
        getAllMonsters()

    }, []);

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