import loader from "../../assets/images/loading.gif";
import styled from "styled-components";

export function Loader() {
  return (
    <div>
      <Loading src={loader} alt="loader" />
    </div>
  );
}

const Loading = styled.img`
  width: 3rem;
`;
