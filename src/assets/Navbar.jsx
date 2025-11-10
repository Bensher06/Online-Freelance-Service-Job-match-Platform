import React from "react";
import Styles from "../styles/Navbar.module.css";
import { Link } from "react-router-dom"; // Keep Link for internal navigation

function Navbar() {
  // Using <Link> directly in the return avoids the need for separate functions
  // like loginButton and signInButton, making the component cleaner.

  return (
    <div className={Styles.all}>
      {/* Use Link for the logo area to navigate to the home page ('/') */}
      <Link to="/" className={Styles.logo} aria-label="Go to homepage"></Link>

      <div className={Styles.login}>
        {/* Use Link for "Log in" as well */}
        <Link to="/login" className={Styles.loginb}>
          Log in
        </Link>
        {/* Use Link for the "Sign in" button */}
        <Link to="/signin">
          <button>Sign in</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;