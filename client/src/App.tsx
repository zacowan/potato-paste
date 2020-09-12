import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider as BumbagProvider, ToastManager } from 'bumbag';
import { useCookies } from 'react-cookie';
import { POTATO_ID } from './utils/CookieTypes';

// Pages
import Potato from './pages/Potato';
import Home from './pages/Home';

const App: FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies([POTATO_ID]);

  return (
    <BumbagProvider colorMode='dark'>
      <div style={{ minHeight: '100vh' }}>
        <Router>
          <Switch>
            <Route path='/potatoes/:potatoId'>
              <Potato />
            </Route>
            <Route path='/home'>
              <Home />
            </Route>
            <Route path='/'>
              {!!cookies[POTATO_ID] ? (
                <Redirect to={`/potatoes/${cookies[POTATO_ID]}`} />
              ) : (
                <Redirect to='/home' />
              )}
            </Route>
          </Switch>
        </Router>
      </div>
      <ToastManager />
    </BumbagProvider>
  );
};

export default App;
