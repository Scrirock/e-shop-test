import styled from "styled-components";

import { ThemeContextProvider } from "../context/ThemeContext";
import { useContext } from "react";

export function ThemeChooser() {
  const { mode, toggleTheme } = useContext(ThemeContextProvider);

  return (
    <ButtonContainer>
      <button onClick={toggleTheme}>
        Mode {mode === "light" ? "dark" : "light"}
      </button>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;
