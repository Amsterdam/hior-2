import React from "react";
import { Row, Column } from "@amsterdam/asc-ui";

import FilterContextProvider from "./context/FilterContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Routes from "./Routes";

function App() {
  return (
    <FilterContextProvider>
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
    </FilterContextProvider>
  );
}

export default App;
