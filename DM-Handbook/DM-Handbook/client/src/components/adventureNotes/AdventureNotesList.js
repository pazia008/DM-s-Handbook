import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { AdventureNotesContext } from "../../providers/AdventureNotesProvider";
import AdventureNote from "./AdventureNotes";

const AdventureNotesList = () => {
    const { adventureNotes, getAllAdventureNotes } = useContext(AdventureNotesContext);

    useEffect(() => {
        getAllAdventureNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Link to="/adventureNote/new" className="nav-link">
                    New Adventure Log
            </Link>
            </Row>
            <Row>
                {adventureNotes.map((a) => (
                    <Col key={a.id} md="4"><AdventureNote adventureNote={a} /></Col>
                ))}
            </Row>
        </Container>
    );
};

export default AdventureNotesList;