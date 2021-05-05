import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CampaignsContext } from "../../providers/CampaignsProvider";
import { PlayersContext } from "../../providers/PlayersProvider";




const PlayerEditForm = () => {
    const history = useHistory();
    const { playerId } = useParams();
    const { updatePlayer, getPlayerById } = useContext(PlayersContext);
    const { getAllCampaigns, campaigns } = useContext(CampaignsContext);
    const [isLoading, setIsLoading] = useState(false);
    const [player, setPlayer] = useState({
        userId: 0,
        campaignId: 0,
        name: "",
        race: "",
        howTheyPlay: "",
        dateCreated: "",
    });

    useEffect(() => {
        getPlayerById(playerId)
            .then(resp => setPlayer(resp))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getAllCampaigns();
    }, []);

    // Handles updating the state of Player
    const handleInput = (e) => {
        const newPlayer = { ...player };
        newPlayer[e.target.id] = e.target.value;
        setPlayer(newPlayer);
    }

    const handleSave = () => {

        // Disables the update button until finished
        setIsLoading(true)

        // Update the existing player in the database
        updatePlayer({
            id: player.id,
            campaignId: player.campaignId,
            name: player.name,
            race: player.race,
            howTheyPlay: player.howTheyPlay,
            dateCreated: player.dateCreated,

        })
            .then(() => history.push(`/players`));
    }

    return (
        <>

            <form className="playerForm">
                <h2 className="playerForm-title">Update your Player!</h2>

                {/* Campaign */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="campaignId">Campaign: </label>
                        <select id="campaignId" className="form-control" value={player.campaignId} onChange={handleInput}>
                            {campaigns.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>

                {/* Name */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Name: </label>
                        <input type="text" id="name" onChange={handleInput} required autoFocus className="form-control" placeholder="name" value={player.name} />
                    </div>
                </fieldset>

                {/* Race*/}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="race">Race: </label>
                        <input type="text" id="race" onChange={handleInput} required autoFocus className="form-control"
                            placeholder="Race" value={player.race} />
                    </div>
                </fieldset>

                {/* Play */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="howTheyPlay">How Do They Play: </label>
                        <input type="text" id="howTheyPlay" onChange={handleInput} required autoFocus className="form-control" placeholder="What are their characters like?" value={player.howTheyPlay} />
                    </div>
                </fieldset>

                {/*  Date */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="dateCreated">Date Created: </label>
                        <input type="date" id="dateCreated" onChange={handleInput} required autoFocus className="form-control" placeholder="Date Created" value={player.dateCreated} />
                    </div>
                </fieldset>


                {/* Update Button */}
                <button
                    className="btn btn-primary"
                    disabled={isLoading}
                    onClick={(event) => {
                        event.preventDefault();
                        handleSave();
                    }}
                >
                    Update Player
                </button>
            </form>
        </>
    );
};

export default PlayerEditForm;