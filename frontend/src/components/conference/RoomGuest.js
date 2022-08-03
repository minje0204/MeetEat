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
    width: 305.5px;
    height: 250px;
    display: flex-column;
    align-items: center;
    margin: 20px 50px;
  }
  #personal_id {
    width: 240px;
    height: 20px;
    margin: 0 auto;
  }
  #personalCam {
    width: 240px;
    height: 100px;
    margin: auto;
    border-radius: 5px;
    background-color: gray;
  }
  #personal_table {
    width: 305.5px;
    height: 130px;
    object-fit: cover;
    margin: auto;
    background-color: rgb(216, 204, 163);
  }
`;
