import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider as BumbagProvider, ToastManager } from 'bumbag';
import { useCookies } from 'react-cookie';
import { ReactQueryConfigProvider, ReactQueryConfig } from 'react-query';
import { POTATO_ID } from './utils/CookieTypes';

// Pages
import Potato from './pages/Potato';
import Home from './pages/Home';

const queryConfig: ReactQueryConfig = {
  queries: {
    refetchOnWindowFocus: false,
  },
};

const App: FC = () => {
  const [cookies] = useCookies([POTATO_ID]);

  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <BumbagProvider colorMode='dark'>
        <div style={{ height: '100%' }}>
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
    </ReactQueryConfigProvider>
  );
};

export default App;
