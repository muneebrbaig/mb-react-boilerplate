import React from "react";
// import {ConnectedRouter} from "react-router-redux";
import {ConnectedRouter as Router} from "connected-react-router";
import {Provider} from "react-redux";
import {/*BrowserRouter as Router,*/ Route, Switch} from "react-router-dom";

import "./assets/vendors/style";
import "./styles/wieldy.less";
import configureStore, {history} from "./appRedux/store";
import App from "./containers/App/index";
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

export const store = configureStore();

const NextApp = () =>
  <Provider store={store}>
    <Router history={history} basename={baseUrl} >
      <Switch>
        <Route path="/" component={App}/>
      </Switch>
    </Router>
  </Provider>;


export default NextApp;
