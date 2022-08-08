import styled from "@emotion/styled";
import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';

export default function StandaloneToggleButton() {
  const [selected, setSelected] = React.useState(false);
  const options = ['비디오 시작', '비디오 중지'];
  const [value, setValue] = React.useState(options[0]);

  return (
    <StyledWrapper>
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
          setValue(selected === true ? options[0] : options[1]);
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
    background-color: #FFEF82;
    font-family: "Jua";
    font-size: 16px;
    color: black;
    border-radius: 10%;
    border: 2px solid #EFD345;
  }
  #btn-clicked {
    background-color: #EFD345;
    font-family: "Jua";
    font-size: 16px;
    border-radius: 10%;
    border: 2px solid #EFD345;
  }
`;