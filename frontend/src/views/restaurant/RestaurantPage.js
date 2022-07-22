import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

const Restaurant = () => {
  let params = useParams();
  return (
    <StyledWrapper>
      <h1>식당{params.id}</h1>
    </StyledWrapper>
  );
};
export default Restaurant;

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
