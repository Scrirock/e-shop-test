import { createContext, useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { getTheme } from "../theming";

export const ThemeContextProvider = createContext({});

export function ThemeContext({ children }) {
  const [mode, setMode] = useState("light");

  function toggleTheme() {
    setMode(mode === "light" ? "dark" : "light");
  }

  return (
    <ThemeContextProvider.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={getTheme(mode)}>
        <Global theme={getTheme(mode)} />
        {children}
      </ThemeProvider>
    </ThemeContextProvider.Provider>
  );
}

const Global = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  font-size: 62.5%;
}
body {
  width: 100%;
  background-color: ${({ theme }) => theme.body.background};
  color: ${({ theme }) => theme.body.textColor};
}
`;
