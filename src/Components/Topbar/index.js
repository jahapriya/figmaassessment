import React from "react";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { DownOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
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
                <div>
                  <p className="fontfamily" style={{ fontWeight: "500" }}>
                    English
                  </p>
                </div>
                &nbsp;&nbsp;
                <div>
                  <p>
                    <LanguageOutlinedIcon />
                  </p>
                </div>
              </div>
              <div className="notifications">
                <p>
                  <NotificationsNoneOutlinedIcon />
                </p>
              </div>
              <div className="user-dropdown">
                <Dropdown menu={{ items }}>
                  <a className="anchorcss" onClick={(e) => e.preventDefault()}>
                    <div>
                      <Avatar src={userlogo} />
                    </div>
                    &nbsp;
                    <div className="user-role">
                      <p className="fontfamily">Karthikraj</p>
                      <p
                        className="fontfamily"
                        style={{ color: "Grey", marginTop: "-10px" }}
                      >
                        Admin
                      </p>
                    </div>
                    &nbsp; &nbsp;
                    <div className="arrowcss">
                      <DownOutlined style={{ color: "Grey" }} />
                    </div>
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
