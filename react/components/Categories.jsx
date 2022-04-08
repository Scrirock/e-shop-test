import { useEffect, useState } from "react";
import styled from "styled-components";
import { getTheme } from "../theming";

export function Categories({ setCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // const xhr = new XMLHttpRequest();
    // xhr.open("GET", "/api/categories");
    // xhr.responseType = "json";
    // xhr.onload = () => xhr.status === 200 && setCategories(xhr.response);
    // xhr.send();

    // fetch("/api/categories").then((response) => {
    //   if (response.ok) {
    //     response.json().then((data) => setCategories(data));
    //   }
    // });

    async function getCategories() {
      const data = await fetch("/api/categories");
      setCategories(await data.json());
    }
    getCategories().catch(() =>
      console.log("Erreur de réuperation de categories")
    );
  }, []);

  return (
    <CustomSelect onChange={(e) => setCategory(parseInt(e.target.value))}>
      <option value="0">Tout</option>
      {categories.map((category) => (
        <option value={category.id} key={category.id}>
          {category.name}
        </option>
      ))}
    </CustomSelect>
  );
}

const CustomSelect = styled.select`
  width: 25rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.components.background};
  color: ${({ theme }) => theme.components.textColor};
`;
