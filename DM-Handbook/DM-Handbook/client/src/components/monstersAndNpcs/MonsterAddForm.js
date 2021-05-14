import React, { useContext, useState, useEffect } from "react";
import { FormGroup, Label } from "reactstrap";
import { useHistory } from "react-router-dom";
import { MonsterNpcsContext } from "../../providers/MonsterNpcsProvider";
import { MonsterOrNpcTypesContext } from "../../providers/MonsterOrNpcTypeProvider";


const MonsterFormAdd = () => {
    const history = useHistory();
    const { saveMonster, getAllMonsters } = useContext(MonsterNpcsContext);
    const { getAllMonsterTypes, monsterTypes } = useContext(MonsterOrNpcTypesContext);
    const [isLoading, setIsLoading] = useState(false);

    //sets the state for how it will appear in the api
    const [monster, setMonster] = useState({
        userId: 0,
        monsterOrNpcTypeId: 0,
        name: "",
        synopsis: "",
        abilities: "",
        dateCreated: "",

    });



    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
            always create a copy, make changes, and then set state.*/
        const newMonster = { ...monster };

        /* 
            Set the property to the new value using object bracket notation. */
        newMonster[event.target.id] = event.target.value;
        // update state
        setMonster(newMonster);
    };

    //gets all monsters
    useEffect(() => {
        getAllMonsters();
    }, []);

    //gets all monster types
    useEffect(() => {
        getAllMonsterTypes();
    }, []);

    const handleClickSaveMonster = () => {

        //adds to the database
        const monsterOrNpcTypeId = parseInt(monster.monsterOrNpcTypeId);
        const name = monster.name;
        const synopsis = monster.synopsis;
        const abilities = monster.abilities;
        const dateCreated = monster.dateCreated;

        //pop-up windows if a user leaves fields blank
        if (name === "") {
            window.alert("Make sure to write their name!");
        } else if (dateCreated === "") {
            window.alert("Make sure you enter the date!");
        } else if (synopsis === "") {
            window.alert("Make sure you enter their synopsis!");
        } else if (abilities === "") {
            window.alert("Make sure you mention important abilities!");
        } else if (monsterOrNpcTypeId === 0 || monsterOrNpcTypeId === NaN) {
            window.alert("Make sure to say if it is a Monster or an Npc");
        } else {
            //disable the button - no extra clicks
            setIsLoading(true); //this ensures the user cannot repeatedly click the button while the API is being updated


            saveMonster({
                //if not, this must be a new note so the input fields will be empty

                monsterOrNpcTypeId: monster.monsterOrNpcTypeId,
                name: monster.name,
                synopsis: monster.synopsis,
                abilities: monster.abilities,
                dateCreated: monster.dateCreated,
            })
                //pushes back to the list of monsters and npcs
                .then(() => history.push("/monsterNpcs"));
        }
    };


    //form users will fill out
    return (
        <>
            <form className="Form">
                <h2 className="Form__title">Add A New Monster Or Npc</h2>

                <FormGroup>
                    <select id="monsterOrNpcTypeId" onChange={handleControlledInputChange}>
                        <option value="0">Monster Or Npc?</option>
                        {monsterTypes.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                </FormGroup>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="synopsis">Name: </label>
                        <input
                            autoComplete="off"
                            type="text"
                            id="name"
                            onChange={handleControlledInputChange}
                            required
                            autoFocus
                            className="form-control"
                            placeholder="Name"
                            value={monster.name}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="synopsis">Synopsis: </label>
                        <input
                            autoComplete="off"
                            type="text"
                            id="synopsis"
                            onChange={handleControlledInputChange}
                            required
                            autoFocus
                            className="form-control"
                            placeholder="synopsis"
                            value={monster.synopsis}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="abilities">Abilities: </label>
                        <input
                            autoComplete="off"
                            type="text"
                            id="abilities"
                            onChange={handleControlledInputChange}
                            required
                            autoFocus
                            className="form-control"
                            placeholder="What cool things can they do?"
                            value={monster.abilities}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="dateCreated">Date Created: </label>
                        <input
                            autoComplete="off"
                            type="date"
                            id="dateCreated"
                            onChange={handleControlledInputChange}
                            required
                            autoFocus
                            className="form-control"
                            placeholder="Date Created"
                            value={monster.dateCreated}
                        />
                    </div>
                </fieldset>

                <button
                    className="btn btn-primary"
                    disabled={isLoading}
                    onClick={(event) => {
                        event.preventDefault();
                        handleClickSaveMonster();
                    }}
                >
                    Add Monster or Npc
        </button>
            </form>
        </>
    );


}

export default MonsterFormAdd;