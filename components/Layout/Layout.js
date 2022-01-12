import CookieConsent from "react-cookie-consent";

import style from "../../styles/Layout/Layout.module.css";
import styleVariables from "../..//styles/_variables.module.scss";

import Meta from "../Head/Meta";
import Nav from "../Nav/Nav";

function Layout({ children, ...pageProps }) {
  return (
    <>
      <Meta />
      <CookieConsent
        style={{ background: styleVariables.attentionColor }}
        buttonStyle={{
          background: styleVariables.colorTwo,
        }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <Nav {...pageProps} />
      <div className={style.container}>
        <main className={style.main}>{children} </main>
      </div>
    </>
  );
}

export default Layout;
