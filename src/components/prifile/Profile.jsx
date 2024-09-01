import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateModal, doLogin, doLogout } from "../../cart/AuthSlice";
import styles from "./profile.module.scss";
import './profilelogin.css';
import { FaUser } from "react-icons/fa";
import { clearCart } from "../../cart/cartSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, modalOpen, username } = useSelector((state) => state.auth);

  const [loginDetails, setLoginDetails] = useState({ username: "", password: "" });
  const [showRegisterMessage, setShowRegisterMessage] = useState(false);

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    dispatch(doLogin(loginDetails));
  };

  const handleLogout = () => {
    dispatch(doLogout());
    dispatch(clearCart());
  };

  const handleRegister = () => {
    setShowRegisterMessage(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <div>
          <p>Welcome, {username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <center style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "90vh" }}>
            <div className="login-box">
              <h2>Login</h2>
              <form>
                <div className="user-box">
                  <input
                    type="text"
                    name="username"
                    value={loginDetails.username}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="user-box">
                  <input
                    type="password"
                    name="password"
                    value={loginDetails.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                </div>
                <div onClick={handleLogin} className="login-button">
                  <a>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <p>Submit</p>
                  </a>
                </div>
                <div onClick={handleRegister} className="register-link">
                  <p> <FaUser/>  </p>
                </div>
                {showRegisterMessage && (
                  <div className={styles.registerMessage}>
                    <h5>Register</h5>
                    <p>
                      This is a hobby project for development purposes only. No well-suited backend has been used here. Please use <span className="suggest">niranjan@gmail.com </span>  as username & <span  className="suggest">niranjan  </span> as password. You can find these credentials in the placeholder also. Go to login.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </center>
        </div>
      )}
    </>
  );
};

export default Profile;
