import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider as BumbagProvider } from 'bumbag';
import { useCookies } from 'react-cookie';

// Pages
import Pastes from './pages/Pastes';
import Login from './pages/Login';

const App: FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['uid']);

  return (
    <BumbagProvider colorMode='dark'>
      <div style={{ minHeight: '100vh' }}>
        <Router>
          <Switch>
            <Route path='/:uid/pastes'>
              <Pastes />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/'>
              {!!cookies['uid'] ? (
                <Redirect to={`/${cookies['uid']}/pastes`} />
              ) : (
                <Redirect to='/login' />
              )}
            </Route>
          </Switch>
        </Router>
      </div>
    </BumbagProvider>
  );
};

export default App;
