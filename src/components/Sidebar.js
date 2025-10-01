import React from "react";
import "../styles/sidebar.css";

export default function Sidebar() {
  const currentPath = window.location.pathname;

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profile", path: "/profile" },
    { name: "Pengaturan", path: "/settings" }
  ];

  return React.createElement(
    "div",
    { className: "sidebar" },
    menuItems.map((item, idx) =>
      React.createElement(
        "a",
        {
          key: idx,
          href: item.path,
          className: currentPath === item.path ? "menu-link active" : "menu-link"
        },
        item.name
      )
    )
  );
}