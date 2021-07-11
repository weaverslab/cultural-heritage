import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  colors: {
    lightGrey: "#eeeeee",
    grey: "#e3e3e3",
    pointBlue: "#70a9d5",
  },
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
    sunflower: "'Sunflower', sans-serif;",
    gugi: "'Gugi', cursive;",
    jua: "'Jua', sans-serif;",
    stylish: "'Stylish', sans-serif",
    mapoFlowerIsland: "MapoFlowerIsland",
    tmonMonsori: "TmonMonsori",
  },
};

export default theme;
