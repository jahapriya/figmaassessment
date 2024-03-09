import React from "react";
import Topbar from "./Topbar/index.js";
import StoreLocation from "./StoreLocation";
import { Col, Row } from "antd";

const MainContent = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={10} lg={8} xl={8}>
          <div className="Mobileviewtop">
            <Topbar />
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={12} md={10} lg={8} xl={8}>
          <div className="Mobileviewtop">
            <StoreLocation />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MainContent;
