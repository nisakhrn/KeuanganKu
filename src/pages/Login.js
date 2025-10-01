import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ambil daftar semua user dari localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Cari user yang email dan password-nya cocok
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      // Jika user ditemukan, simpan infonya dan pindah ke dashboard
      localStorage.setItem("currentUser", JSON.stringify(user));
      setSuccess("Login berhasil!");
      setErrors({});
      window.location.href = "/dashboard";
    } else {
      // Jika user tidak ditemukan, tampilkan error
      setErrors({ general: "Email atau password salah" });
    }
  };

  return React.createElement(
    "div",
    { className: "login-wrapper" },
    [
      // 🔙 Panah kembali ke Landing (di luar card, pojok kiri layar)
      React.createElement(
        Link,
        { key: "backToLanding", to: "/", className: "back-arrow" },
        "⟵"
      ),

      // Card
      React.createElement(
        "div",
        { className: "login-card" },
        [
          // Title
          React.createElement(
            "h2",
            { key: "title", className: "login-title" },
            "Login"
          ),

          // Success
          success &&
            React.createElement(
              "p",
              { key: "success", className: "login-success" },
              success
            ),

          // Error umum
          errors.general &&
            React.createElement(
              "p",
              { key: "errorGeneral", className: "login-error" },
              errors.general
            ),

          // Form
          React.createElement(
            "form",
            { key: "form", onSubmit: handleSubmit, className: "login-form" },
            [
              // Email
              React.createElement("div", { key: "email", className: "form-group" }, [
                React.createElement("input", {
                  type: "email",
                  name: "email",
                  placeholder: " ",
                  value: formData.email,
                  onChange: handleChange,
                  required: true,
                  className: "form-input",
                }),
                React.createElement("label", { className: "form-label" }, "Email"),
                errors.email &&
                  React.createElement(
                    "p",
                    { className: "login-error" },
                    errors.email
                  ),
              ]),

              // Password
              React.createElement("div", { key: "password", className: "form-group" }, [
                React.createElement("input", {
                  type: "password",
                  name: "password",
                  placeholder: " ",
                  value: formData.password,
                  onChange: handleChange,
                  required: true,
                  className: "form-input",
                }),
                React.createElement("label", { className: "form-label" }, "Password"),
                errors.password &&
                  React.createElement(
                    "p",
                    { className: "login-error" },
                    errors.password
                  ),
              ]),

              // Tombol submit
              React.createElement(
                "button",
                { key: "submit", type: "submit", className: "btn-login" },
                "Login"
              ),

              // Link ke Register
              React.createElement(
                "p",
                { key: "registerText", className: "login-register" },
                [
                  "Belum punya akun? ",
                  React.createElement(
                    Link,
                    { to: "/register", key: "registerLink", className: "register-link" },
                    "Register"
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