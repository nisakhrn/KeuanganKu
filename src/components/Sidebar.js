import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/sidebar.css"; // Pastikan Anda memiliki file CSS untuk sidebar

export default function Sidebar() {
  const location = useLocation();

  // Konfigurasi menu, mudah untuk ditambah atau diubah
  const menuItems = [
    { path: "/dashboard", icon: "fas fa-home", label: "Dashboard" },
    { path: "/transaksi", icon: "fas fa-exchange-alt", label: "Transaksi" },
    { path: "/riwayat", icon: "fas fa-history", label: "Riwayat Transaksi" },
  ];

  // Fungsi untuk handle logout
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <i className="fas fa-wallet"></i>
        </div>
        <span>KeuanganKu</span>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                // Menambahkan class 'active' jika path saat ini sama dengan path menu
                className={`sidebar-link ${
                  location.pathname === item.path ? "active" : ""
                }`}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-logout">
        <button onClick={handleLogout} className="sidebar-link logout-button">
          <i className="fas fa-sign-out-alt"></i>
          <span>Keluar</span>
        </button>
      </div>
    </aside>
  );
}