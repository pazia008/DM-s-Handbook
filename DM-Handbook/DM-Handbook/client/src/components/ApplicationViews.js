import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfilesContext } from "../providers/UserProfilesProvider";
import Login from "../Login";
import Register from "../Register";
import Hello from "./Hello";
import AdventureNote from "./adventureNotes/AdventureNotes";
import AdventureNotesList from "./adventureNotes/AdventureNotesList";

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

                <Route path="/adventureNotes" exact>
                    {isLoggedIn ? <AdventureNotesList /> : <Redirect to="/Login" />}
                </Route>
            </Switch>
        </main>
    );
}