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
        <div id="room_guest_row_4">
          <RoomGuest></RoomGuest>
          <RoomGuest></RoomGuest>
          <RoomGuest></RoomGuest>
          <RoomGuest></RoomGuest>
        </div>
      </StyledWrapper>
    )
  }else if (people == 5){
    return(
      <StyledWrapper>
        <div id="room_guest_row">
          <RoomGuest></RoomGuest>
          <RoomGuest></RoomGuest>
          <RoomGuest></RoomGuest>
          <RoomGuest></RoomGuest>
          <RoomGuest></RoomGuest>
        </div>
      </StyledWrapper>
    )
  }else if (people == 6){
    return(
      <StyledWrapper>
        <div id="room_guest_row">
          <RoomGuest></RoomGuest>
          <RoomGuest></RoomGuest>
          <RoomGuest></RoomGuest>
          <RoomGuest></RoomGuest>
          <RoomGuest></RoomGuest>
          <RoomGuest></RoomGuest>
        </div>
      </StyledWrapper>
    )
  }
}

const StyledWrapper = styled.div`
  #room_guest_row{
    height: 90vh;
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
  }
  #room_guest_row_4{
    height: 90vh;
    margin: 0 10vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
  }
`;