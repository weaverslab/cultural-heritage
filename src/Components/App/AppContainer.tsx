import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../../Styles/global-styles";
import theme from "../../Styles/theme";
import AppPresenter from "./AppPresenter";

const AppContainer: React.FunctionComponent = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppPresenter />
      </ThemeProvider>
    </>
  );
};

export default AppContainer;
