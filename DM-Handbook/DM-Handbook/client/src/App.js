import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import { UserProfilesProvider } from "./providers/UserProfilesProvider";

function App() {

  return (
    <Router>
      <UserProfilesProvider>
        <Header />
      </UserProfilesProvider>
    </Router>
  );
}
export default App;