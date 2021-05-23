import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import { useStores } from './stores/RootStore';
import GameScreen from './screens/GameScreen/GameScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import SignupScreen from './screens/SignupScreen/SignupScreen';
import JoinTeamScreen from './screens/JoinTeamScreen/JoinTeamScreen';
import CreateCardScreen from './screens/CreateCardScreen/CreateCardScreen';
import CreateTeamScreen from './screens/CreateTeamScreen/CreateTeamScreen';
import { observer } from 'mobx-react-lite';

const App = () => {
  const { userStore } = useStores();
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <LoginScreen />
        </Route>
        <Route path="/signup">
          <SignupScreen />
        </Route>
        {userStore.accessToken && userStore.username ? (
          <>
            <Route path="/join">
              <JoinTeamScreen />
            </Route>
            <Route path="/create/card">
              <CreateCardScreen />
            </Route>
            <Route path="/create/team">
              <CreateTeamScreen />
            </Route>
            <Route path="/game">
              <GameScreen />
            </Route>
          </>
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )}
      </Switch>
    </Router>
  );
}

export default observer(App);
