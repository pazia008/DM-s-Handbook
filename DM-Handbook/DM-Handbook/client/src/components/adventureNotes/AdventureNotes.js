import React from "react";
import { Card, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

const AdventureNote = ({ adventureNote }) => {
    return (
        <Card className="m-2 shadow postCard">
            <CardHeader>
                {/* <h2>{adventureNote.campaigns.name}</h2> */}
                <p>{adventureNote.synopsis}</p>
                <div>{adventureNote.dateCreated}</div>
            </CardHeader>
        </Card>
    );
};

export default AdventureNote;