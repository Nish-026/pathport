import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/login.scss";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const payload = { email, password };
    const headers = {'Content-Type': 'application/json'};

    axios
      .post("https://pathport.onrender.com/pathport/user/login", payload, {
        headers: headers,
      })
      .then((response) => {

        if (response.status === 200) {
          localStorage.setItem("authToken", response?.data?.token);
          navigate("/home");
        } else {
          setError("Invalid credentials! Please try again.");
        }
      })
      .catch((error) => {
        const errorMsg =
          error.response?.data?.message ||
          "Login failed! Please check your credentials.";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMsg,
        });
        setError(errorMsg);
      });
  };

  return (
    <div className="loginPage">
      <Navbar />
      <div className="grid">
        <h2 className="title">Welcome Back!</h2>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Display error message */}
        <form method="POST" className="form login" onSubmit={handleSubmit}>
          <div className="form__field">
            <label htmlFor="login__email">
              <svg className="icon">
                <use href="#icon-user"></use>
              </svg>
              <span className="hidden">Email</span>
            </label>
            <input
              autoComplete="email"
              id="login__email"
              type="text"
              name="email"
              className="form__input"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form__field">
            <label htmlFor="login__password">
              <svg className="icon">
                <use href="#icon-lock"></use>
              </svg>
              <span className="hidden">Password</span>
            </label>
            <input
              id="login__password"
              type="password"
              name="password"
              className="form__input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form__field">
            <input type="submit" value="Sign In" />
          </div>
        </form>
        <p className="text--center">
          Not a member? <a href="/register">Sign up now</a>
          <svg className="icon">
            <use href="#icon-arrow-right"></use>
          </svg>
        </p>
      </div>
    </div>
  );
};

export default Login;
