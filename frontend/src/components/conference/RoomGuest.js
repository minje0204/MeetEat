import * as React from "react";
import styled from "@emotion/styled";

export default function RoomGuest(props) {
  const { idx } = props;
  return (
    <StyledWrapper>
      <div className="personal" id={`personal-${idx}`}>
        <div id="personal_id">먹짱이될거야</div>
        <div id="personalCam"></div>
        <div id="personal_table"></div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .personal {
    width: 27vw;
    height: 35vh;
    display: flex-column;
    align-items: center;
    margin: 2vh 0;
  }
  #personal_id {
    width: 70%;
    height: 8%;
    margin: 0 auto;
  }
  #personalCam {
    width: 70%;
    height: 45%;
    margin: auto;
    border-radius: 5px;
    background-color: gray;
  }
  #personal_table {
    width: 90%;
    height: 47%;
    object-fit: cover;
    margin: auto;
    background-color: rgb(216, 204, 163);
  }
`;
