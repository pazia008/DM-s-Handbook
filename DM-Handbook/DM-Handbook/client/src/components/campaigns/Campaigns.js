
import { Card, CardHeader } from "reactstrap";
import { CampaignsContext } from "../../providers/CampaignsProvider";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import React, { useContext } from "react";


const Campaign = ({ campaign }) => {
    const { deleteCampaign } = useContext(CampaignsContext);

    const history = useHistory();

    const campaignDelete = () => {
        deleteCampaign(campaign);
    }

    return (
        <Card className="m-2 shadow postCard">
            <CardHeader>
                <h2>{campaign.name}</h2>
            </CardHeader>
            <Button type="button" onClick={() => {
                const confirmBox = window.confirm("Do you really want to edit this Campaign?")
                if (confirmBox === true) {
                    history.push(`/campaigns/edit/${campaign.id}`)
                }
            }} className="edit-button">
                Edit
                    </Button>
            <Button variant="secondary" onClick={() => {
                const confirmBox = window.confirm(
                    "Do you really want to delete this Camapign?"
                )
                if (confirmBox === true) {
                    campaignDelete(deleteCampaign)
                }
            }} className="delete-button">
                Delete
                </Button>
        </Card>
    );
};

export default Campaign;