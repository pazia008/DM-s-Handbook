import React, { useContext, useState, useEffect } from "react";
import { FormGroup, Label } from "reactstrap";
import { useHistory } from "react-router-dom";
import { CampaignsContext } from "../../providers/CampaignsProvider";
import { PlayersContext } from "../../providers/PlayersProvider";

const PlayerFormAdd = () => {
    const history = useHistory();
    const { savePlayer, getAllPlayers } = useContext(PlayersContext);
    const { getAllCampaigns, campaigns } = useContext(CampaignsContext);
    const [isLoading, setIsLoading] = useState(false);

    //sets the state for how it will appear in the api
    const [player, setPlayer] = useState({
        userId: 0,
        campaignId: 0,
        name: "",
        race: "",
        howTheyPlay: "",
        dateCreated: "",

    });



    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
            always create a copy, make changes, and then set state.*/
        const newPlayer = { ...player };

        /* 
            Set the property to the new value using object bracket notation. */
        newPlayer[event.target.id] = event.target.value;
        // update state
        setPlayer(newPlayer);
    };

    //gets all of the players
    useEffect(() => {
        getAllPlayers();
    }, []);

    //gets all of the campaigns
    useEffect(() => {
        getAllCampaigns();
    }, []);

    const handleClickSavePlayer = () => {

        //adds to the database 
        const campaignId = parseInt(player.campaignId);
        const name = player.name;
        const race = player.race;
        const howTheyPlay = player.howTheyPlay;
        const dateCreated = player.dateCreated;

        //pop-up windows if a users leaves info blank
        if (name === "") {
            window.alert("Make sure to write their name!");
        } else if (dateCreated === "") {
            window.alert("Make sure you enter the date!");
        } else if (race === "") {
            window.alert("Make sure you enter a Race!");
        } else if (howTheyPlay === "") {
            window.alert("Make sure you describe your player!");
        } else if (campaignId === 0 || campaignId === NaN) {
            window.alert("Please select a campaign");
        } else {
            //disable the button - no extra clicks
            setIsLoading(true); //this ensures the user cannot repeatedly click the button while the API is being updated


            savePlayer({
                //if not, this must be a new note so the input fields will be empty

                campaignId: player.campaignId,
                name: player.name,
                race: player.race,
                howTheyPlay: player.howTheyPlay,
                dateCreated: player.dateCreated,
            })
                //pushes to the list of players
                .then(() => history.push("/players"));
        }
    };

    //the form users will fill out
    return (
        <>
            <form className="Form">
                <h2 className="Form__title">Add New Player</h2>

                <FormGroup>
                    <select id="campaignId" onChange={handleControlledInputChange}>
                        <option value="0">Select A Campaign</option>
                        {campaigns.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </FormGroup>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="synopsis">Name: </label>
                        <input
                            type="text"
                            id="name"
                            onChange={handleControlledInputChange}
                            required
                            autoFocus
                            className="form-control"
                            placeholder="Name"
                            value={player.name}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="race">Race: </label>
                        <input
                            type="text"
                            id="race"
                            onChange={handleControlledInputChange}
                            required
                            autoFocus
                            className="form-control"
                            placeholder="Race"
                            value={player.race}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="howTheyPlay">How do they play: </label>
                        <input
                            type="text"
                            id="howTheyPlay"
                            onChange={handleControlledInputChange}
                            required
                            autoFocus
                            className="form-control"
                            placeholder="What are their characters like?"
                            value={player.howTheyPlay}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="dateCreated">Date Created: </label>
                        <input
                            type="date"
                            id="dateCreated"
                            onChange={handleControlledInputChange}
                            required
                            autoFocus
                            className="form-control"
                            placeholder="Date Created"
                            value={player.dateCreated}
                        />
                    </div>
                </fieldset>

                <button
                    className="btn btn-primary"
                    disabled={isLoading}
                    onClick={(event) => {
                        event.preventDefault();
                        handleClickSavePlayer();
                    }}
                >
                    Add Player
        </button>
            </form>
        </>
    );


}

export default PlayerFormAdd;