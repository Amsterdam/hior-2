import React from "react";
import { Row, Column } from "@amsterdam/asc-ui";
// import { Route, Routes, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Routes from "./Routes";

function App() {
  return (
    <>
      <Row>
        <Column span={12}>
          <Header />
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <Routes />
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <Footer />
        </Column>
      </Row>
    </>
  );
}

export default App;
