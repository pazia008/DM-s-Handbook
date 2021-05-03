import React from "react";
import { Card, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

const AdventureNote = ({ adventureNote }) => {

    let date = new Date(adventureNote.notes.dateCreated);
    console.log(adventureNote)

    return (
        <Card className="m-2 shadow postCard">
            <CardHeader>
                <h2>{adventureNote.campaigns.name}</h2>
                <p>{adventureNote.notes.synopsis}</p>
                <div>{date.toLocaleDateString('en-US')}</div>

            </CardHeader>
        </Card>
    );
};

export default AdventureNote;