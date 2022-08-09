import * as React from "react";
import styled from "@emotion/styled";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

export default function Chatting() {
  const [chatting, setChatting] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  const options = ["모두에게", "귓속말 하기"];
  const [value, setValue] = React.useState(options[0]);

  const handleChange = prop => event => {
    setChatting({ ...chatting, [prop]: event.target.value });
  };

  return (
    <StyleWrapper>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="say-to"
        options={options}
        sx={{ width: 200 }}
        renderInput={params => <TextField {...params} />}
      />
      <FormControl fullWidth sx={{ width: 700 }}>
        <InputLabel htmlFor="outlined-adornment-amount" />
        <OutlinedInput
          id="outlined-adornment-amount"
          value={chatting.amount}
          onChange={handleChange("amount")}
        />
      </FormControl>
      <div>
        <SendRoundedIcon
          sx={{ color: "#EFD345", fontSize: 40, ml: 0.5 }}
          onClick
        />
      </div>
    </StyleWrapper>
  );
}

const StyleWrapper = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
`;
