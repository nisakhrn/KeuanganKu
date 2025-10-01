import React, { useState } from "react";
import { Link } from "react-router-dom"; // Link buat navigasi
import "../styles/register.css"; // pastikan path sesuai

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 FIX BAGIAN INI: dari fetch → jadi localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors({});
    setSuccess("");

    // validasi password
    if (formData.password !== formData.password_confirmation) {
      setErrors({ password_confirmation: "Password tidak sama" });
      return;
    }

    // ambil data user lama dari localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // cek email sudah terdaftar
    const exists = users.find((u) => u.email === formData.email);
    if (exists) {
      setErrors({ email: "Email sudah terdaftar" });
      return;
    }

    // simpan user baru
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // reset form
    setSuccess("Registrasi berhasil! Silakan login.");
    setFormData({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
  };

  return React.createElement(
    "div",
    { className: "register-wrapper" },
    [
      // 🔙 Tombol kembali (panah kiri ke Landing)
      React.createElement(
        Link,
        { key: "backToLanding", to: "/", className: "back-arrow" },
        "←"
      ),

      // Kartu Register
      React.createElement(
        "div",
        { className: "register-card" },
        [
          // Title
          React.createElement(
            "h2",
            { key: "title", className: "register-title" },
            "Register"
          ),

          // Success
          success &&
            React.createElement(
              "p",
              { key: "success", className: "register-success" },
              success
            ),

          // General Error
          errors.general &&
            React.createElement(
              "p",
              { key: "errorGeneral", className: "register-error" },
              errors.general
            ),

          // Form
          React.createElement(
            "form",
            { key: "form", onSubmit: handleSubmit, className: "register-form" },
            [
              // Name
              React.createElement("div", { key: "name", className: "form-group" }, [
                React.createElement("input", {
                  type: "text",
                  name: "name",
                  placeholder: " ",
                  value: formData.name,
                  onChange: handleChange,
                  required: true,
                  className: "form-input",
                }),
                React.createElement("label", { className: "form-label" }, "Name"),
                errors.name &&
                  React.createElement(
                    "p",
                    { className: "register-error" },
                    errors.name
                  ),
              ]),

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
                    { className: "register-error" },
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
                    { className: "register-error" },
                    errors.password
                  ),
              ]),

              // Confirm Password
              React.createElement("div", { key: "password_confirmation", className: "form-group" }, [
                React.createElement("input", {
                  type: "password",
                  name: "password_confirmation",
                  placeholder: " ",
                  value: formData.password_confirmation,
                  onChange: handleChange,
                  required: true,
                  className: "form-input",
                }),
                React.createElement(
                  "label",
                  { className: "form-label" },
                  "Confirm Password"
                ),
                errors.password_confirmation &&
                  React.createElement(
                    "p",
                    { className: "register-error" },
                    errors.password_confirmation
                  ),
              ]),

              // Submit Button
              React.createElement(
                "button",
                { key: "submit", type: "submit", className: "btn-register" },
                "Register"
              ),

              // Link ke Login
              React.createElement(
                "p",
                { key: "loginText", className: "register-login" },
                [
                  "Sudah punya akun? ",
                  React.createElement(
                    Link,
                    { to: "/login", key: "loginLink", className: "login-link" },
                    "Login"
                  )
                ]
              )
            ]
          ),
        ]
      )
    ]
  );
}