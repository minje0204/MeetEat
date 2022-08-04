import * as React from "react";
import styled from "@emotion/styled";

export default function RoomGuest(props) {
  const { idx } = props;
  return (
    <StyledWrapper>
      <div className="personal" id={`personal-${idx}`}>
        {/* 개인당 주어지는 규격은 총 450 * 370 */}
        {/* ID가 출력되는 공간 350*20 */}
        <div id="personal_id">먹짱이될거야</div>
        {/* 캠 화면의 규격은 350*200 */}
        <div id="personalCam"></div>
        {/* 식탁의 규격은 450*150 */}
        <button id="participantsAudioBtn">audio off</button> 
        <button id="participantsVideoBtn">video off</button> 
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
    width: 320px;
    height: 262px;
    margin: auto;
    border-radius: 5px;
    background-color: gray;
  }
  #personal_table {
    width: 100%;
    height: 65%;
    object-fit: cover;
    margin: auto;
    background-color: rgb(216, 204, 163);
  }
  #personal_table_img {
    width: 450px;
    height: 150px;
    object-fit: cover;
  }
`;
