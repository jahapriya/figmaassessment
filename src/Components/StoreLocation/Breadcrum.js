import React from "react";
import { Breadcrumb } from "antd";

const BreadcrumbPage = ({ bread }) => {
  const data = [{ keyValue: "Store Location" }, { keyValue: "New Store" }];

  const breadcrumbItems = bread.map((item, index) => ({
    title: item.keyValue,
    href: "",
  }));

  return <Breadcrumb separator=">" items={breadcrumbItems} />;
};

export default BreadcrumbPage;
