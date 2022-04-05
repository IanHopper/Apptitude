import headerStyles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>
        <span>App</span>titude
      </h1>
      <p className={headerStyles.description}>Integrating Next.js with a Django REST API</p>
    </div>
  );
};

export default Header;
