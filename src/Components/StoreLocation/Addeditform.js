import { Form, Input, Select, Row, Col, Button, notification } from "antd";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import "./Addeditform.css";

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const Addeditform = ({
  backOption,
  setUpdate,
  editData,
  update,
  setBread,
  setFormmVisible,
}) => {
  const [inputValue, setInputValue] = useState(() => {
    const storedData = localStorage.getItem("myData");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "",
    },
  ]);

  // Submit
  const onFinish = (values) => {
    if (update) {
      const updatedData = inputValue.map((i) => {
        if (i.id === editData.id) {
          return {
            ...i,
            area: values.area,
            city: values.city,
            country: values.country,
            description: values.description,
            id: editData.id,
            latlong: values.latlong,
            pincode: values.pincode,
            state: values.state,
            storeid: values.storeid,
            storename: values.storename,
            timezone: values.timezone,
            zone: values.zone,
          };
        }
        return i;
      });
      setInputValue(updatedData);
      notification.success({
        message: "Submission Successful",
        description: "Updated Successfully!",
      });
      setTimeout(() => {
        onReset();
      }, 1000);
    } else {
      const id = inputValue.length + 1;
      setInputValue((prevValues) => [...prevValues, { ...values, id }]);
      notification.success({
        message: "Submission Successful",
        description: "New Store Created Successfully!",
      });
      setTimeout(() => {
        onReset();
      }, 1000);
    }
  };

  //Back
  const onReset = () => {
    setBread([{ keyValue: "Store Location" }]);
    backOption(false);
    setFormmVisible(true);
    setUpdate(false);
  };

  //Local storage
  useEffect(() => {
    localStorage.setItem("myData", JSON.stringify(inputValue));
  }, [inputValue]);

  //upload image
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <div className="form">
      <Form onFinish={onFinish} initialValues={update && editData}>
        <Row className="formcss">
          <Col className="uploadfile" span={2}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
          <Col className="fields" span={22}>
            <Row>
              <Col span={4}> </Col>
              <Col span={9}>
                <Form.Item
                  label={
                    <span>
                      Store Name
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="storename"
                >
                  <Input placeholder="Store Name" required></Input>
                </Form.Item>
              </Col>
              &nbsp;&nbsp;
              <Col span={9}>
                <Form.Item
                  label={
                    <span>
                      Store ID
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="storeid"
                >
                  <Input placeholder="Store ID" required></Input>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={4}></Col>
              <Col span={18}>
                <Form.Item label="Description" name="description">
                  <Input placeholder="Description" required></Input>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={4}></Col>
              <Col span={9}>
                <Form.Item
                  label={
                    <span>
                      Time Zone
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="timezone"
                >
                  <Select>
                    <Select.Option value="Kolkata">Kolkata time</Select.Option>
                    <Select.Option value="India">India time</Select.Option>
                    <Select.Option value="US">US time</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              &nbsp;&nbsp;
              <Col span={9}>
                <Form.Item
                  label={
                    <span>
                      Country
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="country"
                >
                  <Select>
                    <Select.Option value="Iceland">Iceland</Select.Option>
                    <Select.Option value="India">India</Select.Option>
                    <Select.Option value="Iran">Iran</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={4}></Col>
              <Col span={9}>
                <Form.Item
                  label={
                    <span>
                      State
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="state"
                >
                  <Select>
                    <Select.Option value="Karnataka">Karnataka</Select.Option>
                    <Select.Option value="Kerala">Kerala</Select.Option>
                    <Select.Option value="Haryana">Haryana</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              &nbsp;&nbsp;
              <Col span={9}>
                <Form.Item
                  label={
                    <span>
                      City
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="city"
                >
                  <Select>
                    <Select.Option value="Hyderabad">Hyderabad </Select.Option>
                    <Select.Option value="Ahmadabad">Ahmadabad</Select.Option>
                    <Select.Option value="Jaipur">Jaipur </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={4}></Col>
              <Col span={9}>
                <Form.Item
                  label={
                    <span>
                      Area
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="area"
                >
                  <Input placeholder="Area" required></Input>
                </Form.Item>
              </Col>
              &nbsp;&nbsp;
              <Col span={9}>
                <Form.Item
                  label={
                    <span>
                      Pincode
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="pincode"
                >
                  <Input placeholder="Pincode" required></Input>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={4}></Col>
              <Col span={9}>
                <Form.Item
                  label={
                    <span>
                      Latitude & Longitude
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="latlong"
                >
                  <Input placeholder="Latitude & Longitude" required></Input>
                </Form.Item>
              </Col>
              &nbsp;&nbsp;
              <Col span={9}>
                <Form.Item
                  label={
                    <span>
                      Zone
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  name="zone"
                >
                  <Input placeholder="Zone" required></Input>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="buttoncss">
          <Row>
            <Col span={10}>
              {" "}
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="button"
                  onClick={onReset}
                  style={{ background: "rgba(48, 168, 75, 1)", color: "white" }}
                >
                  Back
                </Button>
              </Form.Item>
            </Col>
            &nbsp; &nbsp;
            <Col span={10}>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{ background: "rgba(48, 168, 75, 1)", color: "white" }}
                >
                  {update ? "Update" : "Create"}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

export default Addeditform;
