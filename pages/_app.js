import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "../components/Navbar/NavBar";
import { Footer } from "../components/Footer/Footer";
import { Provider } from "react-redux";
import Container from "react-bootstrap";
import store from "../components/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { useRouter } from "next/router";
import Loading from "../components/Load/Loading";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  let persistor = persistStore(store);
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoading(true);
    });
    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
  }, [router.events]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
