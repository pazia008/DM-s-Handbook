import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AdventureNotesContext } from "../../providers/AdventureNotesProvider";
import { CampaignsContext } from "../../providers/CampaignsProvider";





const AdventureEditForm = () => {
    const history = useHistory();
    const { adventureNoteId } = useParams();
    const { updateAdventureNote, getAdventureNoteById } = useContext(AdventureNotesContext);
    const { getAllCampaigns, campaigns } = useContext(CampaignsContext);
    const [isLoading, setIsLoading] = useState(false);
    const [adventureNote, setAdventureNote] = useState({
        userId: 0,
        campaignId: 0,
        synopsis: "",
        dateCreated: "",
    });

    useEffect(() => {
        getAdventureNoteById(adventureNoteId)
            .then(resp => setAdventureNote(resp))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getAllCampaigns();
    }, []);

    // Handles updating the state of Player
    const handleInput = (e) => {
        const newAdventureNote = { ...adventureNote };
        newAdventureNote[e.target.id] = e.target.value;
        setAdventureNote(newAdventureNote);
    }

    const handleSave = () => {

        // Disables the update button until finished
        setIsLoading(true)

        // Update the existing player in the database
        updateAdventureNote({
            id: adventureNote.id,
            campaignId: adventureNote.campaignId,
            synopsis: adventureNote.synopsis,
            dateCreated: adventureNote.dateCreated,

        })
            .then(() => history.push(`/adventureNotes`));
    }

    return (
        <>

            <form className="adventureForm">
                <h2 className="adventureForm-title">Update your Adventure!</h2>

                {/* Campaign */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="campaignId">Campaign: </label>
                        <select id="campaignId" className="form-control" value={adventureNote.campaignId} onChange={handleInput}>
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
                        <label htmlFor="synopsis">Synopsis: </label>
                        <input type="text" id="synopsis" onChange={handleInput} required autoFocus className="form-control" placeholder="synopsis" value={adventureNote.synopsis} />
                    </div>
                </fieldset>

                {/*  Date */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="dateCreated">Date Created: </label>
                        <input type="date" id="dateCreated" onChange={handleInput} required autoFocus className="form-control" placeholder="Date Created" value={adventureNote.dateCreated} />
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
                    Update Adventure
                </button>
            </form>
        </>
    );
};

export default AdventureEditForm;