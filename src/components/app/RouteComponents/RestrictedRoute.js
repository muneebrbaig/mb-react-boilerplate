import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { utils } from "../../../@mb";

const RestrictedRoute = ({
  component: Component,
  location,
  token,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      utils.isEmpty(token) ? (
        <Redirect
          to={{
            pathname: "/welcome",
            state: { from: location },
          }}
        />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default RestrictedRoute;
