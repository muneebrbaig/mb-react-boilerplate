import React, { useEffect } from "react";
import { Spin, Alert } from "antd";

import { submitAdminLogin } from "appRedux/thunks";
import { useDispatch, useSelector } from "react-redux";
import { utils } from "@mb";
import { useHistory } from "react-router-dom";

const AdminLogin = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { token, signInError } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (!utils.isEmpty(token)) {
      history.push("/profile");
    }
    if (!utils.isEmpty(props.match.params.token)) {
      dispatch(submitAdminLogin(props.match.params.token));
    }
  }, []);

  useEffect(() => {
    if (!utils.isEmpty(signInError.response)) {
      history.push("/404");
    }
  }, [signInError]);

  useEffect(() => {
    if (!utils.isEmpty(token)) {
      history.push("/profile");
    }
  }, [token]);

  return (
    <div className="gx-page-error-container">
      <div className="gx-page-error-content">
        <div className="gx-error-code">Wait</div>

        <div className="gx-text-center">
          <Spin spinning>
            <Alert
              message="Please wait!"
              description="While we are autheticating and log you in..."
              type="info"
            />
          </Spin>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
