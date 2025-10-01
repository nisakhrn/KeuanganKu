import React, { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("Registrasi berhasil!");
        setErrors({});
        setFormData({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        });
      } else {
        const data = await response.json();
        setErrors(data.errors || { general: "Terjadi kesalahan" });
      }
    } catch (err) {
      setErrors({ general: "Gagal terhubung ke server" });
    }
  };

  return React.createElement(
    "div",
    { className: "register-wrapper" },
    React.createElement(
      "div",
      { className: "register-card" },
      [
        React.createElement(
          "h2",
          { key: "title", className: "register-title" },
          "Register"
        ),
        success &&
          React.createElement(
            "p",
            { key: "success", className: "register-success" },
            success
          ),
        errors.general &&
          React.createElement(
            "p",
            { key: "errorGeneral", className: "register-error" },
            errors.general
          ),
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
            ]),

            // Submit Button
            React.createElement(
              "button",
              { key: "submit", type: "submit", className: "btn-register" },
              "Register"
            ),
          ]
        ),
      ]
    )
  );
}