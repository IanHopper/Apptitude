import Meta from "./Meta";
import layoutStyles from "../styles/Home.module.css";
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */
import dynamic from 'next/dynamic'

// Dynamically loads Nav on client side preventing hydration error
const Nav = dynamic(() => import('./Nav'), {ssr: false})

const Layout = ({ children }) => {
  
  return (
    <>
      <Meta></Meta>
      <Nav></Nav>
      <div className={layoutStyles.container}>
        <main className={layoutStyles.main}>
          
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
