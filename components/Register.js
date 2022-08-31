import { useRouter } from "next/router";
import formStyles from "../styles/Add.module.css";
import { useAppContext } from "../context/state";
import { useState } from "react";
import validator from "validator";
import Link from "next/link";

const Register = () => {
  const context = useAppContext();
  const { register, registration, handleFormChange } = context;
  const { username, email, password } = registration;
 

  return (
    <div>
      <h2>Register</h2>
      <form
        id = "registration"
        className={formStyles.addform}
        onSubmit={(e) =>
          register(e, registration)
        }
        noValidate
      >
        
        <div className={formStyles.formControl}>
          <label>
            Username &nbsp;{" "}
            <span id="username-warning" className={formStyles.formWarning}>
              {username &&
              username.length > 0 &&
              username.length < 4 ? (
                "Username must be at least 4 characters"
              ) : (
                <br></br>
              )}
            </span>
          </label>
          <input
            id="username"
            type="text"
            value={username ? username : ""}
            onChange={handleFormChange}
            required
            autoFocus
          />
        </div>
        <div className={formStyles.formControl}>
          <label>
            Email &nbsp;{" "}
            <span id="email-warning" className={formStyles.formWarning}>
              {email && !validator.isEmail(email) ? "Please enter a valid email" : (
                <br></br>
              )}
            </span>
          </label>

          <input
            id="email"
            type="email"
            value={email ? email : ""}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className={formStyles.formControl}>
          <label>
            Password &nbsp;{" "}
            <span id="password-warning" className={formStyles.formWarning}>
              {password &&
              password.length > 0 &&
              password.length < 6 ? (
                "Password must be at lest 6 characters"
              ) : (
                <br></br>
              )}
            </span>
          </label>

          <input
            id="password"
            type="password"
            value={password ? password : ""}
            onChange={handleFormChange}
            required
          />
        </div>

        <input
          // onClick={() => emptyFieldWarning()}
          className={formStyles.btn}
          type="submit"
          value="Register"
        />
        <p>
          
          <Link href="/login">
            <a>Already have an account? Login</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
