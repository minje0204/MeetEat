import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

const Restaurant = () => {
  let params = useParams();
  console.log(params);
  return <StyledWrapper>{params.id}</StyledWrapper>;
};
export default Restaurant;

const StyledWrapper = styled.div``;
