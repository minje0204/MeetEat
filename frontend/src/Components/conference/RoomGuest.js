import * as React from "react";
import styled from "@emotion/styled";

export default function RoomGuest() {
  return(
    <StyledWrapper>
      <div id="personal">
          {/* 개인당 주어지는 규격은 총 450 * 370 */}
          {/* ID가 출력되는 공간 350*20 */}
            <div id="personal_id">
              먹짱이될거야
            </div>
          {/* 캠 화면의 규격은 350*200 */}
            <div id="personal_cam">
            </div>
          {/* 식탁의 규격은 450*150 */}
            <div id="personal_table">
            </div>
        </div>
      </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #personal {
    width: 450px;
    height: 370px;
  }
  #personal_id {
    width: 350px;
    height: 20px;
    font-size: 100%;
    margin: auto;
  }
  #personal_cam {
    width: 350px;
    height: 200px;
    margin: auto;
    border-radius: 5px;
    background-color: gray;
  }
  #personal_table {
    width: 450px;
    height: 150px;
    object-fit: cover;
    background-color: rgb(216, 204, 163);
  }
  #personal_table_img {
    width: 450px;
    height: 150px;
    object-fit: cover;
  }
`;