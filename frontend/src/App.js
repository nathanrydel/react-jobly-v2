import React, { useContext } from 'react';

import { UserProvider, UserProviderContext } from '~/providers'

import Navigation from "./routes-nav/Navigation";
import RoutesList from "./routes-nav/RoutesList";
import LoadingSpinner from '~/common/LoadingSpinner';


const AppContent = () => {
  const { userLoaded } = useContext(UserProviderContext);

  return (
    userLoaded
      ? <div className="App">
          <Navigation />
          <RoutesList />
        </div>
      : <LoadingSpinner />
  );
}

function App() {

  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
