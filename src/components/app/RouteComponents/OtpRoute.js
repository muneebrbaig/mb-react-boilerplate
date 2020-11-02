import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

import connect from "react-redux/es/connect/connect";

class OtpRoute extends Component {
  render() {
    const { component: Component, otpVerified, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={(props) =>
          otpVerified ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "./otp",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  }
}

const mapStateToProps = ({ otp }) => {
  const { otpVerified } = otp;

  return { otpVerified };
};

export default //withRouter(
connect(mapStateToProps)(OtpRoute);
