import styled from "@emotion/styled";
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";

export default function StandaloneToggleButton(props) {
  const [selected, setSelected] = React.useState(false);
  const options = ["비디오 중지", "비디오 시작"];
  const [value, setValue] = React.useState(options[0]);
  const { rtcPeer } = props.value;

  return (
    <StyledWrapper>
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
          setValue(selected === true ? options[0] : options[1]);
          rtcPeer.videoEnabled = !rtcPeer.videoEnabled;
        }}
        sx={{ width: 120, p: 0.5 }}
        id={value === options[0] ? "btn" : "btn-clicked"}
      >
        {value}
      </ToggleButton>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #btn {
    background-color: #ffc3c3;
    font-family: "Jua";
    font-size: 16px;
    color: black;
    border-radius: 10%;
    border: 2px solid #ff8c8c;
  }
  #btn-clicked {
    background-color: #ff8c8c;
    font-family: "Jua";
    font-size: 16px;
    border-radius: 10%;
    border: 2px solid #ff5d5d;
  }
`;
