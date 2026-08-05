import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./app/page";
import { AdminApp } from "./admin/AdminApp";
import "./app/globals.css";

const isAdminRoute = window.location.pathname === "/admin" || window.location.pathname.startsWith("/admin/");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {isAdminRoute ? <AdminApp /> : <Home />}
  </React.StrictMode>
);
