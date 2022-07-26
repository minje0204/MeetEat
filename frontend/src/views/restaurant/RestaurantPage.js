import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";


const Restaurant = () => {
  let params = useParams();
  const tableList = [{ id: "1" }, { id: "2" }, { id: "3" }];
  const listItems = tableList.map(e => (
    <Link to={"/restaurant/" + params.restaurant_id + "/conference/" + e.id}>
      <Button variant="outlined">컨퍼런스{e.id}</Button>
    </Link>
  ));
  return (
    <StyledWrapper>
      <h1>식당{params.restaurant_id}</h1>
      <div id="table-list">{listItems}</div>
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
