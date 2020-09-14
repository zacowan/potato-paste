import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider as BumbagProvider, ToastManager, ThemeConfig } from 'bumbag';
import { ReactQueryConfigProvider, ReactQueryConfig } from 'react-query';
// Icons
import {
  faHeart as fasHeart,
  faClipboard,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

// Pages
import Potato from './pages/Potato';
import Home from './pages/Home';

const queryConfig: ReactQueryConfig = {
  queries: {
    refetchOnWindowFocus: false,
  },
};

const themeConfig: ThemeConfig = {
  Icon: {
    iconSets: [
      {
        icons: [fasHeart, faClipboard],
        prefix: 'solid-',
        type: 'font-awesome',
      },
      {
        icons: [farHeart],
        prefix: 'regular-',
        type: 'font-awesome',
      },
    ],
  },
};

const App: FC = () => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <BumbagProvider theme={themeConfig} colorMode='dark'>
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
                <Redirect to='/home' />
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
