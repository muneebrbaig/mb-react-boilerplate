import React from "react";
import { Col, Row } from "antd";
import Greetings from "components/dashboard/Greetings";

const HomePage = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col
          xl={16}
          lg={16}
          md={16}
          sm={{ span: 24, order: 1 }}
          xs={{ span: 24, order: 1 }}
        >
          <Greetings />
        </Col>
        <Col
          xl={8}
          lg={8}
          md={8}
          sm={{ span: 24, order: 3 }}
          xs={{ span: 24, order: 2 }}
        ></Col>
        <Col
          lg={16}
          md={16}
          sm={{ span: 24, order: 3 }}
          xs={{ span: 24, order: 2 }}
        ></Col>

        <Col
          xl={8}
          lg={8}
          md={8}
          sm={{ span: 24, order: 3 }}
          xs={{ span: 24, order: 3 }}
        ></Col>
        <Col
          xl={24}
          lg={24}
          md={24}
          sm={{ span: 24, order: 3 }}
          xs={{ span: 24, order: 4 }}
        ></Col>
      </Row>
    </>
  );
};

export default HomePage;
