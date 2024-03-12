import { Table, Button, notification, Menu, Dropdown, Modal } from "antd";
import Papa from "papaparse";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import React, { useState, useEffect } from "react";
import { ReactComponent as ExportOutlined } from "../../Images/export.svg";
import { ReactComponent as FunnelPlotOutlined } from "../../Images/fluent_filter-24-filled.svg";
import { ReactComponent as InsertRowAboveOutlined } from "../../Images/tabler_columns-3.svg";
import { ReactComponent as ColumnHeightOutlined } from "../../Images/ic_baseline-density-large.svg";
import { ReactComponent as ExpandOutlined } from "../../Images/ic_outline-fullscreen.svg";

import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Addeditform.css";

const Tabledata = ({
  backOption,
  setEditData,
  setUpdate,
  bread,
  setBread,
  setImgUrl,
  imgurl,
}) => {
  //filter
  const [filters, setFilters] = useState({});
  const [filterVisible, setFilterVisible] = useState(false);

  const handleFilterChange = (dataIndex, selectedKeys, confirm) => {
    confirm();
    setFilters((prevFilters) => ({
      ...prevFilters,
      [dataIndex]: selectedKeys[0],
    }));
  };

  const toggleFilterVisible = () => {
    setFilterVisible(!filterVisible);
  };
  const columns = [
    {
      title: "Store Name",
      dataIndex: "storename",
      key: "storename",
      render: (text, record) => (
        <div style={{ display: "flex" }}>
          <img
            src={record.imgurl}
            alt=""
            style={{ width: 30, height: 30, marginRight: 5 }}
          />
          <div>{text}</div>
        </div>
      ),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <input
            style={{ width: 188, marginBottom: 8, display: "block" }}
            placeholder="Search Name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
              handleFilterChange("storename", selectedKeys, confirm)
            }
          />
          <Button
            type="primary"
            onClick={() =>
              handleFilterChange("storename", selectedKeys, confirm)
            }
            icon={<FunnelPlotOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Filter
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.storename.includes(value),
      filterIcon: (
        <FunnelPlotOutlined
          onClick={toggleFilterVisible}
          style={{ color: filterVisible ? "#1890ff" : undefined }}
        />
      ),
      filteredValue: filters.storename ? [filters.storename] : null,
    },
    {
      title: "Store ID",
      dataIndex: "storeid",
      key: "storeid",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <input
            style={{ width: 188, marginBottom: 8, display: "block" }}
            placeholder="Search ID"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
              handleFilterChange("storeid", selectedKeys, confirm)
            }
          />
          <Button
            type="primary"
            onClick={() => handleFilterChange("storeid", selectedKeys, confirm)}
            icon={<FunnelPlotOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Filter
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.storeid.includes(value),
      filterIcon: (
        <FunnelPlotOutlined
          onClick={toggleFilterVisible}
          style={{ color: filterVisible ? "#1890ff" : undefined }}
        />
      ),
      filteredValue: filters.storeid ? [filters.storeid] : null,
    },
    {
      title: "Area and City",
      dataIndex: "area",
      key: "area",
      render: (_, record) => `${record.area}, ${record.city}`,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <input
            style={{ width: 188, marginBottom: 8, display: "block" }}
            placeholder="Search ID"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
              handleFilterChange("area", selectedKeys, confirm)
            }
          />
          <Button
            type="primary"
            onClick={() => handleFilterChange("area", selectedKeys, confirm)}
            icon={<FunnelPlotOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Filter
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.area.includes(value),
      filterIcon: (
        <FunnelPlotOutlined
          onClick={toggleFilterVisible}
          style={{ color: filterVisible ? "#1890ff" : undefined }}
        />
      ),
      filteredValue: filters.area ? [filters.area] : null,
    },
    {
      title: "Country",
      key: "country",
      dataIndex: "country",
      render: (_, record) => `${record.state}, ${record.country}`,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <input
            style={{ width: 188, marginBottom: 8, display: "block" }}
            placeholder="Search Country"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
              handleFilterChange("country", selectedKeys, confirm)
            }
          />
          <Button
            type="primary"
            onClick={() => handleFilterChange("country", selectedKeys, confirm)}
            icon={<FunnelPlotOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Filter
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.country.includes(value),
      filterIcon: (
        <FunnelPlotOutlined
          onClick={toggleFilterVisible}
          style={{ color: filterVisible ? "#1890ff" : undefined }}
        />
      ),
      filteredValue: filters.country ? [filters.country] : null,
    },
    {
      title: "",
      key: "action",
      className: "Actionname",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="0">
                <a onClick={() => onView(record)}>View</a>
              </Menu.Item>
              <Menu.Item key="1">
                <a onClick={() => onDelete(record)}>Delete</a>
                {/* </Popconfirm> */}
              </Menu.Item>
            </Menu>
          }
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <MoreVertOutlinedIcon />
          </a>
        </Dropdown>
      ),
    },
  ];

  // Delete
  // 3 Modal
  const onDelete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Store?",
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <div>This will delete this store permanently.</div>
          <div>You cannot undo this action</div>
        </div>
      ),

      onOk() {
        setLoading(true);
        let deleteVal = data.filter((i) => {
          return i.id !== record.id;
        });
        localStorage.setItem("myData", JSON.stringify(deleteVal));
        notification.success({
          message: "Deleted Successful",
          description: "Your data has been Deleted successfully!",
        });
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  // View
  const onView = (record) => {
    backOption(true);
    setUpdate(true);
    setBread((i) => [...i, { keyValue: record.storename }]);
    setEditData(record);
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("myData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, [loading]);

  //export
  const exportToExcel = async () => {
    if (data.length) {
      if (loading) return;
      setLoading(true);

      try {
        const datas = data;
        const filteredData = datas.map((item) => {
          const filteredItem = {};
          columns.forEach((column) => {
            filteredItem[column.dataIndex] = item[column.dataIndex];
          });
          return filteredItem;
        });
        const processedData = filteredData.map((item) => ({
          ...item,
          country: item.country > 0 ? item.country : "",
        }));

        const worksheet = XLSX.utils.json_to_sheet(processedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        const blob = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "table_data.xlsx";

        // Trigger the download
        a.click();

        URL.revokeObjectURL(url);
      } finally {
        setLoading(false);
      }
    } else {
      notification.error({ message: "No Data to Export" });
    }
  };

  //CSV
  const exportToCSV = () => {
    try {
      if (data.length) {
        const csv = Papa.unparse(data);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "table_data.csv";
        a.click();
        URL.revokeObjectURL(url);
      } else {
        notification.error({ message: "No Data to Export" });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "An error occurred during CSV export.",
      });
    }
  };

  //PDF
  const exportToPDF = () => {
    if (data.length) {
      const input = document.getElementById("table-container");

      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0);
        pdf.save("table_data.pdf");
      });
    } else {
      notification.error({ message: "No Data to Export" });
    }
  };

  const handleExportClick = ({ key }) => {
    if (key === "csv") {
      exportToCSV();
    } else if (key === "pdf") {
      exportToPDF();
    }
  };

  const exportMenu = (
    <Menu onClick={handleExportClick}>
      <Menu.Item key="csv" icon={<ExportOutlined />}>
        Export as CSV
      </Menu.Item>
      <Menu.Item key="pdf" icon={<ExportOutlined />}>
        Export as PDF
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ width: "100%", padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div className="icons">
          {" "}
          <div className="styleExcel">
            <Dropdown overlay={exportMenu}>
              <Button icon={<ExportOutlined />} className="custom-button">
                <span style={{ fontFamily: "Poppins" }}>Export</span>
              </Button>
            </Dropdown>
          </div>
          <div className="filter">
            <Button
              icon={<FunnelPlotOutlined width="20px" height="20px" />}
              onClick={toggleFilterVisible}
            />
          </div>
          <div className="grid">
            <Button
              icon={<InsertRowAboveOutlined width="20px" height="20px" />}
            />
          </div>
          <div className="column">
            <Button
              icon={<ColumnHeightOutlined width="20px" height="20px" />}
            />
          </div>
          <div className="expand">
            <Button icon={<ExpandOutlined width="20px" height="20px" />} />
          </div>
        </div>
      </div>
      &nbsp;
      <div id="table-container">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};
export default Tabledata;
