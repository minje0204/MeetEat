import * as React from "react";
import Switch from "@mui/material/Switch";
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";
import ItemTab from "./ItemTab";
import TableArea from "./TableArea";
// import store from "app/store";

export default function TableSlide() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(prev => !prev);
  };
  return (
    <div>
      <div>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show"
        />
        <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
          <div>
            <ItemTab></ItemTab>
            <TableArea></TableArea>
          </div>
        </Slide>
      </div>
    </div>
  );
}
