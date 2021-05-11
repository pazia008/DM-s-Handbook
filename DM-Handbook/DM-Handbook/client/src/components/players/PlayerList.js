import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { PlayersContext } from "../../providers/PlayersProvider";
import Player from "./Player";


const PlayerList = () => {
    const { players, getAllPlayers } = useContext(PlayersContext);

    //gets all players
    useEffect(() => {
        getAllPlayers()

    }, []);


    //creates the list of all the players made by the current user
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Link to="/players/new" className="nav-link">
                    New Player
            </Link>
            </Row>
            <Row>
                {players.map((p) => (
                    <Col md="4"><Player key={p.id} player={p} /></Col>
                ))}
            </Row>
        </Container>
    );
};

export default PlayerList;