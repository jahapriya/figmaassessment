import React, { useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import logo from "../../Images/tasklogo.png";
import { Menu } from "antd";
import StoreLocation from "../StoreLocation";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Store Management", "sub1", null, [
    getItem("Store Location", "Store Location", <LocationOnOutlinedIcon />),
  ]),
];
const Sidebar = () => {
  const [keyValue, setKeyValue] = useState("");
  const onClick = (e) => {
    setKeyValue(e.key);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "white",
        borderRight: "0.1px solid #cacaca",
      }}
    >
      <div
        style={{
          height: "30px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <img
          style={{
            height: "62px",
            width: "41.48px",
            top: "15px",
            position: "relative",
            left: "15px",
          }}
          src={logo}
          alt=""
        />
        <p
          className="logoname"
          style={{
            fontSize: "14px",
            margin: "36px 0px 0px 26px",
            fontWeight: 500,
          }}
        >
          SMART SIGNAGE
        </p>
      </div>
      <Menu
        onClick={onClick}
        style={{
          width: "100%",
          marginTop: "50px",
          borderTop: "0.1px solid #cacaca",
          borderBottom: "0.1px solid #cacaca",
        }}
        defaultSelectedKeys={["Store Location"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
      <div style={{ display: "none" }}>
        <StoreLocation keyValue={"Store Location"} />
      </div>
    </div>
  );
};
export default Sidebar;
