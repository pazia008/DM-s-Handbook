import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CampaignsContext } from "../../providers/CampaignsProvider";


const CampaignEditForm = () => {
    const history = useHistory();
    const { campaignId } = useParams();
    const { updateCampaign, getCampaignById } = useContext(CampaignsContext);
    const [isLoading, setIsLoading] = useState(false);
    const [campaign, setCampaign] = useState({
        userId: 0,
        name: "",
    });

    useEffect(() => {
        getCampaignById(campaignId)
            .then(resp => setCampaign(resp))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handles updating the state of campaign 
    const handleInput = (e) => {
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