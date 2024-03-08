import "./App.css";
import Sidebar from "./Components/Sidebar/index.js";
import MainContent from "./Components/main.js";
import { Col, Row } from "antd";

function App() {
  return (
    <>
      <div className="App">
        <Row>
          <Col span={20} push={4}>
            <MainContent />
          </Col>
          <Col span={4} pull={20}>
            <Sidebar />
          </Col>
        </Row>
      </div>
      <div></div>
    </>
  );
}

export default App;
