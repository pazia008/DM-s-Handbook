import React from "react";
import { Card, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AdventureNotesContext } from "../../providers/AdventureNotesProvider";

const AdventureNote = ({ adventureNote }) => {

    const { deleteAdventureNote } = useContext(AdventureNotesContext);

    const noteDelete = () => {
        deleteAdventureNote(adventureNote);
    }

    let date = new Date(adventureNote.dateCreated);
    console.log(adventureNote)

    const history = useHistory();

    return (
        <Card className="m-2 shadow postCard">
            <CardHeader>
                <h2>{adventureNote.campaigns.name}</h2>
                <p>{adventureNote.synopsis}</p>
                <div>{date.toLocaleDateString('en-US')}</div>
                <Button type="button" onClick={() => {
                    history.push(`/monsterNpcs/getMonsterByAdventureId/${adventureNote.id}`)

                }} className="edit-button">
                    Monsters and Npcs
                    </Button>

            </CardHeader>

            <Button type="button" onClick={() => {
                const confirmBox = window.confirm("Do you really want to edit this Adventure?")
                if (confirmBox === true) {
                    history.push(`/adventureNotes/edit/${adventureNote.id}`)
                }
            }} className="edit-button">
                Edit
                    </Button>

            <Button variant="secondary" onClick={() => {
                const confirmBox = window.confirm(
                    "Do you really want to delete this Adventure?"
                )
                if (confirmBox === true) {
                    noteDelete(deleteAdventureNote)
                }
            }} className="delete-button">
                Delete
                </Button>
        </Card>
    );
};

export default AdventureNote;