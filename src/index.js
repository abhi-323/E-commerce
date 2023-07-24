import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import ProductView from "./components/productView";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { Products } from "./components/productList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <div>
        <Router>
          <Routes>
            <Route>
              <Route element={<App />} index />
              <Route element={<ProductView />} path="/productview" />
              {/* <Route element={<Products />} path="/productlist" /> */}
            </Route>
          </Routes>
        </Router>
      </div>
      {/* <App /> */}
    </RecoilRoot>
  </React.StrictMode>
);
