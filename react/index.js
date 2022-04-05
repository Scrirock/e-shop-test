import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import { Home } from "./pages/Home/Home";
import { Contact } from "./pages/Contact/Contact";
import { UserAccount } from "./pages/UserAccount/UserAccount";
import { Header } from "./components/Header/Header";
import { Promotion } from "./pages/Promotion/Promotion";
import { RouteNotFound } from "./pages/RouteNotFound/RouteNotFound";

ReactDOM.render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/userAccount" element={<UserAccount />} />
      <Route path="/promotions" element={<Promotion />} />
      <Route path="*" element={<RouteNotFound />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
