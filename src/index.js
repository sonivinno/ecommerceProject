import React from "react";
import "./index.css";
import App from "./App";
import Wishlist from "./Components/Wishlist";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DataInformation from "./Components/DataInformation";
import OrderForm from "./Components/OrderHistory/OrderForm";
import Navbar from "./Components/Navbar";
import { createRoot } from "react-dom/client";
import OrderHistory from "./Components/OrderHistory/OrderHistory";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" exact element={<App />} />
      <Route path="/wishlist" exact element={<Wishlist />} />
      <Route path="/datainformation/:id" exact element={<DataInformation />} />
      <Route path="/order" exact element={<OrderForm />} />
      <Route path="/orderhistory" exact element={<OrderHistory/>} />
    </Routes>
  </BrowserRouter>
);

// ReactDOM.render(
//   <BrowserRouter>
//     <Navbar  />
//     <Routes>
//       <Route path="/" exact element={<App />} />
//       <Route path="/wishlist" exact element={<Wishlist />} />
//       <Route path="/datainformation/:id" exact element={<DataInformation />} />
//       <Route path="/order" exact element={<OrderForm />} />
//       {/* <Route path="/orderproduct/:id" exact element={<OrderHistory/>} /> */}
//     </Routes>
//   </BrowserRouter>,
//   document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
