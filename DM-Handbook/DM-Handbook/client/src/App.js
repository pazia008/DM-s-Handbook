import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfilesProvider } from "./providers/UserProfilesProvider";
import { AdventureNotesProvider } from "./providers/AdventureNotesProvider";
import { CampaignsProvider } from "./providers/CampaignsProvider";

function App() {

  return (
    <Router>
      <UserProfilesProvider>
        <CampaignsProvider>
          <AdventureNotesProvider>
            <Header />
            <ApplicationViews />
          </AdventureNotesProvider>
        </CampaignsProvider>
      </UserProfilesProvider>
    </Router>
  );
}
export default App;