import React from "react";
import { Card, CardHeader } from "reactstrap";


const Campaign = ({ campaign }) => {


    return (
        <Card className="m-2 shadow postCard">
            <CardHeader>
                <h2>{campaign.name}</h2>
            </CardHeader>
        </Card>
    );
};

export default Campaign;