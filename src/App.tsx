import FilterContextProvider from "./filter/FilterContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Routes from "./Routes";

function App() {
  return (
    <FilterContextProvider>
      <Header />

      <Routes />

      <Footer />
    </FilterContextProvider>
  );
}

export default App;
