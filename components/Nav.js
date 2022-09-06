import Link from "next/link";
import navStyles from "../styles/Nav.module.css";
import { useAppContext } from "../context/state";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Nav = () => {
  const context = useAppContext();
  const { auth, logout, loadUser, refreshJWT } = context;

  // useState and useContext allow access to user with causing React Hydration Error
  const [currentUser, setCurrentUser] = useState
  ('')
  useEffect(()=> setCurrentUser(auth.user),[auth.user])

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href={auth.user ? "/": "/login"}>
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
              <Link href="/profile">{`Profile (${currentUser})`}</Link>
              
            </li>
            <li onClick={logout}>
              <Link href="/logout">{`Logout`}</Link>
            </li>
            <li >
              <Link href="/about">About</Link>
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
            <li >
              <Link href="/about">About</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
