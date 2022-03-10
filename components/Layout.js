import Nav from "./Nav";
import Meta from "./Meta";
import Header from "./Header";
import layoutStyles from "../styles/Home.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <Meta></Meta>
      <Nav></Nav>
      <div className={layoutStyles.container}>
        <main className={layoutStyles.main}>
          <Header />
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
