
import { Card, CardHeader } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import React, { useContext } from "react";
import { PlayersContext } from "../../providers/PlayersProvider";


const Player = ({ player }) => {

    let date = new Date(player.dateCreated);
    console.log(player)

    const history = useHistory();


    return (
        <Card className="m-2 shadow postCard">
            <CardHeader>
                <h2>{player.name}</h2>
                <h4>Campaign: {player.campaigns.name}</h4>
                <p>Race: {player.race}</p>
                <p>How do they play: {player.howTheyPlay}</p>
                <div>{date.toLocaleDateString('en-US')}</div>
            </CardHeader>
        </Card>
    );
};

export default Player;