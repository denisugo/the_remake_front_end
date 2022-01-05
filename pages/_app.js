//import { Provider } from "react-redux";
// import { store } from "../app/store";
import { wrapper } from "../app/store";

import Layout from "../components/Layout/Layout";
import "../styles/globals/reset.css";
import "../styles/globals/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>

    // <Provider store={store}>
    //   <Layout {...pageProps}>
    //     <Component {...pageProps} />
    //   </Layout>
    // </Provider>
  );
}

export default wrapper.withRedux(MyApp);
// export default MyApp;
