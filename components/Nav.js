import Link from "next/link";
import navStyles from "../styles/Nav.module.css";
import { useAppContext } from "../context/state";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Nav = () => {
  const context = useAppContext();
  const { auth, logout, loadUser, refreshJWT } = context;
  const router = useRouter();
  // Consider highlighting active page in navbar
  const pathname = router.pathname;

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    let refresh = localStorage.getItem("refresh");
    loadUser(user);
    let interval = setInterval(() => {
      if (token && refresh) {
        refreshJWT(refresh);
      }
    }, 240000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">
            <h1>
              <span className={navStyles.brand}>App</span>titude
            </h1>
          </Link>
        </li>
      </ul>
      <ul>
        {auth.user !== null ? (
          <>
            <li>
              <Link href="/profile">{`Profile (${auth.user})`}</Link>
              
            </li>
            <li onClick={logout}>
              <Link href="/logout">{`Logout`}</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
            <li style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              <Link href="/about">?</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
