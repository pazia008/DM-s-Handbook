import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfilesProvider } from "./providers/UserProfilesProvider";

function App() {

  return (
    <Router>
      <UserProfilesProvider>
        <Header />
        <ApplicationViews />
      </UserProfilesProvider>
    </Router>
  );
}
export default App;