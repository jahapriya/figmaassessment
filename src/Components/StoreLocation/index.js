import React, { useState } from "react";
import "../../App.css";
import { Button } from "antd";
import Tabledata from "./Table";
import Addeditform from "./Addeditform";
import BreadcrumbPage from "./Breadcrum";

const StoreLocation = ({ keyValue }) => {
  const [bread, setBread] = useState([{ keyValue: "Store Location" }]);

  const [update, setUpdate] = useState(false);

  const [editData, setEditData] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [isFormVisible, setFormVisible] = useState(false);
  const [isFormmVisible, setFormmVisible] = useState(true);

  const backOption = (val) => {
    setFormVisible(val);
  };
  const handleNewStoreClick = () => {
    setFormVisible(true);
    setFormmVisible(false);
    const newStore = { keyValue: "New Store" };
    setBread((e) => [...e, newStore]);
    setUpdate(false);
  };
  return (
    <div>
      <div className="pageHeader">
        <div className="innerHeader">
          <BreadcrumbPage bread={bread} />
          {isFormmVisible && (
            <Button
              onClick={handleNewStoreClick}
              style={{ background: "rgba(48, 168, 75, 1)", color: "white" }}
            >
              {update ? "Edit Store" : "New Store"}
            </Button>
          )}
        </div>
      </div>
      <div className="table">
        {isFormVisible ? (
          <Addeditform
            backOption={backOption}
            imgUrl={imgUrl}
            editData={editData}
            setImgUrl={setImgUrl}
            setFormmVisible={setFormmVisible}
            update={update}
            setBread={setBread}
          />
        ) : (
          <Tabledata
            imgUrl={imgUrl}
            setBread={setBread}
            setImgUrl={setImgUrl}
            bread={bread}
            backOption={backOption}
            setEditData={setEditData}
            setUpdate={setUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default StoreLocation;
