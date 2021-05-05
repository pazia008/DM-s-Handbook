import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfilesContext } from "../providers/UserProfilesProvider";
import Login from "../Login";
import Register from "../Register";
import Hello from "./Hello";
import AdventureNotesList from "./adventureNotes/AdventureNotesList";
import AdventureNoteFormAdd from "./adventureNotes/AdventureNoteAddForm";
import CampaignList from "./campaigns/CampaignList";
import CampaignAddForm from "./campaigns/CampaignAddForm";
import CampaignEditForm from "./campaigns/CampaignEditForm";
import PlayerList from "./players/PlayerList";
import PlayerFormAdd from "./players/PlayerAddForm"


export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfilesContext);

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                {/* Adventure links */}

                <Route path="/adventureNotes" exact>
                    {isLoggedIn ? <AdventureNotesList /> : <Redirect to="/Login" />}
                </Route>

                <Route path="/adventureNotes/new" exact>
                    {isLoggedIn ? <AdventureNoteFormAdd /> : <Redirect to="/Login" />}
                </Route>

                {/* Campaign Links */}

                <Route path="/campaigns" exact>
                    {isLoggedIn ? <CampaignList /> : <Redirect to="/Login" />}
                </Route>

                <Route path="/campaigns/new" exact>
                    {isLoggedIn ? <CampaignAddForm /> : <Redirect to="/Login" />}
                </Route>

                <Route path="/campaigns/edit/:campaignId" exact>
                    {isLoggedIn ? <CampaignEditForm /> : <Redirect to="/Login" />}
                </Route>

                {/* Player Links */}

                <Route path="/players" exact>
                    {isLoggedIn ? <PlayerList /> : <Redirect to="/Login" />}
                </Route>

                <Route path="/players/new" exact>
                    {isLoggedIn ? <PlayerFormAdd /> : <Redirect to="/Login" />}
                </Route>
            </Switch>
        </main>
    );
}