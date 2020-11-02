import React from "react";

import Widget from "components/Widget/index";
import {
  BankOutlined,
  BellOutlined,
  IdcardOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Row, Space } from "antd";

const Greetings = () => {
 
  return (
    <Widget styleName="card-body-greeting gx-text-white">
      <Row gutter={[16, 16]}>
        <Col xl={16} lg={14} md={18} sm={18} xs={18}>
          <p>Welcome to the dashboard </p>
          <h4 className="gx-font-weight-semi-bold gx-text-white gx-mb-0">
            <p className="gx-fs-sm gx-text-uppercase">Info</p>
          </h4>
          <ul className="gx-list-group">
            <li>
              <IdcardOutlined /> <span>Company Info</span>
            </li>
            <li>
              <UserOutlined /> <span>Communication</span>
            </li>
            <li>
              <BellOutlined /> <span>New Notifications</span>
            </li>
            <li>
              <StarOutlined /> <span>My Favs</span>
            </li>
            <li>
              <BankOutlined /> <span>Work</span>
            </li>
          </ul>
        </Col>
        <Col xl={8} lg={10} md={6} sm={6} xs={6} className="gx-text-right">
          <Space align="start">
            <div className="gx-flex-column gx-justify-content-center gx-h-100">
              <span className="gx-mb-2 gx-app-thumb">
                <img
                  className="gx-rounded-lg gx-w-50"
                  src={""}
                  title="..."
                  alt="..."
                />
              </span>
            </div>
          </Space>
        </Col>
      </Row>
    </Widget>
  );
};
export default Greetings;
