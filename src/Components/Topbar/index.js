import React from "react";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { DownOutlined } from "@ant-design/icons";
import { Avatar, Space, Dropdown } from "antd";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Col, Row } from "antd";
import userlogo from "../../Images/foodnetworklogo.png";

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
      <div style={{ background: "white", height: "80px" }}>
        <Row>
          <Col span={12} />
          <Col span={12}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "90px",
              }}
            >
              <div>
                <p>
                  English{" "}
                  <LanguageOutlinedIcon style={{ position: "absolute" }} />
                </p>
              </div>
              <div>
                <p>
                  <NotificationsNoneOutlinedIcon />
                </p>
              </div>
              <div>
                <Dropdown
                  menu={{
                    items,
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space
                      style={{ marginTop: "3px" }}
                      direction="vertical"
                      size={16}
                    >
                      <Space
                        style={{ marginTop: "19px", marginRight: "12px" }}
                        wrap
                        size={16}
                      >
                        <Avatar src={userlogo} style={{ marginTop: "2px" }} />
                      </Space>
                    </Space>
                    <Space>
                      <p>
                        Karthikraj
                        <p style={{ fontWeight: "lighter", marginTop: "2px" }}>
                          Admin
                        </p>
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
