import { Route, Routes as DomRoutes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import List from './pages/List';

const Routes = () => (
  <DomRoutes>
    <Route path="/home" element={<Home />} />
    <Route path="/" element={<Navigate replace to="/home" />} />
    <Route path="/list" element={<List />} />
    <Route path="/faq" element={<FAQ />} />
  </DomRoutes>
);

export default Routes;
