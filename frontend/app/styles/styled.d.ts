import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      background: string;
      card: string;

      text: {
        primary: string;
        secondary: string;
      };

      status: {
        income: string;
        expense: string;
      };
    };

    typography: {
      fontFamily: string;
    };
  }
}