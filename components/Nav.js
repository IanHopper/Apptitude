import Link from "next/link";
import navStyles from "../styles/Nav.module.css";
import { useAppContext } from "../context/state";
import { useRouter } from "next/router";
import Search from "./Search";
import NewTaskButton from "./NewTaskButton";

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
      </ul>
      <ul>
        {auth.isAuthenticated ? (
          <>
            <li>
              <Link href="/profile">{`Profile (${auth.user})`}</Link>
            </li>
            <li>
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
