import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { MonsterNpcsContext } from "../../providers/MonsterNpcsProvider";
import { AdventureMonsterContext } from "../../providers/AdventureMonsterAndNpcProvider";


export const AdventureMonsterForm = () => {
    const { addAdventureMonsters, adventureMonsters } = useContext(AdventureMonsterContext);
    const { getAllMonsters, monsters, getMonstersByAdventureId } = useContext(MonsterNpcsContext);

    const history = useHistory();
    const { adventureNoteId } = useParams();

    useEffect(() => {
        getAllMonsters()
            .then(() => {
                getMonstersByAdventureId(adventureNoteId)
            })
    }, []);

    const handleControlledInputChange = (event) => {


        var checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let arrayOfMonsters = Array.from(checkedBoxes).map(c => c.defaultValue);

        let monsterIds = arrayOfMonsters.map(m => {
            return parseInt(m)
        })


        addAdventureMonsters(monsterIds, parseInt(adventureNoteId))
            .then(() => {
                monsters.map(m => {
                    return m.checked = false
                })
            })
            .then(() => {
                history.go(0);
            });

    };


    return (
        <Form className="container col-md-6">
            <h2>Add monsters and npcs to your adventure!</h2>

            {
                monsters.map(m => {

                    adventureMonsters.find(am => {
                        if (am.monsterNpcId === am.id) {
                            return m.checked = true
                        }
                    })

                    if (m.checked) {
                        return <FormGroup key={m.id} check>
                            <Label check>
                                <Input type="checkbox" id={m.id} value={m.id} defaultChecked /> {m.name}
                            </Label>
                        </FormGroup>
                    } else {
                        return <FormGroup key={m.id} check>
                            <Label check>
                                <Input type="checkbox" id={m.id} value={m.id} /> {m.name}
                            </Label>
                        </FormGroup>
                    }
                })
            }
            <Button
                onClick={
                    event => {
                        event.preventDefault() // Prevent browser from submitting the form and refreshing the page
                        handleControlledInputChange()
                    }}>Save</Button>
            <Button
                onClick={
                    event => {
                        event.preventDefault()
                    }}>Cancel</Button>
        </Form>
    );
};

export default AdventureMonsterForm;