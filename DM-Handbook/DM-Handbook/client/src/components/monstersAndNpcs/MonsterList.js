import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { MonsterNpcsContext } from "../../providers/MonsterNpcsProvider";
import Monster from "./Monster";



const MonsterList = () => {
    const { monsters, getAllMonsters } = useContext(MonsterNpcsContext);

    //gets all monsters
    useEffect(() => {
        getAllMonsters()

    }, []);

    //creates the list of all the monsters and npcs made by the current user
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Link to="/monsterNpcs/new" className="nav-link">
                    New Monster
            </Link>
            </Row>
            <Row>
                {monsters.map((m) => (
                    <Col md="4"><Monster key={m.id} monsterNpc={m} /></Col>
                ))}
            </Row>
        </Container>
    );
};

export default MonsterList;