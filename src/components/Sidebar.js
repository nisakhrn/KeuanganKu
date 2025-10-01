import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", icon: "fas fa-home", label: "Dashboard" },
    { path: "/transaksi", icon: "fas fa-exchange-alt", label: "Transaksi" },
    { path: "/riwayat", icon: "fas fa-history", label: "Riwayat Transaksi" }
  ];

  return React.createElement(
    "aside",
    { className: "sidebar" },
    [
      React.createElement(
        "div",
        { key: "logo", className: "sidebar-logo" },
        [
          React.createElement(
            "div",
            { key: "icon-wrapper", className: "logo-icon" },
            React.createElement("i", { className: "fas fa-folder" })
          ),
          React.createElement("span", { key: "text" }, "KeuanganKu")
        ]
      ),
      React.createElement(
        "nav",
        { key: "nav", className: "sidebar-nav" },
        React.createElement(
          "ul",
          null,
          menuItems.map((item, idx) =>
            React.createElement(
              "li",
              { key: idx },
              React.createElement(
                Link,
                {
                  to: item.path,
                  className: `sidebar-link ${
                    location.pathname === item.path ? "active" : ""
                  }`
                },
                [
                  React.createElement("i", { key: "icon", className: item.icon }),
                  React.createElement("span", { key: "label" }, item.label)
                ]
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        { key: "logout", className: "sidebar-logout" },
        React.createElement(
          "button",
          {
            onClick: () => {
              localStorage.removeItem("currentUser");
              window.location.href = "/login";
            },
            className: "sidebar-link"
          },
          [
            React.createElement("i", { key: "icon", className: "fas fa-sign-out-alt" }),
            React.createElement("span", { key: "label" }, "Keluar")
          ]
        )
      )
    ]
  );
}