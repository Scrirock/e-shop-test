import "./Categories.css";
import { useEffect, useState } from "react";

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
    <select onChange={(e) => setCategory(parseInt(e.target.value))}>
      <option value="0">Tout</option>
      {categories.map((category) => (
        <option value={category.id} key={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
