import React from "react";
import { Row, Column } from "@amsterdam/asc-ui";
import { Route, Routes, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import List from './pages/List';

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
            <Route path="/list" element={<List />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
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
