import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // cek user login
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!savedUser || !token) {
      window.location.href = "/login"; // redirect
    } else {
      setUser(JSON.parse(savedUser));

      // fetch data user
      fetch("http://localhost:8000/dashboard", {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        credentials: "include"
      })
        .then((res) => res.json())
        .then((resData) => {
          setData(resData.data || []);
        })
        .catch(() => {
          setData([]);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return React.createElement(
    "div",
    { className: "dashboard-layout" },
    [
      React.createElement(Sidebar, { key: "sidebar" }),
      React.createElement(
        "div",
        { key: "main", className: "dashboard-main" },
        [
          React.createElement("h2", { key: "title", className: "dashboard-title" }, "Dashboard"),
          user &&
            React.createElement(
              "p",
              { key: "welcome", className: "dashboard-welcome" },
              `Selamat datang, ${user.name || "User"}`
            ),
          React.createElement(
            "button",
            { key: "logout", className: "btn-logout", onClick: handleLogout },
            "Logout"
          ),
          React.createElement(
            "div",
            { key: "content", className: "dashboard-content" },
            data.length > 0
              ? data.map((item, index) =>
                  React.createElement(
                    "div",
                    { key: index, className: "data-card" },
                    [
                      React.createElement("h4", { key: "title" }, item.title || "Tanpa Judul"),
                      React.createElement("p", { key: "desc" }, item.description || "Tidak ada deskripsi")
                    ]
                  )
                )
              : React.createElement(
                  "p",
                  { className: "dashboard-empty" },
                  "Belum ada data untuk akun ini."
                )
          )
        ]
      )
    ]
  );
}