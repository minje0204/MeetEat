import door from "assets/img/door.png"
import styled from "@emotion/styled";
import Tooltip from '@mui/material/Tooltip';

export default function Door() {
  return(
    <StyledWrapper>
      <Tooltip title="나가기">
        <div id="cont">
          <div id="frame">
            <img src={ door } alt="나가기" id="door"/>
          </div>
        </div>
      </Tooltip>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #cont {
    position: relative;
    width: 45px;
    height: 85px;
    margin: 0 auto 15px;
    background-color: #733C3C;
  }
  #frame {
    position: relative;
    background-color: white;
    top: 5px;
    width: 30px;
    height: 80px;
    margin: 0 auto;
    perspective: 480px;
  }
  #door {
    position: relative;
    width: 30px;
    height: 80px;
    transform-origin: left;
  }
  #door:hover {
    position: relative;
    width: 30px;
    height: 80px;
    transform-origin: left;
    animation: opendoor 3s ease-out;
  }
  @keyframes opendoor{
    from{transform: rotateY(0);}
    to{transform: rotateY(70deg);}
  }
`;