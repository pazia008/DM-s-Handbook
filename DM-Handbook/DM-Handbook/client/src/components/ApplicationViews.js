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
import PlayerEditForm from "./players/PlayerEditForm";
import MonsterList from "./monstersAndNpcs/MonsterList";
import MonsterFormAdd from "./monstersAndNpcs/MonsterAddForm";
import MonsterEditForm from "./monstersAndNpcs/MonsterEditForm";
import AdventureEditForm from "./adventureNotes/AdventureNoteEditForm";
import AdventureMonstersAndNpcs from "./adventureNotes/AdventuresMonstersAndNpcs";
import AdventureMonsterForm from "./adventureNotes/AdventureMonsterAddForm";


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

                <Route path="/adventureNotes/edit/:adventureNoteId" exact>
                    {isLoggedIn ? <AdventureEditForm /> : <Redirect to="/Login" />}
                </Route>

                <Route path="/monsterNpcs/getMonsterByAdventureId/:adventureNoteId" exact>
                    {isLoggedIn ? <AdventureMonstersAndNpcs /> : <Redirect to="/login" />}
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

                <Route path="/players/edit/:playerId" exact>
                    {isLoggedIn ? <PlayerEditForm /> : <Redirect to="/Login" />}
                </Route>

                {/* Monsters & Npc Links */}

                <Route path="/monsterNpcs" exact>
                    {isLoggedIn ? <MonsterList /> : <Redirect to="/Login" />}
                </Route>

                <Route path="/monsterNpcs/new" exact>
                    {isLoggedIn ? <MonsterFormAdd /> : <Redirect to="/Login" />}
                </Route>

                <Route path="/monsterNpcs/edit/:monsterId" exact>
                    {isLoggedIn ? <MonsterEditForm /> : <Redirect to="/Login" />}
                </Route>

                {/* Adventure Monster Links */}

                <Route path="/adventureMonsters/new/:adventureNoteId" exact>
                    {isLoggedIn ? <AdventureMonsterForm /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </main>
    );
}