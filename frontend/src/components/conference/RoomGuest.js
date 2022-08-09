import * as React from "react";
import styled from "@emotion/styled";
import PersonalTable from "./PersonalTable";
import PersonalMenu from "components/conference/PersonalMenu";
import crown from "assets/img/crown.png";
import { useEffect, useState } from "react";

export default function RoomGuest(props) {
  const { idx } = props;
  const {host} = props.value;
  const [isHost, setIsHost] = useState("");
  useEffect(()=>{
    let target = document.querySelector(`#personal-${idx} #personal_id`).innerText
    if( !target ){
      setIsHost("none");
      return;
    }
    if(target === host){
      setIsHost("");
    }
  }, [host]);
  return (
    <StyledWrapper>
      <div className="personal" id={`personal-${idx}`}>
        <div id="personal_header">
          <div id="crown-nickname">
            <div id="crown" style={{display:`${isHost}`}}>
              <img src={ crown } width="20px" height="20px" id="option" alt="방장" />
            </div>
            <div id="personal_id"></div>
          </div>
          <div>
            <StyledWrapperLink>
              <PersonalMenu />
            </StyledWrapperLink>
          </div>
        </div>
        <div id="personalCam"></div>
        {/* 식탁의 규격은 305.5*130 */}
        {/* <div id="personal_table"></div> */}
        <PersonalTable></PersonalTable>
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
    margin: 20px 110px 20px 50px;
  }
  #personal_header {
    width: 240px;
    height: 20px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  #crown-nickname{
    display: flex;
  }
  #crown {
    margin-right: 5px;
  }
`;

const StyledWrapperLink = styled.div`
  a{
    text-decoration: none;
  }
`;