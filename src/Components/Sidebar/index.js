import React, { useState } from "react";
import logo from "../../Images/tasklogo.png";
import { Layout, Menu } from "antd";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
// import "./Sidebar.css";

const { Sider } = Layout;

function Sidebar({ onSelectMenuItem }) {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const [collapse, setCollapse] = useState(true);

  const items = [
    getItem("Store Management", "sub1", null, [
      getItem("Store Location", "Store Location", <LocationOnOutlinedIcon />),
    ]),
  ];
  return (
    <div className="sidebar">
      <Sider
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
        className={!collapse ? "siderroll" : ""}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
          setCollapse(collapsed);
        }}
      >
        <div
          className="logo-container"
          style={{ display: "flex", marginLeft: "15px", marginTop: "16px" }}
        >
          <img className="logo" src={logo} alt="" />
          <p className="logoname">SMART SIGNAGE</p>{" "}
        </div>
        <Menu
          style={{
            width: "100%",
            marginTop: "9px",
            borderTop: "0.1px solid #cacaca",
            borderBottom: "0.1px solid #cacaca",
          }}
          theme="light"
          mode="inline"
          defaultOpenKeys={["sub1"]}
          defaultSelectedKeys={["Store Location"]}
          items={items}
        ></Menu>
      </Sider>
    </div>
  );
}

export default Sidebar;
