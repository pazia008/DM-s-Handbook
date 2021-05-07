import React from "react";
import { Card, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";

const AdventureNote = ({ adventureNote }) => {

    let date = new Date(adventureNote.dateCreated);
    console.log(adventureNote)

    const history = useHistory();

    return (
        <Card className="m-2 shadow postCard">
            <CardHeader>
                <h2>{adventureNote.campaigns.name}</h2>
                <p>{adventureNote.synopsis}</p>
                <div>{date.toLocaleDateString('en-US')}</div>

            </CardHeader>

            <Button type="button" onClick={() => {
                const confirmBox = window.confirm("Do you really want to edit this Adventure?")
                if (confirmBox === true) {
                    history.push(`/adventureNotes/edit/${adventureNote.id}`)
                }
            }} className="edit-button">
                Edit
                    </Button>
        </Card>
    );
};

export default AdventureNote;