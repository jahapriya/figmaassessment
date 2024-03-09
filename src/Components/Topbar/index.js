import React from "react";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { DownOutlined } from "@ant-design/icons";
import { Avatar, Space, Dropdown } from "antd";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Col, Row } from "antd";
import userlogo from "../../Images/foodnetworklogo.png";
import "./Topbar.css";

const Topbar = () => {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          style={{ color: "black" }}
        >
          User: Karthikraj
        </a>
      ),
    },
  ];

  return (
    <header>
      <div className="topbar-container">
        <Row>
          <Col span={12} />
          <Col span={12}>
            <div className="topbar-content">
              <div className="language">
                <p>
                  English <LanguageOutlinedIcon />
                </p>
              </div>
              <div className="notifications">
                <p>
                  <NotificationsNoneOutlinedIcon />
                </p>
              </div>
              <div className="user-dropdown">
                <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space direction="vertical" size={18}>
                      <Space wrap size={18}>
                        <Avatar src={userlogo} />
                      </Space>
                    </Space>
                    <Space>
                      <p>
                        Karthikraj
                        <p className="user-role">Admin</p>
                      </p>
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </header>
  );
};

export default Topbar;
