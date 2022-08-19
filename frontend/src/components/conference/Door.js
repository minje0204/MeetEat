import door from "assets/img/door.png";
import styled from "@emotion/styled";
import Tooltip from "@mui/material/Tooltip";

export default function Door() {
  return (
    <StyledWrapper>
      <Tooltip title="나가기">
        <div id="cont">
          <div id="frame">
            <img src={door} alt="나가기" id="door" />
          </div>
        </div>
      </Tooltip>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #cont {
    position: absolute;
    top: 85%;
    width: 70px;
    height: 120px;
    margin: 0 auto 15px;
    background-color: #733c3c;
  }
  #frame {
    position: relative;
    background-color: white;
    top: 5px;
    width: 55px;
    height: 115px;
    margin: 0 auto;
    perspective: 480px;
  }
  #door {
    position: relative;
    width: 55px;
    height: 115px;
    transform-origin: left;
  }
  #door:hover {
    position: relative;
    width: 55px;
    height: 115px;
    transform-origin: left;
    animation: opendoor 1.5s ease-out;
  }
  @keyframes opendoor {
    from {
      transform: rotateY(0);
    }
    to {
      transform: rotateY(70deg);
    }
  }
`;
