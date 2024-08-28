
import './App.css';
import React from "react";
import ProductListFunc from "./component/ProductListFunc";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import CreateProduct from "./component/CreateProduct";

function App() {
  return (
      <>
        <BrowserRouter>
          <div className="container mt-4">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <NavLink to="/product" className="nav-link">Danh sách</NavLink>
              <NavLink to="/create" className="nav-link">Thêm mới</NavLink>
            </nav>
            <Routes>
                <Route path="/create" element={<CreateProduct />} />
              <Route path="/product" element={<ProductListFunc />} />
            </Routes>
          </div>
        </BrowserRouter>
        <ToastContainer />
      </>
  );
}

export default App;
