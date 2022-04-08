import { createContext, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { getTheme } from "../theming";

export const ThemeContextProvider = createContext({});

export function ThemeContext({ children }) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <ThemeContextProvider.Provider value={{ theme, toggleTheme }}>
      <Global theme={getTheme(theme)} />
      {children}
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
