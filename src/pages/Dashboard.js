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
    monthlyExpense: 0
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setCurrentUser(user);

    const allTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
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
      monthlyExpense: expense
    });
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(number);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  if (!currentUser) return null;

  return React.createElement(
    "div",
    { className: "dashboard-layout" },
    [
      React.createElement(Sidebar, { key: "sidebar" }),

      React.createElement(
        "div",
        { key: "main", className: "dashboard-main" },
        [
          // Header
          React.createElement(
            "header",
            { key: "header", className: "dashboard-header" },
            [
              React.createElement(
                "h1",
                { key: "title", className: "dashboard-title" },
                "Dashboard"
              ),
              React.createElement(
                "div",
                { key: "user-info", className: "user-info" },
                [
                  React.createElement(
                    "span",
                    { key: "notif", className: "notification-icon" },
                    [
                      React.createElement("i", {
                        key: "bell",
                        className: "fas fa-bell"
                      }),
                      React.createElement("span", {
                        key: "badge",
                        className: "notification-badge"
                      })
                    ]
                  ),
                  React.createElement(
                    "span",
                    { key: "name", className: "user-name" },
                    currentUser.name
                  ),
                  React.createElement(
                    "button",
                    {
                      key: "logout",
                      onClick: handleLogout,
                      className: "logout-btn",
                      title: "Keluar"
                    },
                    React.createElement("i", { className: "fas fa-sign-out-alt" })
                  )
                ]
              )
            ]
          ),

          // Content
          React.createElement(
            "div",
            { key: "content", className: "dashboard-content" },
            [
              // Stats Cards
              React.createElement(
                "div",
                { key: "stats", className: "stats-grid" },
                [
                  // Saldo Total
                  React.createElement(
                    "div",
                    { key: "balance", className: "stat-card" },
                    [
                      React.createElement(
                        "div",
                        { key: "header", className: "stat-header" },
                        [
                          React.createElement(
                            "span",
                            { key: "label", className: "stat-label" },
                            "Saldo Total"
                          ),
                          React.createElement(
                            "div",
                            { key: "icon", className: "stat-icon purple" },
                            React.createElement("i", { className: "fas fa-wallet" })
                          )
                        ]
                      ),
                      React.createElement(
                        "div",
                        { key: "value", className: "stat-value" },
                        formatRupiah(stats.totalBalance)
                      ),
                      React.createElement(
                        "div",
                        { key: "change", className: "stat-change positive" },
                        [
                          React.createElement("i", {
                            key: "arrow",
                            className: "fas fa-arrow-up"
                          }),
                          " 0% dari bulan lalu"
                        ]
                      )
                    ]
                  ),

                  // Pemasukan
                  React.createElement(
                    "div",
                    { key: "income", className: "stat-card" },
                    [
                      React.createElement(
                        "div",
                        { key: "header", className: "stat-header" },
                        [
                          React.createElement(
                            "span",
                            { key: "label", className: "stat-label" },
                            "Pemasukan Bulan Ini"
                          ),
                          React.createElement(
                            "div",
                            { key: "icon", className: "stat-icon green" },
                            React.createElement("i", { className: "fas fa-arrow-down" })
                          )
                        ]
                      ),
                      React.createElement(
                        "div",
                        { key: "value", className: "stat-value" },
                        formatRupiah(stats.monthlyIncome)
                      ),
                      React.createElement(
                        "div",
                        { key: "change", className: "stat-change positive" },
                        [
                          React.createElement("i", {
                            key: "arrow",
                            className: "fas fa-arrow-up"
                          }),
                          " 0% dari bulan lalu"
                        ]
                      )
                    ]
                  ),

                  // Pengeluaran
                  React.createElement(
                    "div",
                    { key: "expense", className: "stat-card" },
                    [
                      React.createElement(
                        "div",
                        { key: "header", className: "stat-header" },
                        [
                          React.createElement(
                            "span",
                            { key: "label", className: "stat-label" },
                            "Pengeluaran Bulan Ini"
                          ),
                          React.createElement(
                            "div",
                            { key: "icon", className: "stat-icon red" },
                            React.createElement("i", { className: "fas fa-arrow-up" })
                          )
                        ]
                      ),
                      React.createElement(
                        "div",
                        { key: "value", className: "stat-value" },
                        formatRupiah(stats.monthlyExpense)
                      ),
                      React.createElement(
                        "div",
                        { key: "change", className: "stat-change negative" },
                        [
                          React.createElement("i", {
                            key: "arrow",
                            className: "fas fa-arrow-up"
                          }),
                          " 0% dari bulan lalu"
                        ]
                      )
                    ]
                  )
                ]
              ),

              // Grafik & Tagihan
              React.createElement(
                "div",
                { key: "chart-section", className: "chart-section" },
                [
                  // Grafik
                  React.createElement(
                    "div",
                    { key: "chart", className: "chart-card" },
                    [
                      React.createElement(
                        "div",
                        { key: "header", className: "chart-header" },
                        [
                          React.createElement(
                            "h3",
                            { key: "title" },
                            "Grafik Pengeluaran & Pemasukan"
                          ),
                          React.createElement(
                            "select",
                            { key: "filter", className: "chart-filter" },
                            [
                              React.createElement(
                                "option",
                                { key: "7d", value: "7" },
                                "7 Hari Terakhir"
                              ),
                              React.createElement(
                                "option",
                                { key: "30d", value: "30" },
                                "30 Hari Terakhir"
                              )
                            ]
                          )
                        ]
                      ),
                      React.createElement(
                        "div",
                        { key: "chart-area", className: "chart-placeholder" },
                        "Grafik akan muncul di sini"
                      )
                    ]
                  ),

                  // Tagihan Mendatang
                  React.createElement(
                    "div",
                    { key: "bills", className: "bills-card" },
                    [
                      React.createElement(
                        "div",
                        { key: "header", className: "bills-header" },
                        [
                          React.createElement("h3", { key: "title" }, "Tagihan Mendatang"),
                          React.createElement(
                            "a",
                            { key: "link", href: "#", className: "view-all" },
                            "Lihat Semua"
                          )
                        ]
                      ),
                      React.createElement(
                        "div",
                        { key: "empty", className: "empty-state" },
                        [
                          React.createElement("i", {
                            key: "icon",
                            className: "fas fa-file-invoice"
                          }),
                          React.createElement("p", { key: "text" }, "Belum ada tagihan berkala"),
                          React.createElement(
                            "button",
                            { key: "btn", className: "add-btn" },
                            "+ Tambah Tagihan"
                          )
                        ]
                      )
                    ]
                  )
                ]
              ),

              // Transaksi Terbaru
              React.createElement(
                "div",
                { key: "transactions", className: "transactions-card" },
                [
                  React.createElement(
                    "div",
                    { key: "header", className: "transactions-header" },
                    [
                      React.createElement("h3", { key: "title" }, "Transaksi Terbaru"),
                      React.createElement(
                        Link,
                        { key: "link", to: "/riwayat", className: "view-all" },
                        "Lihat Semua"
                      )
                    ]
                  ),
                  React.createElement(
                    "table",
                    { key: "table", className: "transactions-table" },
                    [
                      React.createElement(
                        "thead",
                        { key: "thead" },
                        React.createElement("tr", null, [
                          React.createElement("th", { key: "desc" }, "DESKRIPSI"),
                          React.createElement("th", { key: "cat" }, "KATEGORI"),
                          React.createElement("th", { key: "date" }, "TANGGAL"),
                          React.createElement("th", { key: "amount", className: "text-right" }, "JUMLAH")
                        ])
                      ),
                      React.createElement(
                        "tbody",
                        { key: "tbody" },
                        transactions.length === 0
                          ? React.createElement(
                              "tr",
                              { key: "empty" },
                              React.createElement(
                                "td",
                                { colSpan: "4", className: "empty-state" },
                                [
                                  React.createElement("i", {
                                    key: "icon",
                                    className: "fas fa-exchange-alt"
                                  }),
                                  React.createElement("p", { key: "text" }, "Belum ada transaksi"),
                                  React.createElement(
                                    Link,
                                    { key: "link", to: "/transaksi", className: "add-btn" },
                                    "+ Tambah Transaksi"
                                  )
                                ]
                              )
                            )
                          : transactions.slice(0, 5).map((tx, idx) =>
                              React.createElement("tr", { key: idx }, [
                                React.createElement("td", { key: "desc" }, tx.deskripsi),
                                React.createElement("td", { key: "cat" }, tx.kategori),
                                React.createElement(
                                  "td",
                                  { key: "date" },
                                  new Date(tx.tanggal).toLocaleDateString("id-ID")
                                ),
                                React.createElement(
                                  "td",
                                  {
                                    key: "amount",
                                    className: `text-right ${
                                      tx.jenis === "pemasukan" ? "positive" : "negative"
                                    }`
                                  },
                                  `${tx.jenis === "pemasukan" ? "+" : "-"} ${formatRupiah(tx.jumlah)}`
                                )
                              ])
                            )
                      )
                    ]
                  )
                ]
              )
            ]
          )
        ]
      )
    ]
  );
}