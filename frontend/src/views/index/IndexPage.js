import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function IndexPage () {
  const restaurantList = [{ id: "1" }, { id: "2" }, { id: "3" }];
  const listItems = restaurantList.map(e => (
    <Link to={"/restaurant/" + e.id}>
      <Button key={e.id} variant="outlined">식당{e.id}</Button>
    </Link>
  ));
  return (
    <StyledWrapper>
      <div id="restaurant-list">{listItems}</div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  #restaurant-list {
    width: 500px;
    display: flex;
    justify-content: space-between;
  }
`;
