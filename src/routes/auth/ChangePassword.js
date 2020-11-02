import React, { Component } from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, message } from "antd";
import IntlMessages from "util/IntlMessages";

import * as thunkActions from "../../appRedux/thunks";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { utils } from "../../@mb";

const FormItem = Form.Item;

class ChangePassword extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.submitChangePassword(values);
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you entered are inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.props.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    if (!utils.isEmpty(this.props.passwordChangedInfo)) {
      if (this.props.passwordChangedInfo.isValid === true) {
        message.success("Password changed, successfully!", 5);
        this.props.history.push("/home");
      } else {
        if (!utils.isEmpty(this.props.passwordChangedInfo.message)) {
          message.error(this.props.passwordChangedInfo.message, 5);
        }
      }
      this.props.submitResetAuthInfo();
    }

    const { getFieldDecorator } = this.props.form;

    return (
      <div className="gx-login-container">
        <div className="gx-login-content">
          {/* <div
            className="gx-login-header"
            style={{ backgroundColor: "#003366" }}
          >
            <img
              src={require("assets/images/logo.png")}
              alt="Benchmark"
              title="The Benchmark School"
            />
          </div> */}
          <div className="gx-mb-4">
            <h2>Change Your Password</h2>
            <p>
              <IntlMessages id="appModule.enterPasswordReset" />
            </p>
          </div>

          <Form
            onSubmit={this.handleSubmit}
            className="gx-login-form gx-form-row0"
          >
            <FormItem>
              {getFieldDecorator("currentPassword", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Current Password!"
                  }
                ]
              })(<Input type="password" placeholder="Password" autoFocus />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your New Password!"
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input type="password" placeholder="New Password" />)}
            </FormItem>

            <FormItem>
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm your New Password!"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(
                <Input
                  placeholder="Retype New Password"
                  type="password"
                  onBlur={this.handleConfirmBlur}
                />
              )}
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit">
                Change
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedResetPasswordForm = Form.create()(ChangePassword);

const mapStateToProps = ({ auth }) => {
  const { authUser, passwordChangedInfo } = auth;
  return { authUser, passwordChangedInfo };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      submitChangePassword: thunkActions.submitChangePassword,
      submitResetAuthInfo:thunkActions.submitResetAuthInfo

    },
    dispatch
  );
};
export default //withRouter(
connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedResetPasswordForm);
