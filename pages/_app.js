import App from "next/app";
import "../styles/styles.css";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#0070f3"
  }
};

const Noop = ({ children }) => children;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const Layout = Component.Layout || Noop;

    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    );
  }
}
