import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { CampaignsContext } from "../../providers/CampaignsProvider";


const CampaignAddForm = () => {
    const history = useHistory();
    const { saveCampaign } = useContext(CampaignsContext);
    const [isLoading, setIsLoading] = useState(false);
    const [campaign, setCampaign] = useState({
        userId: 0,
        name: ""
    });

    // Handles updating the state of campaign 
    const handleInput = e => {
        const newCampaign = { ...campaign };
        newCampaign[e.target.id] = e.target.value;
        setCampaign(newCampaign);
    }

    const handleSave = () => {
        if (campaign.name === "") return window.alert("Please enter a campaign name");

        // Disables the save button until finished
        setIsLoading(true)

        // Save the campaign object to database
        saveCampaign({
            userId: campaign.userId,
            name: campaign.name
        })
            .then(() => history.push("/campaigns"));
    }

    return (
        <>
            <form className="campaignForm">
                <h2 className="campaignForm-title">Add a new Campaign!</h2>

                {/* Name Input */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Campaign Name: </label>
                        <input
                            type="text"
                            id="name"
                            onChange={handleInput}
                            required
                            autoFocus
                            className="form-control"
                            placeholder="Name"
                            value={campaign.name}
                        />
                    </div>
                </fieldset>

                {/* Save Button */}
                <button
                    className="btn btn-primary"
                    disabled={isLoading}
                    onClick={(event) => {
                        event.preventDefault();
                        handleSave();
                    }}
                >
                    Add Campaign
                </button>
            </form>
        </>
    );
}

export default CampaignAddForm