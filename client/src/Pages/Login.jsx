import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { api } from "../Data/env";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${api}login`, formData, {
        withCredentials: true,
      });

      console.log(response);

      if (response.data.token) {
        // Successful login
        window.location.href = "/";
        alert("Login successful");
      } else {
        // Invalid credentials
        alert("Wrong Credentials. Try Again!");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle other errors, e.g., network issues
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="auth-top">
      <div className="login-inner-top">
        <div className="auth-image">
          <img
            src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=740&t=st=1707203827~exp=1707204427~hmac=aeafe47d3432bf3d8c57220da60fa14aae0b8aedbe106fb797fc1da7bedd9260"
            alt=""
            srcSet=""
          />
        </div>
        <div className="auth-form">
          <div className="form-head">Login</div>
          {/* <form onSubmit={handleSubmit}> */}
          <TextField
            id="username"
            name="username"
            label="Email"
            variant="standard"
            style={{ width: "80%" }}
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="standard"
            style={{ width: "60%" }}
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="button" onClick={handleSubmit}>
            Login
          </button>
          {/* </form> */}
          <div style={{ marginBlockStart: "1rem" }}>
            New Here? <Link to="/signup">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
