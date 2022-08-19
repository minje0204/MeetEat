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
    width: 45px;
    height: 75px;
    margin: 0 auto 15px;
    background-color: #733c3c;
  }
  #frame {
    position: relative;
    background-color: white;
    top: 5px;
    width: 30px;
    height: 70px;
    margin: 0 auto;
    perspective: 480px;
  }
  #door {
    position: relative;
    width: 30px;
    height: 70px;
    transform-origin: left;
  }
  #door:hover {
    position: relative;
    width: 30px;
    height: 70px;
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
