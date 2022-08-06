import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import savebutton from "assets/img/savebutton.png";
import backbutton from "assets/img/backbutton.png";
import hotdog from "assets/img/hotdog.png";
import camera from "assets/img/camera.png";
import pencil from "assets/img/pencil.png";

export default function ProfilePage() {
  return(
    <StyledWrapper>
      <div id="save-exit">
        <img src={ savebutton } id="savebutton" alt="저장버튼" />저장하기
        <img src={ backbutton } id="backbutton" alt="저장버튼" />메인화면으로 돌아가기
      </div>
      <div id="myiconbox">
        <img src={ hotdog } id="myicon" alt="아이콘" />
        <img src={ camera } id="camera" alt="수정" />
      </div>
      <div id="nickname">
        별명 : Nickname
        <img src={ pencil } id="pencil" alt="수정" />
      </div>
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
    display: flex;
    height: 200px;
		width: 200px;
		margin: 0 10px;
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
    top: 39%;
    left: 53.5%;
    background-color: white;
    height: 50px;
    width: 50px;
  }
  #nickname {
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Jua";
    font-size: 30px;
  }
  #pencil {
    cursor: pointer;
    height:3vh;
    margin-left: 8px;
  }
`;