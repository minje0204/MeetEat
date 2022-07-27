import * as React from "react";
import styled from "@emotion/styled";
import RoomGuest from "./RoomGuest"

export default function RoomGuests(props) {
  const { people } = props;

  if (people == 2){
    return(
      <StyledWrapper>
          <div id="room_guest_row">
            <RoomGuest></RoomGuest>
            <RoomGuest></RoomGuest>
          </div>
      </StyledWrapper>
    )
  }else if (people == 3){
    return(
      <StyledWrapper>
          <div id="room_guest_row">
            <RoomGuest></RoomGuest>
            <RoomGuest></RoomGuest>
            <RoomGuest></RoomGuest>
          </div>
      </StyledWrapper>
    )
  }else if (people == 4){
    return(
      <StyledWrapper>
        <div id="room_guest_col">
          <div id="room_guest_row_4up">
            <RoomGuest></RoomGuest>
            <RoomGuest></RoomGuest>
          </div>
          <div id="room_guest_row_4up">
            <RoomGuest></RoomGuest>
            <RoomGuest></RoomGuest>
          </div>
        </div>
      </StyledWrapper>
    )
  }else if (people == 5){
    return(
      <StyledWrapper>
        <div id="room_guest_col">
          <div id="room_guest_row_4up">
            <RoomGuest></RoomGuest>
            <RoomGuest></RoomGuest>
            <RoomGuest></RoomGuest>
          </div>
          <div id="room_guest_row_4up">
            <RoomGuest></RoomGuest>
            <RoomGuest></RoomGuest>
          </div>
        </div>
      </StyledWrapper>
    )
  }else if (people == 6){
    return(
      <StyledWrapper>
        <div id="room_guest_col">
          <div id="room_guest_row_4up">
            <RoomGuest></RoomGuest>
            <RoomGuest></RoomGuest>
            <RoomGuest></RoomGuest>
          </div>
          <div id="room_guest_row_4up">
            <RoomGuest></RoomGuest>
            <RoomGuest></RoomGuest>
            <RoomGuest></RoomGuest>
          </div>
        </div>
      </StyledWrapper>
    )
  }
}

const StyledWrapper = styled.div`
  #room_guest_row{
    width: 100vw;
    height: 80vh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  #room_guest_row_4up{
    width: 100vw;
    height: 40vh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  #room_guest_col{
        
  }
`;