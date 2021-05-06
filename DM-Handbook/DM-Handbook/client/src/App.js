import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfilesProvider } from "./providers/UserProfilesProvider";
import { AdventureNotesProvider } from "./providers/AdventureNotesProvider";
import { CampaignsProvider } from "./providers/CampaignsProvider";
import { PlayersProvider } from "./providers/PlayersProvider";
import { MonsterNpcsProvider } from "./providers/MonsterNpcsProvider";
import { MonsterOrNpcTypesProvider } from "./providers/MonsterOrNpcTypeProvider";

function App() {

  return (
    <Router>
      <UserProfilesProvider>
        <CampaignsProvider>
          <AdventureNotesProvider>
            <PlayersProvider>
              <MonsterNpcsProvider>
                <MonsterOrNpcTypesProvider>
                  <Header />
                  <ApplicationViews />
                </MonsterOrNpcTypesProvider>
              </MonsterNpcsProvider>
            </PlayersProvider>
          </AdventureNotesProvider>
        </CampaignsProvider>
      </UserProfilesProvider>
    </Router>
  );
}
export default App;