import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const NotFoundRedirect = () => <Redirect to="/404" />;

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route
        path={`${match.url}home`}
        component={asyncComponent(() => import("./home"))}
      />
      <Route
        path={`${match.url}sample`}
        component={asyncComponent(() => import("./SamplePage"))}
      />
      {/* <Route
        path={`${match.url}ChangePassword`}
        component={asyncComponent(() => import("./auth/ChangePassword"))}
      /> */}

      <Route component={NotFoundRedirect} />
    </Switch>
  </div>
);

export default App;
