import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpense: 0,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setCurrentUser(user);

    const key = `transactions_${user.email}`;
    const allTransactions = JSON.parse(localStorage.getItem(key)) || [];
    setTransactions(allTransactions);
    calculateStats(allTransactions);
  }, []);

  const calculateStats = (txs) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let income = 0;
    let expense = 0;

    txs.forEach((tx) => {
      const txDate = new Date(tx.tanggal);
      if (txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear) {
        if (tx.jenis === "pemasukan") {
          income += parseFloat(tx.jumlah);
        } else {
          expense += parseFloat(tx.jumlah);
        }
      }
    });

    setStats({
      totalBalance: income - expense,
      monthlyIncome: income,
      monthlyExpense: expense,
    });
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  if (!currentUser) return null;

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="user-info">
            <span className="notification-icon">
              <i className="fas fa-bell"></i>
              <span className="notification-badge"></span>
            </span>
            <span className="user-name">{currentUser.name}</span>
            <button onClick={handleLogout} className="logout-btn" title="Keluar">
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="dashboard-content">
          {/* Stats */}
          <div className="stats-grid">
            {/* Saldo Total */}
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Saldo Total</span>
                <div className="stat-icon purple">
                  <i className="fas fa-wallet"></i>
                </div>
              </div>
              <div className="stat-value">{formatRupiah(stats.totalBalance)}</div>
            </div>

            {/* Pemasukan */}
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Pemasukan Bulan Ini</span>
                <div className="stat-icon green">
                  <i className="fas fa-arrow-down"></i>
                </div>
              </div>
              <div className="stat-value">{formatRupiah(stats.monthlyIncome)}</div>
            </div>

            {/* Pengeluaran */}
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Pengeluaran Bulan Ini</span>
                <div className="stat-icon red">
                  <i className="fas fa-arrow-up"></i>
                </div>
              </div>
              <div className="stat-value">{formatRupiah(stats.monthlyExpense)}</div>
            </div>
          </div>

          {/* Transaksi Terbaru */}
          <div className="transactions-card">
            <div className="transactions-header">
              <h3>Transaksi Terbaru</h3>
              <Link to="/transaksi" className="view-all">Tambah Transaksi</Link>
            </div>
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>DESKRIPSI</th>
                  <th>KATEGORI</th>
                  <th>TANGGAL</th>
                  <th className="text-right">JUMLAH</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="empty-state">
                      <i className="fas fa-exchange-alt"></i>
                      <p>Belum ada transaksi</p>
                      <Link to="/transaksi" className="add-btn">
                        + Tambah Transaksi
                      </Link>
                    </td>
                  </tr>
                ) : (
                  transactions.slice(0, 5).map((tx, idx) => (
                    <tr key={idx}>
                      <td>{tx.deskripsi}</td>
                      <td>{tx.kategori}</td>
                      <td>{new Date(tx.tanggal).toLocaleDateString("id-ID")}</td>
                      <td
                        className={`text-right ${
                          tx.jenis === "pemasukan" ? "positive" : "negative"
                        }`}
                      >
                        {tx.jenis === "pemasukan" ? "+" : "-"} {formatRupiah(tx.jumlah)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}