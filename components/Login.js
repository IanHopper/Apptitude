import { useRouter } from "next/router";
import formStyles from "../styles/Add.module.css";
import { useAppContext } from "../context/state";
import { useState } from "react";
import Link from "next/link";

const Login = () => {
  const context = useAppContext();
  const { auth, login, handleLoginChange, loginCredentials } = context;
  const [error, setError] = useState(false);

  const router = useRouter();

  auth.isAuthenticated ? router.push("/") : null;

  return (
    <div>
      <h2>Login</h2>
      <form
        className={formStyles.addform}
        onSubmit={(e) =>
          login(e, loginCredentials.username, loginCredentials.password)
        }
        noValidate
      >
        {error ? (
          <p style={{ color: "red" }}>
            Your login credentials were not accepted
          </p>
        ) : null}
        <div className={formStyles.formControl}>
          <label>
            Username &nbsp;{" "}
            <span id="username-warning" className={formStyles.formWarning}>
              {loginCredentials.username &&
              loginCredentials.username.length > 0 &&
              loginCredentials.username.length < 4 ? (
                "Username must be at least 4 characters"
              ) : (
                <br></br>
              )}
            </span>
          </label>
          <input
            id="username"
            type="text"
            value={loginCredentials.username ? loginCredentials.username : ""}
            onChange={handleLoginChange}
            required
            autoFocus
          />
        </div>

        <div className={formStyles.formControl}>
          <label>
            Password &nbsp;{" "}
            <span id="password-warning" className={formStyles.formWarning}>
              {loginCredentials.password &&
              loginCredentials.password.length > 0 &&
              loginCredentials.password.length < 6 ? (
                "Password must be at lest 6 characters"
              ) : (
                <br></br>
              )}
            </span>
          </label>

          <input
            id="password"
            type="password"
            value={loginCredentials.password ? loginCredentials.password : ""}
            onChange={handleLoginChange}
            required
          />
        </div>

        <input
          // onClick={() => emptyFieldWarning()}
          className={formStyles.btn}
          type="submit"
          value="Login"
        />
        <p>
          
          <Link href="/register">
            <a>Register for an account.</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
