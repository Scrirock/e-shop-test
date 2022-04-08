import { useParams } from "react-router-dom";
import styled from "styled-components";

export function RouteNotFound() {
  const params = useParams();

  return (
    <Error>
      Erreur 404, la page <strong>{params["*"]}</strong> n'existe pas
    </Error>
  );
}

const Error = styled.div`
  text-align: center;
  font-size: 5rem;
  color: #a9211e;
`;
