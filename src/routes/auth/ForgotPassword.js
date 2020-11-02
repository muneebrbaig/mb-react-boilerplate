import React, { Component } from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Input, Select, message } from "antd";

import IntlMessages from "util/IntlMessages";

import * as thunkActions from "appRedux/thunks";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { utils } from "@mb";

const FormItem = Form.Item;

class ForgotPassword extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.submitForgotPassword(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    if (!utils.isEmpty(this.props.passwordResetInfo)) {
      if (this.props.passwordResetInfo.isValid === true) {
        message.success(this.props.passwordResetInfo.message, 5);
        this.props.history.push("/signin");
      } else {
        if (!utils.isEmpty(this.props.passwordResetInfo.message)) {
          message.error(this.props.passwordResetInfo.message, 5);
        }
      }
      this.props.submitResetAuthInfo();
    }
    /*    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "0331"
    })(
      <Select style={{ width: 80 }}>
        <Option value="0300">0300</Option>
        <Option value="0301">0301</Option>
        <Option value="0302">0302</Option>
        <Option value="0303">0303</Option>
        <Option value="0304">0304</Option>
        <Option value="0305">0305</Option>
        <Option value="0306">0306</Option>
        <Option value="0307">0307</Option>
        <Option value="0308">0308</Option>
        <Option value="0309">0309</Option>
        <Option value="0341">0341</Option>
        <Option value="0342">0342</Option>
        <Option value="0343">0343</Option>
        <Option value="0344">0344</Option>
        <Option value="0345">0345</Option>
        <Option value="0346">0346</Option>
        <Option value="0347">0347</Option>
        <Option value="0331">0331</Option>
        <Option value="0332">0332</Option>
        <Option value="0333">0333</Option>
        <Option value="0334">0334</Option>
        <Option value="0335">0335</Option>
        <Option value="0336">0336</Option>
        <Option value="0321">0321</Option>
        <Option value="0322">0322</Option>
        <Option value="0323">0323</Option>
        <Option value="0324">0324</Option>
        <Option value="0325">0325</Option>
        <Option value="0311">0311</Option>
        <Option value="0312">0312</Option>
        <Option value="0313">0313</Option>
        <Option value="0314">0314</Option>
        <Option value="0315">0315</Option>
        <Option value="0346">0346</Option>
        <Option value="03555">03555</Option>
        <Option value="0581">0581</Option>
      </Select>
    );
    */
    return (
      <div className="login-background">
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
              <h2>Forgot Your Password?</h2>
              <p>
                Don't worry. Resetting the password is easy. Just tell us the
                GR and mobile number (in format 03XX-1234567), you have registered with us!
              </p>
            </div>

            <Form
              layout="vertical"
              onSubmit={this.handleSubmit}
              className="gx-login-form gx-form-row0"
            >
              <FormItem
              //{...formItemLayout}
              >
                {getFieldDecorator("grNo", {
                  rules: [
                    {
                      required: true,
                      pattern: new RegExp("^[0-9]*$"),
                      message: "Please provide a valid Registration No!"
                    }
                  ]
                })(<Input type="text" placeholder="Registration No" autoFocus />)}
              </FormItem>
              <FormItem
                //{...formItemLayout}
                extra="Your password will be sent to this number via SMS."
              >
                {getFieldDecorator("phone", {
                  rules: [
                    {
                      required: true,
                          pattern: new RegExp("^\\d{4}[\\s.-]\\d{7}"),
                          message: "Required Phone Number format 03XX-1234567"
                    }
                  ]
                })(<Input placeholder="Mobile Number in format 03XX-1234567" />)}
              </FormItem>
              
              <FormItem>
                <Button type="primary" htmlType="submit">
                  <IntlMessages id="app.userAuth.send" />
                </Button>
              </FormItem>
              {/* <FormItem>
                <Link className="gx-login-form-forgot" to="/signin">
                  Back to Sign In
                </Link>
              </FormItem> */}
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedForgotPasswordForm = Form.create()(ForgotPassword);

const mapStateToProps = ({ auth }) => {
  const { authUser, passwordResetInfo } = auth;
  return { authUser, passwordResetInfo };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      submitForgotPassword: thunkActions.submitForgotPassword,
      submitResetAuthInfo: thunkActions.submitResetAuthInfo
    },
    dispatch
  );
};
export default //withRouter(
connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedForgotPasswordForm);
