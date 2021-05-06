
import { Card, CardHeader } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import React, { useContext } from "react";
import { MonsterNpcsContext } from "../../providers/MonsterNpcsProvider";



const Monster = ({ monsterNpc }) => {


    let date = new Date(monsterNpc.dateCreated);
    console.log(monsterNpc)

    const history = useHistory();


    return (
        <Card className="m-2 shadow postCard">
            <CardHeader>
                <h2>{monsterNpc.name}</h2>
                <h4>Monster Or Npc: {monsterNpc.monsterOrNpcTypes.name}</h4>
                <p>Synopsis: {monsterNpc.synopsis}</p>
                <p>Abilities: {monsterNpc.abilities}</p>
                <div>{date.toLocaleDateString('en-US')}</div>
            </CardHeader>

        </Card>
    );
};

export default Monster;