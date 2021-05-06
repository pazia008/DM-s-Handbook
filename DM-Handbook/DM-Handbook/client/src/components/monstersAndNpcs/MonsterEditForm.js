import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { MonsterNpcsContext } from "../../providers/MonsterNpcsProvider";
import { MonsterOrNpcTypesContext } from "../../providers/MonsterOrNpcTypeProvider";





const MonsterEditForm = () => {
    const history = useHistory();
    const { monsterId } = useParams();
    const { updateMonster, getMonsterById } = useContext(MonsterNpcsContext);
    const { getAllMonsterTypes, monsterTypes } = useContext(MonsterOrNpcTypesContext);
    const [isLoading, setIsLoading] = useState(false);
    const [monster, setMonster] = useState({
        userId: 0,
        monsterOrNpcTypeId: 0,
        name: "",
        synopsis: "",
        abilities: "",
        dateCreated: "",
    });

    useEffect(() => {
        getMonsterById(monsterId)
            .then(resp => setMonster(resp))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getAllMonsterTypes();
    }, []);

    // Handles updating the state of monster or npc
    const handleInput = (e) => {
        const newMonster = { ...monster };
        newMonster[e.target.id] = e.target.value;
        setMonster(newMonster);
    }

    const handleSave = () => {

        // Disables the update button until finished
        setIsLoading(true)

        // Update the existing monster or npc in the database
        updateMonster({
            id: monster.id,
            monsterOrNpcTypeId: monster.monsterOrNpcTypeId,
            name: monster.name,
            synopsis: monster.synopsis,
            abilities: monster.abilities,
            dateCreated: monster.dateCreated,

        })
            .then(() => history.push(`/monsterNpcs`));
    }

    return (
        <>

            <form className="monsterForm">
                <h2 className="monsterForm-title">Update your Monster or Npc!</h2>

                <fieldset>
                    <select id="monsterOrNpcTypeId" onChange={handleInput}>
                        <option value="0">Monster Or Npc?</option>
                        {monsterTypes.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Name: </label>
                        <input
                            type="text"
                            id="name"
                            onChange={handleInput}
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
                            type="text"
                            id="synopsis"
                            onChange={handleInput}
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
                            type="text"
                            id="abilities"
                            onChange={handleInput}
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
                            type="date"
                            id="dateCreated"
                            onChange={handleInput}
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
                        handleSave();
                    }}
                >
                    Update Monster or Npc
        </button>
            </form>
        </>
    );
};

export default MonsterEditForm;