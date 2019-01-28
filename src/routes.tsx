import React from 'react';
import {
  Route,
  BrowserRouter,
  Switch,
} from 'react-router-dom';

import NotFound from './components/not-found';
import Home from './components/home/home';
import Login from './components/auth/login';
import Auth from './components/auth/auth';
import noAuth from './components/auth/decorators/noAuth';
import requireAuth from './components/auth/decorators/requireAuth';

class Routes extends React.Component<any, {}>{
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={requireAuth(Home)} />
          <Route path="/login" component={noAuth(Login)} />
          <Route path="/auth" component={noAuth(Auth)} />
          <Route component={() => <NotFound />} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default Routes;
