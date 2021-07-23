import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    darkGreen: {
      100: "#0F3F49",
      80: "#3F656D",
      60: "#6F8C92",
      40: "#9FB2B6",
      20: "#CFD9DB",
    },
    grey: {
      100: "#D2D3D5",
      80: "#DBDCDD",
      60: "#E4E5E6",
      40: "#EDEDEE",
      20: "#F6F6F7",
    },
    yellow: {
      100: "#FCBF30",
      80: "#FDCC59",
      60: "#FDD983",
      40: "#FEE5AC",
      20: "#FEF2D6",
    },
    redBrown: {
      100: "#BA3737",
      80: "#C85F5F",
      60: "#D68787",
      40: "#E3AFAF",
      20: "#F1D7D7",
    },
    brown: {
      100: "#6D4142",
      80: "#8A6768",
      60: "#A78D8E",
      40: "#C5B3B3",
      20: "#E2D9D9",
    },
    black: {
      100: "#000000",
      80: "#333333",
      60: "#666666",
      40: "#999999",
      20: "#CCCCCC",
    },
    white: "#FFFFFF",
  },
  shadows: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  borderRadius: "8px",
  breakPoints: {
    bgScreen: 1200,
    mdScreen: 992,
    smScreen: 768,
  },
  maxWidth: {
    bgScreen: "1140px",
    mdScreen: "940px",
    tablet: "720px",
    mobile: "100%",
  },
  fonts: {
    daumRegular: "DaumRegular",
    daumSemibold: "DaumSemibold",
    bigTitle: "font-family: DaumSemibold; font-size: 24px;",
    title: "font-family: DaumSemibold; font-size: 20px;",
    button: "font-family: DaumSemibold; font-size: 16px;",
    content: "font-family: DaumRegular; font-size: 16px;",
  },
};

export default theme;
