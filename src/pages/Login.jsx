import React from "react";
import Navbar from "../assets/navbar";
import styles from "../styles/Login.module.css";
import personImg from "/ini.png";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();

  function handleSignIn() {
    navigate("/Signin");
  }

  const handleGoogleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const user = jwtDecode(token);
    console.log("Google Login Success:", user);

    navigate("/");
  };

  const handleGoogleError = () => {
    alert("Google Login Failed");
    alert("Google sign-in failed. Please try again.");
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.hero}>
        <div className={styles.left}>
          <h1>Welcome Back!</h1>
          <p>Sign in to continue finding local jobs with less hassle.</p>

          <div className={styles.googleWrapper}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}/>
          </div>
          <br />

          <div className={styles.divider}>
            <span>or</span>
          </div>

          <form className={styles.form}>
            <div className={styles.field}>
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" />
            </div>

            <div className={styles.field}>
              <label>Password</label>
              <input type="password" placeholder="••••••••" />
            </div>

            <div className={styles.options}>
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className={styles.button}>
              Log In
            </button>

            <p className={styles.signupText}>
              Don’t have an account?{" "}
              <a onClick={handleSignIn} className={styles.link}>
                Sign up
              </a>
            </p>
          </form>
        </div>

        <div className={styles.right}>
          <img src={personImg} alt="Person working on laptop" />
        </div>
      </div>
    </div>
  );
}

export default Login;
