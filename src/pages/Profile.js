import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/profile.css"; // Impor CSS untuk halaman ini

export default function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    avatar: null,
  });

  const fileInputRef = useRef(null);

  // Ambil data user saat komponen dimuat
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setCurrentUser(user);

    const nameParts = user.name ? user.name.split(" ") : ["", ""];
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    setFormData({
      firstName,
      lastName,
      phone: user.phone || "",
      email: user.email,
      avatar: user.avatar || null,
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData(prev => ({ ...prev, avatar: base64String }));
        saveAvatarToLocalStorage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveAvatarToLocalStorage = (avatar) => {
    const updatedUser = { ...currentUser, avatar };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    const allUsers = JSON.parse(localStorage.getItem("users_db")) || [];
    const updatedUsers = allUsers.map(u =>
      u.email === currentUser.email ? { ...u, avatar } : u
    );
    localStorage.setItem("users_db", JSON.stringify(updatedUsers));
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };
  
  const handleSaveChanges = (e) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    const updatedCurrentUser = {
      ...currentUser,
      name: fullName,
      phone: formData.phone,
      avatar: formData.avatar,
    };
    
    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));

    const allUsers = JSON.parse(localStorage.getItem("users_db")) || [];
    const updatedUsers = allUsers.map((user) => {
      if (user.email === currentUser.email) {
        return { ...user, name: fullName, phone: formData.phone, avatar: formData.avatar };
      }
      return user;
    });
    localStorage.setItem("users_db", JSON.stringify(updatedUsers));
    
    setCurrentUser(updatedCurrentUser);

    alert("Profil berhasil diperbarui!");
  };

  if (!currentUser) return null;

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Profil</h1>
        </header>

        <div className="profile-page-content">
          {/* Kolom Navigasi Kiri */}
          <div className="profile-nav-card">
            <div className="profile-summary">
              <div className="summary-avatar" onClick={handleAvatarClick}>
                {formData.avatar ? (
                   <img src={formData.avatar} alt="Avatar" />
                ) : (
                  <i className="fas fa-camera"></i>
                )}
              </div>
              <h4>{currentUser.name}</h4>
              <p>{currentUser.email}</p>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: "none" }}/>
            <nav className="profile-nav-menu">
               <ul>
                <li><a href="#informasi" className="active"><i className="fas fa-user-circle"></i> Informasi Profil</a></li>
                <li><a href="#keamanan"><i className="fas fa-shield-alt"></i> Keamanan</a></li>
                <li><a href="#notifikasi"><i className="fas fa-bell"></i> Notifikasi</a></li>
                <li><a href="#preferensi"><i className="fas fa-sliders-h"></i> Preferensi</a></li>
              </ul>
            </nav>
          </div>

          {/* Kolom Konten Utama Kanan */}
          <div className="profile-main-content">
            <form onSubmit={handleSaveChanges} className="profile-info-card">
              <h3 className="card-title">Informasi Profil</h3>
              <div className="form-grid">
                <div className="form-group-profile">
                  <label htmlFor="firstName">Nama Depan</label>
                  <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                </div>
                <div className="form-group-profile">
                  <label htmlFor="lastName">Nama Belakang</label>
                  <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                </div>
                <div className="form-group-profile full-width">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} disabled />
                </div>
                <div className="form-group-profile full-width">
                  <label htmlFor="phone">Nomor Telepon</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-actions-profile">
                <button type="submit" className="btn-save-profile"><i className="fas fa-save"></i> Simpan Perubahan</button>
              </div>
            </form>

            <div className="profile-preferences-card">
              <h3 className="card-title">Preferensi Keuangan</h3>
              <div className="preference-item">
                <div>
                  <label>Mata Uang Utama</label>
                  <p>Mata uang untuk menampilkan semua transaksi</p>
                </div>
                <select className="preference-select">
                  <option value="IDR">Rupiah (IDR)</option>
                  <option value="USD">Dollar (USD)</option>
                </select>
              </div>
               <div className="preference-item">
                <div>
                  <label>Format Tanggal</label>
                  <p>Format untuk menampilkan tanggal</p>
                </div>
                <select className="preference-select">
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                </select>
              </div>
              <div className="preference-item">
                <div>
                  <label>Notifikasi Transaksi</label>
                  <p>Dapatkan notifikasi untuk setiap transaksi</p>
                </div>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}