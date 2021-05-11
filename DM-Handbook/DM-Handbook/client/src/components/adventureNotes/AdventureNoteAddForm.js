import React, { useContext, useState, useEffect } from "react";
import { FormGroup, Label } from "reactstrap";
import { useHistory } from "react-router-dom";
import { AdventureNotesContext } from "../../providers/AdventureNotesProvider";
import { CampaignsContext } from "../../providers/CampaignsProvider";

const AdventureNoteFormAdd = () => {
    const history = useHistory();
    const { saveAdventureNote, getAllAdventureNotes } = useContext(AdventureNotesContext);
    const { getAllCampaigns, campaigns } = useContext(CampaignsContext);
    const [isLoading, setIsLoading] = useState(false);

    //sets the state for how it will appear in the api
    const [adventureNote, setAdventureNote] = useState({
        userId: 0,
        campaignId: 0,
        synopsis: "",
        dateCreated: "",

    });



    //when a field changes, update state. The return will re-render and display based on the values in state
    //Controlled component
    const handleControlledInputChange = (event) => {
        /* When changing a state object or array,
            always create a copy, make changes, and then set state.*/
        const newAdventureNote = { ...adventureNote };

        /* 
            Set the property to the new value using object bracket notation. */
        newAdventureNote[event.target.id] = event.target.value;
        // update state
        setAdventureNote(newAdventureNote);
    };

    //gets all notes
    useEffect(() => {
        getAllAdventureNotes();
    }, []);

    //gets all campaigns
    useEffect(() => {
        getAllCampaigns();
    }, []);

    const handleClickSaveNote = () => {
        //for debugging purposes
        console.log(adventureNote);

        //adds to the database
        const campaignId = parseInt(adventureNote.campaignId);
        const synopsis = adventureNote.synopsis;
        const dateCreated = adventureNote.dateCreated;

        //makes pop-up windows to inform users they have fields they still need to fill out
        if (synopsis === "") {
            window.alert("Make sure to write about your adventure!");
        } else if (dateCreated === "") {
            window.alert("Make sure you enter the date!");
        } else if (campaignId === 0 || campaignId === NaN) {
            window.alert("Please select a campaign");
        } else {
            //disable the button - no extra clicks
            setIsLoading(true); //this ensures the user cannot repeatedly click the button while the API is being updated


            saveAdventureNote({
                //if not, this must be a new note so the input fields will be empty

                campaignId: adventureNote.campaignId,
                synopsis: adventureNote.synopsis,
                dateCreated: adventureNote.dateCreated,
            })
                //pushes back to the list of adventure notes
                .then(() => history.push("/adventureNotes"));
        }
    };

    //the form that users will fill out
    return (
        <>
            <form className="Form">
                <h2 className="Form__title">Add New Adventure Log</h2>

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
                        <label htmlFor="synopsis">Synopsis: </label>
                        <input
                            type="text"
                            id="synopsis"
                            onChange={handleControlledInputChange}
                            required
                            autoFocus
                            className="form-control"
                            placeholder="Synopsis"
                            value={adventureNote.synopsis}
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
                            value={adventureNote.dateCreated}
                        />
                    </div>
                </fieldset>



                <button
                    className="btn btn-primary"
                    disabled={isLoading}
                    onClick={(event) => {
                        event.preventDefault();
                        handleClickSaveNote();
                    }}
                >
                    Add Adventure Log
        </button>
            </form>
        </>
    );


}

export default AdventureNoteFormAdd;