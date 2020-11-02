import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitLogin } from "appRedux/thunks";
import { hideMessage } from "appRedux/actions/auth.actions";

import jwtDecode from "jwt-decode";

import { Button, Empty, Form, Input, message } from "antd";
import { Link } from "react-router-dom";

import { utils } from "@mb";
import "assets/styles/login.css";
import IntlMessages from "util/IntlMessages";
import { WarningOutlined } from "@ant-design/icons";

const FormItem = Form.Item;

const Continue = (props) => {
  const dispatch = useDispatch();
  const { token, signInError, showMessage } = useSelector(({ auth }) => auth);
  const [grNo, setGrNo] = useState("");

  useEffect(() => {
    if (!utils.isEmpty(token)) {
      props.history.push("/");
    }

    if (!utils.isEmpty(props.match.params.token)) {
      const { unique_name } = jwtDecode(props.match.params.token);
      setGrNo(unique_name);
    } else {
      props.history.push("/");
    }
  }, []);

  useEffect(() => {
    if (!utils.isEmpty(token)) {
      props.history.push("/");
    }
    if (showMessage) {
      message.error(signInError?.message || `Try again!`);
      setTimeout(() => {
        dispatch(hideMessage());
      }, 50);
    }
  }, [signInError, showMessage]);

  useEffect(() => {
    if (!utils.isEmpty(token)) {
      props.history.push("/");
    }
  }, [token]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.warn("Please provide with required information!");
  };

  const onFinish = (values) => {
    const loginModel = {
      ...values,
      email: grNo,
    };
    dispatch(submitLogin(loginModel));
  };

  return (
    <div className="login-background">
      <div className="gx-app-login-wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg">
                {/* <img src="https://via.placeholder.com/272x395" alt="Neature" /> */}
              </div>
              <div className="gx-app-logo-wid">
                <h1>Welcome to mymo</h1>
                <p>Please provide your password.</p>
                <p>You will be redirected to portal once authorized.</p>
              </div>
              <div className="gx-app-logo">
                <img
                  alt="mymo"
                  src={require("assets/images/logo.png")}
                />
              </div>
            </div>

            <div className="gx-app-login-content">
              {utils.isEmpty(grNo) ? (
                <Empty
                  description="Something went wrong, please contact Administratior."
                  image={<WarningOutlined style={{ fontSize: 40 }} />}
                  style={{ fontSize: 16 }}
                />
              ) : (
                <Form
                  initialValues={{ grNo: grNo }}
                  name="welcome"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  className="gx-signin-form gx-form-row0"
                >
                  <FormItem
                    name="grNo"
                    rules={[
                      {
                        required: true,
                        message:
                          "Don't have Registration Code? Please contact Administrator!",
                      },
                    ]}
                  >
                    <Input placeholder="Registration No" disabled={true} />
                  </FormItem>
                  <FormItem
                    rules={[
                      {
                        required: true,
                        message: "Please input your Password!",
                      },
                    ]}
                    name="password"
                  >
                    <Input placeholder="Password" autoFocus type="password" />
                  </FormItem>
                  <FormItem>
                    <Button
                      type="primary"
                      className="gx-mb-0"
                      htmlType="submit"
                    >
                      Continue...
                    </Button>
                    <br />
                    <br />
                    <Link className="gx-login-form-forgot" to="/Welcome">
                      Cancel
                    </Link>
                    <span>
                      {" "}
                      <IntlMessages id="app.userAuth.or" />{" "}
                    </span>
                    <Link className="gx-login-form-forgot" to="/ForgotPassword">
                      Forgot password
                    </Link>
                  </FormItem>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Continue;
