import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './providers/store';

import './scss/style.scss';

const loading = (
       <div className="pt-3 text-center">
              <div className="sk-spinner sk-spinner-pulse"></div>
       </div>
);

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/login/Login'));
const Page404 = React.lazy(() => import('./views/page404/Page404'));

class App extends Component {
       render() {
              return (
                     <BrowserRouter>
                            <React.Suspense fallback={loading}>
                                   <Switch>
                                          <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
                                          <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
                                          <Route path="/" name="Home" render={(props) => <TheLayout {...props} />} />
                                   </Switch>
                            </React.Suspense>
                     </BrowserRouter>
              );
       }
}

export default App;
