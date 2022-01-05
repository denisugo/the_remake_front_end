import style from "../../styles/Layout/Layout.module.css";
import Meta from "../Head/Meta";
import Nav from "../Nav/Nav";

function Layout({ children, ...pageProps }) {
  return (
    <>
      <Meta />
      <Nav {...pageProps} />
      <div className={style.container}>
        <main className={style.main}>{children} </main>
      </div>
    </>
  );
}

export default Layout;
