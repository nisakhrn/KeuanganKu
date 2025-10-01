// src/pages/Riwayat.js

import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/riwayat.css"; // Impor CSS khusus untuk halaman ini

export default function Riwayat() {
  const [currentUser, setCurrentUser] = useState(null);
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  
  // State untuk filter
  const [filters, setFilters] = useState({
    search: "",
    type: "semua", // 'semua', 'pemasukan', 'pengeluaran'
    startDate: "",
    endDate: "",
  });

  // Ambil data user dan transaksi saat komponen dimuat
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setCurrentUser(user);

    const key = `transactions_${user.email}`;
    const savedTransactions = JSON.parse(localStorage.getItem(key)) || [];
    setAllTransactions(savedTransactions);
    setFilteredTransactions(savedTransactions); // Awalnya tampilkan semua
  }, []);
  
  // Logika untuk memfilter transaksi setiap kali filter atau data transaksi berubah
  useEffect(() => {
    let transactions = [...allTransactions];

    // 1. Filter berdasarkan pencarian (deskripsi)
    if (filters.search) {
      transactions = transactions.filter(tx =>
        tx.deskripsi.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // 2. Filter berdasarkan jenis
    if (filters.type !== "semua") {
      transactions = transactions.filter(tx => tx.jenis === filters.type);
    }

    // 3. Filter berdasarkan tanggal mulai
    if (filters.startDate) {
      transactions = transactions.filter(tx => new Date(tx.tanggal) >= new Date(filters.startDate));
    }
    
    // 4. Filter berdasarkan tanggal akhir
    if (filters.endDate) {
      transactions = transactions.filter(tx => new Date(tx.tanggal) <= new Date(filters.endDate));
    }
    
    setFilteredTransactions(transactions);
  }, [filters, allTransactions]);


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = (transactionId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      const updatedTransactions = allTransactions.filter(tx => tx.id !== transactionId);
      
      const key = `transactions_${currentUser.email}`;
      localStorage.setItem(key, JSON.stringify(updatedTransactions));
      setAllTransactions(updatedTransactions); // Update state untuk re-render
      alert("Transaksi berhasil dihapus!");
    }
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  if (!currentUser) return null;

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Riwayat Transaksi</h1>
        </header>

        <div className="dashboard-content">
          <div className="riwayat-card">
            {/* Filter Section */}
            <div className="riwayat-filters">
              <input
                type="text"
                name="search"
                placeholder="Cari deskripsi..."
                value={filters.search}
                onChange={handleFilterChange}
                className="filter-input"
              />
              <select name="type" value={filters.type} onChange={handleFilterChange} className="filter-select">
                <option value="semua">Semua Jenis</option>
                <option value="pemasukan">Pemasukan</option>
                <option value="pengeluaran">Pengeluaran</option>
              </select>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="filter-date"
              />
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="filter-date"
              />
            </div>

            {/* Transactions Table */}
            <div className="table-wrapper-riwayat">
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>DESKRIPSI</th>
                    <th>KATEGORI</th>
                    <th>TANGGAL</th>
                    <th className="text-right">JUMLAH</th>
                    <th className="text-center">AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx) => (
                      <tr key={tx.id}>
                        <td>{tx.deskripsi}</td>
                        <td>{tx.kategori}</td>
                        <td>{new Date(tx.tanggal).toLocaleDateString("id-ID")}</td>
                        <td className={`text-right ${tx.jenis === "pemasukan" ? "positive" : "negative"}`}>
                          {tx.jenis === "pemasukan" ? "+ " : "- "}
                          {formatRupiah(tx.jumlah)}
                        </td>
                        <td className="text-center">
                          <button onClick={() => handleDelete(tx.id)} className="delete-btn" title="Hapus">
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="empty-state">
                        <i className="fas fa-search"></i>
                        <p>Tidak ada transaksi yang cocok dengan filter Anda.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}