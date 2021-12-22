import "../styles/globals.css";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@mui/styles";

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
  return (
    <>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          <button
            type="button"
            style={{ padding: 30, background: "cyan" }}
            onClick={onRTLSwitcher}
            dir="ltr"
          >
            you are in {isRTL ? "rtl" : "ltr"} click me to switch!
          </button>
          <Component {...pageProps} />
        </ThemeProvider>
      </StylesProvider>
    </>
  );
}

export default MyApp;
