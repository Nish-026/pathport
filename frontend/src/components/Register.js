import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"
import "../styles/register.scss"
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      localStorage.setItem("authToken", "");

      setError("");
      const payload = {
        username: username,
        email: email,
        password: password,
      };
      const headers = { "Content-Type": "application/json" };
      axios
        .post("https://pathport.onrender.com/pathport/user/signup", payload, {
          headers: headers,
        })
        .then((response) => {

          if (response.status === 200) {
            localStorage.setItem("authToken", response.data.token);
            Swal.fire({
              title: "Login!",
              text: "Logged in Successfully!",
              icon: "success",
            });
            navigate("/home");
          } else {
            setError("Invalid credentials! Please try again.");
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response?.data?.message || error,
          });
          const errorMsg =
            error.response?.data?.message ||
            "Login failed! Please check your credentials.";
          setError(errorMsg);
        });
    };
  return (
    <div className="registerPage">
      <Navbar />
      <div className="grid">
        <h2 className="title">Join our Community!</h2>
        {error && <p className="error-message">{error}</p>}{" "}
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
            <label htmlFor="login__username">
              <svg className="icon">
                <use href="#icon-user"></use>
              </svg>
              <span className="hidden">Username</span>
            </label>
            <input
              autoComplete="username"
              id="login__username"
              type="text"
              name="username"
              className="form__input"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
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
          Already a member?
          <a href="/login">Sign In</a>
          <svg className="icon">
            <use href="#icon-arrow-right"></use>
          </svg>
        </p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" className="icons">
        <symbol id="icon-arrow-right" viewBox="0 0 1792 1792">
          <path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z" />
        </symbol>
        <symbol id="icon-lock" viewBox="0 0 1792 1792">
          <path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z" />
        </symbol>
        <symbol id="icon-user" viewBox="0 0 1792 1792">
          <path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
        </symbol>
      </svg>
    </div>
  );
}

export default Register
