import React from "react";
import { Redirect, Route } from "react-router-dom";
import { utils } from "@mb";

const AdminRoute = ({ component: Component, location, token, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      utils.isEmpty(token) ? (
        <Redirect
          to={{
            pathname: "/VerifyAuth",
            state: { from: location },
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);
export default AdminRoute;
