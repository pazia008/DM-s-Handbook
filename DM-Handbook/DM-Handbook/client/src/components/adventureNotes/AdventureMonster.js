import React, { useContext, useEffect } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";


const AdventureMonster = ({ monsterNpc }) => {
    return (
        <Card className="m-4">
            <CardHeader>
                <strong>Monsters and Npc's: {monsterNpc.name}</strong>
            </CardHeader>
        </Card>
    );
};

export default AdventureMonster;