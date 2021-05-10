import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AdventureNotesContext } from "../../providers/AdventureNotesProvider";
import { MonsterNpcsContext } from "../../providers/MonsterNpcsProvider";
import Monster from "../monstersAndNpcs/Monster";
import AdventureNote from "./AdventureNotes";
import { Container, Row, Col } from "reactstrap";


const AdventureMonstersAndNpcs = () => {
    const { adventureNoteId } = useParams();
    const { monsters, getMonstersByAdventureId } = useContext(MonsterNpcsContext);


    useEffect(() => {
        getMonstersByAdventureId(adventureNoteId)

    }, []);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Link to="/adventureMonsters/new" className="nav-link">
                    Manage Monsters and Npcs
            </Link>
            </Row>
            <Row className="justify-content-md-center">
            </Row>
            <Row>
                {monsters.map((m) => {
                    console.log(m); return (

                        <Col md="4"><Monster key={m.id} monsterNpc={m} /></Col>
                    )
                })}
            </Row>
        </Container>
    );

};

export default AdventureMonstersAndNpcs;