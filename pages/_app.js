import React from "react";
import App, { Container } from "next/app";
import Link from "next/link";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Head from "../components/head";
import theme from "../src/theme";
import "./App.scss";

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Head title="Ginie" />
        <ThemeProvider theme={theme}>
          <AppBar position="static">
            {/* <Toolbar>
              <Button color="inherit">
                <Link href={"/"}><a className="app-bar_link">Home</a></Link>
              </Button>
              <Button color="inherit">
                <Link href={"/search"}><a className="app-bar_link">Search</a></Link>
              </Button>
              <Button color="inherit">
                <Link href={"/new/grant"}><a className="app-bar_link">Add grant</a></Link>
              </Button>
            </Toolbar> */}
          </AppBar>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Container>
    );
  }
}

export default MyApp;
