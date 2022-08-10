import styled from "@emotion/styled";
import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';

export default function StandaloneToggleButton(props) {
  const [selected, setSelected] = React.useState(false);
  const options = ['음소거', '음소거 해제'];
  const [value, setValue] = React.useState(options[0]);
  const {rtcPeer} = props.value;

  return (
    <StyledWrapper>
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
          setValue(selected === true ? options[0] : options[1]);
          rtcPeer.audioEnabled = !rtcPeer.audioEnabled
        }}
        sx={{ width: 120, p:0.5}}
        id={ value === options[0] ? "btn" : "btn-clicked" }
      >
        {value}
      </ToggleButton>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #btn {
    background-color: #FFC3C3;
    font-family: "Jua";
    font-size: 16px;
    color: black;
    border-radius: 10%;
    border: 2px solid #FF8C8C;
  }
  #btn-clicked {
    background-color: #FF8C8C ;
    font-family: "Jua";
    font-size: 16px;
    border-radius: 10%;
    border: 2px solid #FF5D5D;
  }
`;