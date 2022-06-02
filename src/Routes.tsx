import { Route, Routes as DomRoutes, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Faq from "./pages/Faq";
import List from './pages/List';

const Routes = () => (
  <DomRoutes>
    <Route path="/home" element={<Home />} />
    <Route path="/" element={<Navigate replace to="/home" />} />
    <Route path="/list" element={<List />} />
    <Route path="/faq" element={<Faq />} />
  </DomRoutes>
);

export default Routes;
