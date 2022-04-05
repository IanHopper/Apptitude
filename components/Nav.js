import Link from "next/link";
import navStyles from "../styles/Nav.module.css";
import { useAppContext } from "../context/state";
import { useRouter } from "next/router";

const Nav = () => {
  const context = useAppContext();
  const { auth } = context;
  const router = useRouter();
  const pathname = router.pathname;

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
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>

      <ul>
        {auth.isAuthenticated ? (
          <li>
            <Link href="/logout">{`Logout (${auth.user})`}</Link>
          </li>
        ) : (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
