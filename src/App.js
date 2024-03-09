import "./App.css";
import Sidebar from "./Components/Sidebar/index.js";
import MainContent from "./Components/main.js";
import React from "react";
import { Layout } from "antd";
const { Content } = Layout;
function App() {
  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <Sidebar />
        <Layout>
          <Content
            style={{
              margin: "5px 5px 0",
            }}
          >
            <MainContent />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
