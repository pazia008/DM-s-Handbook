import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { CampaignsContext } from "../../providers/CampaignsProvider";
import Campaign from "./Campaigns";


const CampaignList = () => {
    const { campaigns, getAllCampaigns, setCampaigns } = useContext(CampaignsContext);

    //gets all campaigns
    //takes the response and updates the state of campaign
    useEffect(() => {
        getAllCampaigns()
            .then((res) => setCampaigns(res))
            .then(console.log(campaigns))
    }, []);


    //creates the list of all the campaigns made by the current user
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Link to="/campaigns/new" className="nav-link">
                    New Campaign
            </Link>
            </Row>
            <Row>
                {campaigns.map((c) => (
                    <Col md="4"><Campaign key={c.id} campaign={c} /></Col>
                ))}
            </Row>
        </Container>
    );
};

export default CampaignList;