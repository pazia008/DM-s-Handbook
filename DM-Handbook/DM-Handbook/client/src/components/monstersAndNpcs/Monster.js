
import { Card, CardHeader } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import React, { useContext } from "react";
import { MonsterNpcsContext } from "../../providers/MonsterNpcsProvider";



const Monster = ({ monsterNpc }) => {

    const { deleteMonster } = useContext(MonsterNpcsContext);


    const monsterDelete = () => {
        deleteMonster(monsterNpc);
    }


    let date = new Date(monsterNpc.dateCreated);
    console.log(monsterNpc)

    const history = useHistory();


    //sets what it will look like on the dom
    // the question mark helps with handling null information
    return (
        <Card className="m-2 shadow postCard">
            <CardHeader>
                <h2>{monsterNpc.name}</h2>
                <h4>Monster Or Npc: {monsterNpc.monsterOrNpcTypes?.name}</h4>
                <p>Synopsis: {monsterNpc.synopsis}</p>
                <p>Abilities: {monsterNpc.abilities}</p>
                <div>{date.toLocaleDateString('en-US')}</div>
            </CardHeader>
            <Button type="button" onClick={() => {
                const confirmBox = window.confirm("Do you really want to edit this Monster or Npc?")
                if (confirmBox === true) {
                    history.push(`/monsterNpcs/edit/${monsterNpc.id}`)
                }
            }} className="edit-button">
                Edit
                    </Button>
            <Button variant="secondary" onClick={() => {
                const confirmBox = window.confirm(
                    "Do you really want to delete this Monster or Npc?"
                )
                if (confirmBox === true) {
                    monsterDelete(deleteMonster)
                }
            }} className="delete-button">
                Delete
                </Button>
        </Card>
    );
};

export default Monster;