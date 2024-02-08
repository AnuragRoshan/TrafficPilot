import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { api } from "../Data/env";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({
    // user: "",
    address: "",
    name: "",
    mobileNumber: "",
    email: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}getUser`, {
          withCredentials: true,
        });
        setUser(response.data);
        setData({
          userId: response.data._id,
          name: response.data.name,
          email: response.data.username,
          mobileNumber: response.data.mobileNumber,
          address: response.data.address,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleApplyChanges = async () => {
    try {
      await axios.post(`${api}updateUser`, data, {
        withCredentials: true,
      });
      // alert("User information updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update user information.");
    }
    // console.log(data);
  };

  return (
    <div className="profile-top">
      <div className="profile-inner-top">
        <div className="profile-head">Personal Information</div>
        <hr />
        {!user ? (
          <div>Loading ...</div>
        ) : (
          <>
            <div className="user-info">
              <div className="user-img">
                <div className="prof-img">
                  <img src="https://avatar.iran.liara.run/public/boy?username=Ash" />
                </div>
                <div className="user-data">
                  <div className="user-name">
                    <h3>{user.name}</h3>
                  </div>
                  <div className="user-email">
                    <h3>{user.username}</h3>
                  </div>
                  <div className="user-address">
                    <h3>{user.address}</h3>
                  </div>
                  <div className="user-phone">
                    <h3>{user.mobileNumber}</h3>
                  </div>
                </div>
              </div>
              <div className="user-edit">
                <div className="single-col">
                  <div className="profile-name">
                    <TextField
                      required
                      id="outlined-required"
                      name="name"
                      label="Full Name"
                      type="text"
                      value={data.name}
                      onChange={handleInputChange}
                      style={{ width: "40%" }}
                    />
                  </div>
                </div>
                <div className="single-col">
                  <div className="profile-email">
                    <TextField
                      required
                      id="outlined-required"
                      name="email"
                      label="Email"
                      type="email"
                      value={data.email}
                      onChange={handleInputChange}
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>
                <div className="single-col">
                  <div className="profile-address">
                    <TextField
                      required
                      id="outlined-required"
                      name="address"
                      label="Address"
                      type="text"
                      value={data.address}
                      onChange={handleInputChange}
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div className="single-col">
                  <div className="profile-phone">
                    <TextField
                      required
                      id="outlined-required"
                      name="mobileNumber"
                      label="Mobile Number"
                      type="number"
                      value={data.mobileNumber}
                      onChange={handleInputChange}
                      style={{ width: "40%" }}
                    />
                  </div>
                </div>
                <div className="save-info" onClick={handleApplyChanges}>
                  Apply Changes
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
