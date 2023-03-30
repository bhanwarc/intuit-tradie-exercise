import { ThemeProps } from "typings/styled";

const Autocomplete = (theme: ThemeProps) => {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.z20,
        },
      },
    },
  };
};

export default Autocomplete;
