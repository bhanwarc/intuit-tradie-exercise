import themes from "theme";

type CustomTheme = typeof themes;
declare module "styled-components" {
  export interface DefaultTheme extends CustomTheme {}
}

export interface ThemeProps extends CustomTheme {
  palette: {
    text: {
      disabled: boolean;
    };
    grey: any[];
    action: {
      focus: boolean;
      hover: boolean;
      disabledBackground: boolean;
    };
  };
  customShadows: any;
  shape: {
    borderRadius: number;
  };
  spacing: any;
}
