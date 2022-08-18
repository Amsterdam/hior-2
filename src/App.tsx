import { Row, Column } from "@amsterdam/asc-ui";

import FilterContextProvider from "./filter/FilterContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Routes from "./Routes";

function App() {
  return (
    <FilterContextProvider>
      <Header />

      <Row>
        <Column span={12}>
          <Routes />
        </Column>
      </Row>

      <Footer />
    </FilterContextProvider>
  );
}

export default App;
