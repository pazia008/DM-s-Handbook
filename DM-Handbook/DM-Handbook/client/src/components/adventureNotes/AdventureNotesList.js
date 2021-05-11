import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { AdventureNotesContext } from "../../providers/AdventureNotesProvider";
import AdventureNote from "./AdventureNotes";

const AdventureNotesList = () => {
    const { adventureNotes, getAllAdventureNotes } = useContext(AdventureNotesContext);

    //gets all notes
    useEffect(() => {
        getAllAdventureNotes();

    }, []);

    //creates the list of all the adventure notes made by the current user
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Link to="/adventureNotes/new" className="nav-link">
                    New Adventure Log
            </Link>
            </Row>
            <Row>
                {adventureNotes.map((a) => (
                    <Col md="4"><AdventureNote key={a.id} adventureNote={a} /></Col>
                ))}
            </Row>
        </Container>
    );
};

export default AdventureNotesList;