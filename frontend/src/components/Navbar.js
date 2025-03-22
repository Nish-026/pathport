import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    setAuthToken(localStorage.getItem("authToken"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    navigate("/login");
  };

  return (
    <div className="navContainer">
      <Link to="/">
        <p className="navLogo">Path-Port</p>
      </Link>

      <input type="checkbox" id="menu-bar" />
      <label htmlFor="menu-bar">
        <FontAwesomeIcon icon={faBars} className="icon" />
      </label>

      <nav className="navbar">
        <ul>
          {authToken && (
            <Link to="/home">
              <li>
                <p>Home</p>
              </li>
            </Link>
          )}
          <Link to="/">
            <li>
              <p>Dashboard</p>
            </li>
          </Link>
          {authToken ? (
            <li
              onClick={handleLogout}
              style={{ cursor: "pointer", color: "red" }}
            >
              <p>Logout</p>
            </li>
          ) : (
            <Link to="/login">
              <li>
                <p>Login</p>
              </li>
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
