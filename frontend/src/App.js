import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import PasswordReset from "./Components/PasswordReset/PasswordReset";
import QrCodeScanner from "./Pages/Qr/Qr";
import Product from "./Pages/Product/Product";
import Navbar from "./Layout/Navbar/Navbar";
import ClaimWarranty from "./Pages/ClaimWarranty/ClaimWarranty";
import Layout from "./Layout/Layout/Layout";
import ViewWarranties from "./Pages/ViewWarranties/ViewWarranties";

const App = () => {
  const userId = localStorage.getItem("userId");

  return (
    <div>
      <BrowserRouter>
        {userId ? <Navbar /> : <></>}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset" element={<PasswordReset />} />

          <Route path="/home" element={<Layout />}>
            <Route path="scan/:userId" element={<QrCodeScanner />} />
            <Route path="view-warranties" element={<ViewWarranties />} />
            <Route path="product/:productId" element={<Product />} />
            <Route path="claim/:productId" element={<ClaimWarranty />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
