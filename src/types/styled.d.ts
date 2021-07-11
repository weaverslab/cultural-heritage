import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      lightGrey: string;
      grey: string;
      pointBlue: string;
    };
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
      sunflower: string;
      gugi: string;
      jua: string;
      stylish: string;
      mapoFlowerIsland: string;
      tmonMonsori: string;
    };
  }
}
