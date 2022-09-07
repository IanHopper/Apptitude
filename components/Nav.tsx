import Link from "next/link";
import navStyles from "../styles/Nav.module.css";
import { useAppContext } from "../context/state";

const Nav = () => {
  const context = useAppContext();
  const { auth, logout } = context;

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          {auth.user ? (
            <Link href={"/"} passHref>
              <h1>
                <span className={navStyles.brand}>App</span>titude
              </h1>
            </Link>
          ) : (
            <Link href={"/login"} passHref><h1>
              <span className={navStyles.brand}>App</span>titude
            </h1></Link>
          )}

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
