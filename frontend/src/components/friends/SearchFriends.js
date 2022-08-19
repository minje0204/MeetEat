import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const options = ["닉네임", "이메일"];

export default function SearchFriends(props) {
  const { setSearchValue } = props;
  const [value, setValue] = React.useState(options[0]);

  React.useEffect(() => {
    if (value === options[0]) {
      setSearchValue("nickname");
    } else if (value === options[1]) {
      setSearchValue("email");
    }
  }, [value]);

  return (
    <Autocomplete
      component="span"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      id="controllable-states-demo"
      options={options}
      sx={{ width: 140 }}
      renderInput={params => <TextField {...params} label="검색 방법" />}
    />
  );
}
