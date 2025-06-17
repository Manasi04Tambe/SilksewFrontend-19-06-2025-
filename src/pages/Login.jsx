import React, { useState, useContext } from 'react';
import axios from "axios";
import { BASEURL } from "../config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "../CSS/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handlePasswordReset = () => {
    navigate("/password-reset");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post(BASEURL + "/api/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { user, token } = response.data;
        login(user, token);
        setEmail("");
        setPassword("");
        toast.success("Login successful!");

        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      const message =
        error.response?.data?.message || "Invalid email or password. Please try again.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 py-20 mt-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl mx-auto flex flex-col md:flex-row"> 
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2 bg-red-500 relative h-full min-h-[500px]">
          <img
            src="https://img.freepik.com/premium-photo/smiling-character-holding-glowing-shopping-icon-surrounded-by-products-solid-background_720722-34520.jpg?ga=GA1.1.1629432222.1745324259&semt=ais_hybrid&w=740"
            alt="Login Background"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 p-8">
            <div className="text-white text-center">
              <h3 className="text-2xl font-bold mt-7">Login</h3>
              <p className="max-w-xs mx-auto text-2xl font-bold mt-20">
                Get access to your Orders, Wishlist and Recommendations
              </p>
            </div>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col bg-white rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-orange-500 text-center mb-6">Welcome Back</h2>
          <p className="text-gray-700 text-lg mb-6 text-center">
            Please sign in to your account to continue
          </p>

          {error && (
            <div className="text-red-500 text-sm text-center mb-4">{error}</div>
          )}

          <form onSubmit={onSubmitHandler} className="space-y-5 flex-grow">
            <div className="login-popup-fields space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                Email Address
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="login-popup-fields space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                Password
              </label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xl font-semibold py-3 px-4 rounded-lg transition-colors duration-300 h-[50px] md:h-[45px]"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-700 text-center">
              Don't have an account?{" "}
              <button
                onClick={handleSignupClick}
                className="text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-300"
              >
                Sign up here
              </button>
            </p>
            <p className="text-sm text-gray-700 text-center">
              Forgot Password?{" "}
              <button
                onClick={handlePasswordReset}
                className="text-orange-500 hover:text-orange-700 font-semibold transition-colors duration-300"
              >
                Reset here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
