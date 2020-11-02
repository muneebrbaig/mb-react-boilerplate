import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";

import { utils } from "@mb";
import "assets/styles/login.css";
import IntlMessages from "util/IntlMessages";

const FormItem = Form.Item;

const Welcome = (props) => {
  const dispatch = useDispatch();
  const { token, welcomeError, continueUrl } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (!utils.isEmpty(token)) {
      props.history.push("/");
    }
  }, []);

  useEffect(() => {
    console.log(welcomeError)
    if (welcomeError?.failed) {
      message.warn(
        welcomeError.message ||
          "Something went wrong, please contact Administrator."
      );
      return;
    }
    if (utils.isEmpty(continueUrl)) {
      //message.warn("Something went wrong, please contact Administrator.");
      return;
    }

    window.location.replace(continueUrl);
  }, [welcomeError, continueUrl]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.warn("Please provide with required information!");
  };

  const onFinish = (values) => {
    const studentToRegister = {
      ...values,
    };
    console.log(studentToRegister);
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
                <h1>Welcome to mb</h1>
                <p>
                  Please provide the Registration Number to continue...
                </p>
                <p>
                  This will verify you and ask your password on the next screen.
                </p>
              </div>
              <div className="gx-app-logo">
                <img
                  alt="mb"
                  src={require("assets/images/logo.png")}
                />
              </div>
            </div>

            <div className="gx-app-login-content">
              <Form
                initialValues={{ remember: true }}
                name="welcome"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="gx-signin-form gx-form-row0"
              >
                <FormItem
                  rules={[
                    {
                      required: true,
                      pattern: new RegExp("^[0-9]*$"),
                      message: "Please provide a valid Registration No!",
                    },
                  ]}
                  name="grNo"
                >
                  <Input placeholder="Registration No" autoFocus maxLength="4" />
                </FormItem>
                <FormItem>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    Continue...
                  </Button>
                  <br />
                  <br />
                  <span>
                    <IntlMessages id="app.userAuth.or" />
                  </span>{" "}
                  <Link className="gx-login-form-forgot" to="/ForgotPassword">
                    Forgot password
                  </Link>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
