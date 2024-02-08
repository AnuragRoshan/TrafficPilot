import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { InputLabel, TextField } from "@mui/material";
import { api } from "../Data/env";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    mobileNumber: "",
    address: "",
    pan: "",
    profileImage: "https://example.com/profile.jpg",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    // for (const key in formData) {
    //   formDataToSend.append(key, formData[key]);
    // }
    try {
      const response = await axios.post(`${api}register`, formData);
      console.log(response);
      // Reset form after successful submission
      setFormData({
        name: "",
        username: "",
        password: "",
        mobileNumber: "",
        address: "",
        pan: "",
        profileImage: "https://example.com/profile.jpg",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-top">
      <div className="auth-inner-top">
        <div className="auth-image">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1707202549~exp=1707203149~hmac=087e72f9807df2fb795f625c63bc417ea2143ce5858ce88ffbaafeeff2f6f68a"
            alt=""
            srcset=""
          />
        </div>
        <div className="auth-form">
          <div className="form-head">Sign Up</div>
          {/* <form onSubmit={handleSubmit}> */}
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="standard"
            value={formData.name}
            onChange={handleChange}
            style={{ width: "60%" }}
          />
          <TextField
            id="username"
            name="username"
            label="Email"
            variant="standard"
            value={formData.username}
            onChange={handleChange}
            style={{ width: "80%" }}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="standard"
            value={formData.password}
            onChange={handleChange}
            style={{ width: "60%" }}
          />
          <TextField
            id="mobileNumber"
            name="mobileNumber"
            label="Mobile Number"
            type="number"
            variant="standard"
            value={formData.mobileNumber}
            onChange={handleChange}
            style={{ width: "40%" }}
          />
          <TextField
            id="address"
            name="address"
            label="Address"
            variant="standard"
            value={formData.address}
            onChange={handleChange}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <InputLabel htmlFor="pan-upload">PAN</InputLabel>
            <TextField
              id="pan-upload"
              name="pan"
              type="file"
              variant="standard"
              onChange={handleFileChange}
              style={{ width: "50%" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <InputLabel htmlFor="image-upload">Your Image</InputLabel>
            <TextField
              id="image-upload"
              name="profileImage"
              type="file"
              variant="standard"
              onChange={handleFileChange}
              style={{ width: "50%" }}
            />
          </div>
          <button type="submit" className="button" onClick={handleSubmit}>
            Sign Up
          </button>
          {/* </form> */}
          <div style={{ marginBlockStart: "1rem" }}>
            Already a user? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
