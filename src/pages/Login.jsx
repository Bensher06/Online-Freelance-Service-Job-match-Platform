import React from "react";
import Styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Footer from "../assets/Footer";

function Login() {
  const navigate = useNavigate();

  // Navigate to the Role Selection Screen
  function handleSignUpNavigation() {
    navigate("/role-select"); 
  }
  
  // Back to the general role selection screen
  function butClickBack (){
    navigate('/role-select');
  }

  const handleGoogleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const user = jwtDecode(token);
    console.log("Google Login Success:", user);
    // Placeholder: Successful login should redirect to a dashboard based on role
    navigate("/employee/profile/edit"); 
  };

  const handleGoogleError = () => {
    alert("Google sign-in failed. Please try again.");
  };
  
  return (
    <div className={Styles.container}>
      {/* 1. Back Button */}
      <button className={Styles.backbutton} onClick={butClickBack}>Back</button>
      
      {/* 2. Fluid Wrapper */}
      <main className={Styles.mainContent}>
        
        <div className={Styles.centerCard}>
          {/* Content integrated into the single, centered card */}
          
          <h1>Welcome Back!</h1>
          <p className={Styles.subtitle}>Sign in to continue finding local jobs with less hassle.</p>

          <div className={Styles.googleWrapper}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>
          <br />

          <div className={Styles.divider}>
            <span>or</span>
          </div>

          <form className={Styles.form}>
            <div className={Styles.field}>
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" />
            </div>

            <div className={Styles.field}>
              <label>Password</label>
              <input type="password" placeholder="••••••••" />
            </div>

            <div className={Styles.options}>
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className={Styles.button}>
              Log In
            </button>

            <p className={Styles.signupText}>
              Don’t have an account?{" "}
              <a onClick={handleSignUpNavigation} className={Styles.link}>
                Sign up
              </a>
            </p>
          </form>
          
        </div>
        
      </main>
    </div>
  );
}

export default Login;