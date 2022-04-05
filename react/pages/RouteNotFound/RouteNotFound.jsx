import "./RouteNotFound.css";
import { useParams } from "react-router-dom";

export function RouteNotFound() {
  const params = useParams();

  return (
    <div className="error404">
      Erreur 404, la page <strong>{params["*"]}</strong> n'existe pas
    </div>
  );
}
