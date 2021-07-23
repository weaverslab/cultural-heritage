import "styled-components";

interface color {
  100: string;
  80: string;
  60: string;
  40: string;
  20: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      darkGreen: color;
      grey: color;
      yellow: color;
      redBrown: color;
      brown: color;
      black: color;
      white: string;
    };
    shadows: string;
    borderRadius: string;
    breakPoints: {
      bgScreen: number;
      mdScreen: number;
      smScreen: number;
    };
    maxWidth: {
      bgScreen: string;
      mdScreen: string;
      tablet: string;
      mobile: string;
    };
    fonts: {
      daumRegular: string;
      daumSemibold: string;
      bigTitle: string;
      title: string;
      button: string;
      content: string;
    };
  }
}
