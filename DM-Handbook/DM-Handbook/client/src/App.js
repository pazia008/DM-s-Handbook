import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfilesProvider } from "./providers/UserProfilesProvider";
import { AdventureNotesProvider } from "./providers/AdventureNotesProvider";

function App() {

  return (
    <Router>
      <UserProfilesProvider>
        <AdventureNotesProvider>
          <Header />
          <ApplicationViews />
        </AdventureNotesProvider>
      </UserProfilesProvider>
    </Router>
  );
}
export default App;