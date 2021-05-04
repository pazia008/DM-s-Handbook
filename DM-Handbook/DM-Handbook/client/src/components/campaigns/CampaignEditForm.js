import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CampaignsContext } from "../../providers/CampaignsProvider";


const CampaignEditForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const { updateCampaign, getAllCampaigns } = useContext(CampaignsContext);
    const [isLoading, setIsLoading] = useState(false);
    const [campaign, setCampaign] = useState({
        id: id,
        userId: 0,
        name: "",
    });

    useEffect(() => {
        getAllCampaigns(id)
            .then(resp => setCampaign(resp.campaign))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handles updating the state of campaign 
    const handleInput = e => {
        const newCampaign = { ...campaign };
        newCampaign[e.target.id] = e.target.value;
        setCampaign(newCampaign);
    }

    const handleSave = () => {
        if (campaign.name === "") return window.alert("Please enter a campaign name");

        // Disables the update button until finished
        setIsLoading(true)

        // Update the existing campaign in the database
        updateCampaign({
            id: campaign.id,
            userId: campaign.userId,
            name: campaign.name

        })
            .then(() => history.push(`/campaigns`));
    }

    return (
        <>

            <form className="campaignForm">
                <h2 className="campaignForm-title">Update your campaign</h2>

                {/* Name Input */}
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Name: </label>
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

                {/* Update Button */}
                <button
                    className="btn btn-primary"
                    disabled={isLoading}
                    onClick={(event) => {
                        event.preventDefault();
                        handleSave();
                    }}
                >
                    Update Campaign
                </button>
            </form>
        </>
    );
};

export default CampaignEditForm;