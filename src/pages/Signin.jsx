import React from "react";
import Navbar from "../assets/navbar";
import styles from "../styles/Signin.module.css";
import personImg from "/ini.png";

function Signin() {
  function handleGoogleLogin() {
    console.log('Google Sign in');
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.hero}>
        <div className={styles.left}>
          <h1>Create an Account</h1>
          <p>Join Job+ today and start connecting with local opportunities.</p>

        
          <button onClick={handleGoogleLogin} className={styles.googleBtn}>
            <img
              src="/googleIcon.png"
              alt="Google logo"
              className={styles.googleIcon}
            />
            <span>Sign up with Google</span>
          </button>

          <div className={styles.divider}>
            <span>or</span>
          </div>

          <form className={styles.form}>
            <div className={styles.field}>
              <label>Full Name</label>
              <input type="text" placeholder="Your full name" />
            </div>

            <div className={styles.field}>
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" />
            </div>

            <div className={styles.field}>
              <label>Password</label>
              <input type="password" placeholder="••••••••" />
            </div>

            <button type="submit" className={styles.button}>
              Sign Up
            </button>

            <p className={styles.loginText}>
              Already have an account? <a href="/login">Log in</a>
            </p>
          </form>
        </div>

        <div className={styles.right}>
          <img src={personImg} alt="Person with laptop" />
        </div>
      </div>
    </div>
  );
}

export default Signin;
