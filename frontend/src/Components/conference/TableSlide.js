import * as React from "react";
import Switch from "@mui/material/Switch";
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";
import ItemTab from "./ItemTab";

function TableSlide() {
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
          </div>
        </Slide>
      </div>
    </div>
  );
}

export default TableSlide;
