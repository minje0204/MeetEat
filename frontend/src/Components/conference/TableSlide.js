import * as React from "react";
import Switch from "@mui/material/Switch";
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";
import ItemTab from "./ItemTab";
import TableArea from "./TableArea";
import styled from "styled-components";
import store from "app/store";

export default function TableSlide() {
  const [checked, setChecked] = React.useState(false);
  const table = React.useRef();
  // const box = table.current.getBoundingClientRect();

  const handleChange = () => {
    setChecked(prev => !prev);
  };

  // React.useEffect(() => {
  // const box = table.current.getBoundingClientRect();
  // const data = {
  //   top: box.top,
  //   left: box.left,
  //   bottom: box.top + box.height,
  //   right: box.left + box.width,
  // };
  // store.dispatch({
  //   type: "GETBOUNDARY",
  //   data: data,
  // });
  // console.log("state", store.getState());
  // }, setChecked);
  return (
    <StyledWrapper>
      {/* <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      /> */}
      {/* <Slide direction="left" in={checked}>
        zz
      </Slide> */}

      {!checked && <div className="in-button" onClick={handleChange}></div>}
      <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
        <div className="slide-container">
          <div className="button" onClick={handleChange}></div>
          <div className="table-custom">
            <ItemTab></ItemTab>
            <div className="table-container">
              <TableArea></TableArea>
            </div>
          </div>
        </div>
      </Slide>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    position: relative;
    width: 50px;
    margin-left: 50px;
    height: 200px;
    background: olive;
  }
  .in-button {
    position: absolute;
    right: 0;
    width: 50px;
    float: right;
    margin-left: 50px;
    height: 200px;
    background: olive;
  }
  .slide-container {
    position: absolute;
    right: 0;
    display: flex;
  }
  .table-custom {
    display: flex;
    position: relative;
    background: #eeeeee;
  }
  .table-container {
    padding: 30px;
  }
`;
