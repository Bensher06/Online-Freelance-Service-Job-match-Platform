import React from "react";
import Navbar from "../assets/navbar";
import styles from "../styles/Login.module.css";
import personImg from "/ini.png"; // your illustration
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleSignIn() {
    navigate("/Signin");
  }

  function handleGoogleLogin() {
    console.log('Google login')
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.hero}>
        <div className={styles.left}>
          <h1>Welcome Back!</h1>
          <p>Sign in to continue finding local jobs with less hassle.</p>

          <button onClick={handleGoogleLogin} className={styles.googleBtn}>
            <img
              src="/googleIcon.png"
              alt="Google logo"
              className={styles.googleIcon}
            />
            <span>Log in with Google</span>
          </button>

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
