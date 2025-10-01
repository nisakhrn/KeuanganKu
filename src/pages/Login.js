import React, { useState } from "react";
import "../styles/login.css"; // pastikan path sesuai

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // penting kalau backend pakai session/cookie
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess("Login berhasil!");
        setErrors({});
        // Simpan token / data user kalau backend kasih JWT atau session
        localStorage.setItem("token", data.token || "");
        localStorage.setItem("user", JSON.stringify(data.user || {}));

        // redirect ke dashboard misalnya
        window.location.href = "/dashboard";
      } else {
        const data = await response.json();
        setErrors(data.errors || { general: "Email atau password salah" });
      }
    } catch (err) {
      setErrors({ general: "Gagal terhubung ke server" });
    }
  };

  return React.createElement(
    "div",
    { className: "login-wrapper" },
    React.createElement(
      "div",
      { className: "login-card" },
      [
        React.createElement(
          "h2",
          { key: "title", className: "login-title" },
          "Login"
        ),
        success &&
          React.createElement(
            "p",
            { key: "success", className: "login-success" },
            success
          ),
        errors.general &&
          React.createElement(
            "p",
            { key: "errorGeneral", className: "login-error" },
            errors.general
          ),
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

            // Submit Button
            React.createElement(
              "button",
              { key: "submit", type: "submit", className: "btn-login" },
              "Login"
            ),
          ]
        ),
      ]
    )
  );
}