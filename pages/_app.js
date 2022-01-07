import "../styles/globals.css";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@mui/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import Head from "next/head";
import { RTLProvider } from "../context/RTLContenxt";
function MyApp({ Component, pageProps }) {
  const [isRTL, setIsRTL] = useState(false);
  const onRTLSwitcher = () => {
    setIsRTL((prev) => !prev);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    isRTL ? body.setAttribute("dir", "rtl") : body.setAttribute("dir", "ltr");
  }, [isRTL]);

  const jss = create({
    plugins: [...jssPreset().plugins, rtl()],
  });

  const theme = createTheme({
    direction: isRTL ? "rtl" : "unset",
  });
  // Create rtl cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
  });

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        ></link>
      </Head>
      {/* <CacheProvider value={cacheRtl}> */}
      <button
        type="button"
        style={{ padding: 30, background: "cyan" }}
        onClick={onRTLSwitcher}
        dir="ltr"
      >
        you are in {isRTL ? "rtl" : "ltr"} click me to switch!
      </button>
      <RTLProvider isRTL={isRTL}>
        <Component {...pageProps} />
      </RTLProvider>
      {/* </CacheProvider> */}
    </>
  );
}

export default MyApp;
