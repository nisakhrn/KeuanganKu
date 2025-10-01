// TransaksiPage.js
import React, { useState } from 'react';
import './Transaksi.css';

const TransaksiPage = () => {
  const [formData, setFormData] = useState({
    jenisTransaksi: 'pemasukan',
    deskripsi: '',
    kategori: '',
    jumlah: '',
    tanggal: new Date().toISOString().split('T')[0]
  });

  const [transactions, setTransactions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.deskripsi || !formData.kategori || !formData.jumlah || !formData.tanggal) {
      alert('Mohon lengkapi semua field!');
      return;
    }
    
    const newTransaction = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };

    setTransactions(prev => [newTransaction, ...prev]);

    // Reset form
    setFormData({
      jenisTransaksi: 'pemasukan',
      deskripsi: '',
      kategori: '',
      jumlah: '',
      tanggal: new Date().toISOString().split('T')[0]
    });

    alert('Transaksi berhasil disimpan!');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getCategoryOptions = () => {
    if (formData.jenisTransaksi === 'pemasukan') {
      return ['Gaji', 'Bonus', 'Investasi', 'Lainnya'];
    }
    return ['Makanan', 'Transportasi', 'Belanja', 'Tagihan', 'Hiburan', 'Kesehatan', 'Pendidikan', 'Lainnya'];
  };

  return (
    <div className="transaksi-container">
      <div className="transaksi-form-card">
        <h3 className="transaksi-title">Tambah Transaksi Baru</h3>
        
        <div className="transaksi-form">
          {/* Jenis Transaksi */}
          <div className="form-full-width">
            <div className="jenis-transaksi-group">
              <div className="jenis-option">
                <input 
                  type="radio" 
                  id="jenis-pemasukan" 
                  name="jenisTransaksi" 
                  value="pemasukan" 
                  checked={formData.jenisTransaksi === 'pemasukan'}
                  onChange={handleInputChange}
                  className="radio-hidden" 
                />
                <label 
                  htmlFor="jenis-pemasukan" 
                  className={`jenis-label ${formData.jenisTransaksi === 'pemasukan' ? 'jenis-label-active-pemasukan' : ''}`}
                >
                  <i className="fas fa-arrow-down"></i>
                  <span>Pemasukan</span>
                </label>
              </div>
              <div className="jenis-option">
                <input 
                  type="radio" 
                  id="jenis-pengeluaran" 
                  name="jenisTransaksi" 
                  value="pengeluaran"
                  checked={formData.jenisTransaksi === 'pengeluaran'}
                  onChange={handleInputChange}
                  className="radio-hidden"
                />
                <label 
                  htmlFor="jenis-pengeluaran" 
                  className={`jenis-label ${formData.jenisTransaksi === 'pengeluaran' ? 'jenis-label-active-pengeluaran' : ''}`}
                >
                  <i className="fas fa-arrow-up"></i>
                  <span>Pengeluaran</span>
                </label>
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="form-group">
            <input 
              type="text" 
              id="deskripsi" 
              name="deskripsi" 
              value={formData.deskripsi}
              onChange={handleInputChange}
              className="form-input" 
              placeholder="Deskripsi"
              required
            />
          </div>

          {/* Kategori */}
          <div className="form-group form-select-wrapper">
            <select 
              id="kategori" 
              name="kategori" 
              value={formData.kategori}
              onChange={handleInputChange}
              className="form-input form-select" 
              required
            >
              <option value="" disabled>Pilih Kategori</option>
              {getCategoryOptions().map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="select-icon">
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>

          {/* Jumlah */}
          <div className="form-group">
            <input 
              type="number" 
              id="jumlah" 
              name="jumlah" 
              value={formData.jumlah}
              onChange={handleInputChange}
              className="form-input" 
              placeholder="Jumlah (Rp)"
              min="0"
              required
            />
          </div>

          {/* Tanggal */}
          <div className="form-group">
            <input 
              type="date" 
              id="tanggal" 
              name="tanggal" 
              value={formData.tanggal}
              onChange={handleInputChange}
              className="form-input" 
              required
            />
          </div>

          {/* Submit Button */}
          <div className="form-full-width">
            <button 
              onClick={handleSubmit}
              className="submit-button"
            >
              <i className="fas fa-save"></i>Simpan Transaksi
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      {transactions.length > 0 && (
        <div className="transactions-list-card">
          <h3 className="transaksi-title">Transaksi yang Baru Ditambahkan</h3>
          <div className="table-wrapper">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th className="table-header">Deskripsi</th>
                  <th className="table-header">Kategori</th>
                  <th className="table-header">Tanggal</th>
                  <th className="table-header table-header-right">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 5).map((transaction) => (
                  <tr key={transaction.id} className="table-row">
                    <td className="table-cell">
                      <div className="transaction-desc">
                        <div className={`transaction-icon ${transaction.jenisTransaksi === 'pemasukan' ? 'icon-pemasukan' : 'icon-pengeluaran'}`}>
                          <i className={`fas ${transaction.jenisTransaksi === 'pemasukan' ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i>
                        </div>
                        <span className="transaction-text">{transaction.deskripsi}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className="category-badge">
                        {transaction.kategori}
                      </span>
                    </td>
                    <td className="table-cell table-date">
                      {formatDate(transaction.tanggal)}
                    </td>
                    <td className="table-cell table-cell-right">
                      <span className={`amount-text ${transaction.jenisTransaksi === 'pemasukan' ? 'amount-pemasukan' : 'amount-pengeluaran'}`}>
                        {transaction.jenisTransaksi === 'pemasukan' ? '+' : '-'} {formatCurrency(transaction.jumlah)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransaksiPage;