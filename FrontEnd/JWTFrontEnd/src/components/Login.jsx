// src/components/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../context/Authcontext";
import axios from "axios";

const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      username: credentials.username,
      password: credentials.password,
    };
    try {
      // Make an API call to validate user credentials
      const response = await axios.post(
        "http://localhost:5000/api/Login/getLoginStatus",
        payload
      );
      console.log(response);
      if (response.status === 200) {
        // Assuming the backend sends a token or success response
        console.log("Login successful:", response.data);
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);
        login();
      } else {
        setError("Success but some other error");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token expired or invalid, redirect to login page
        alert("Session expired. Please log in again.");
        localStorage.removeItem("jwtToken");
        window.location.href = "/login"; // Redirect to login page
      } else {
        console.error("An error occurred:", error);
        alert("Error Occurred");
      }
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-xl mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
