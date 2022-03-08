import React from "react";
import { Row, Column } from "@amsterdam/asc-ui";
import { Route, Routes, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

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
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/search" element={<Home />} />
            <Route path="/faq" element={<Home />} />
            <Route path="/contact" element={<Home />} />
          </Routes>
        </Column>
      </Row>

      <Footer />
    </>
  );
}

export default App;
