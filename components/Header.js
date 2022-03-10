import headerStyles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        Appostalic <span>News</span>
      </h1>
      <p className={headerStyles.description}>My app development saga</p>
    </div>
  );
};

export default Header;
