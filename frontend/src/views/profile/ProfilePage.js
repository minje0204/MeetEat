import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import savebutton from "assets/img/savebutton.png";
import backbutton from "assets/img/backbutton.png";
import hotdog from "assets/img/hotdog.png";
import camera from "assets/img/camera.png";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';


export default function ProfilePage() {
  return(
    <StyledWrapper>
      <div id="save-exit">
        <img src={ savebutton } id="savebutton" alt="저장버튼" />저장하기
        <img src={ backbutton } id="backbutton" alt="저장버튼" />메인화면으로 돌아가기
      </div>
      <div id="myiconbox">
        <div id="myicon-camera">
          <img src={ hotdog } id="myicon" alt="아이콘" />
          <img src={ camera } id="camera" alt="수정" />
        </div>
      </div>
      <Box id="nickname-hello" component="form">
        별명<Input id="nickname" defaultValue="Hello world" />
        소개<Input id="hello" defaultValue="Hello world" />
      </Box>
      <div id="table-album">

      </div>

    </StyledWrapper>    
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  #save-exit {
    width: 100%;
    height: 3vh;
    margin: 5vh 10vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  #savebutton {
    width: 3vh;
    height: 3vh;
  }
  #backbutton {
    width: 3vh;
    height: 3vh;
  }
	#myiconbox {
    width: 100%;
    height: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2vh 0;
  }
  #myicon-camera {
    height: 200px;
    width: 200px;
    border: 2px solid black;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
	#myicon {
    cursor: pointer;
    width: 90%;
    height: 90%;
    object-fit: cover;
  }
  #camera {
    cursor: pointer;
    position: absolute;
    top: 40%;
    left: 54%;
    background-color: white;
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
  #nickname-hello {
    width: %;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    font-family: "Jua";
    font-size: 20px;
  }
  #nickname {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 1vh;
  }
  #hello {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;