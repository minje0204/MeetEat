import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import savebutton from "assets/img/savebutton.png";
import backbutton from "assets/img/backbutton.png";
import hotdog from "assets/img/hotdog.png";
import camera from "assets/img/camera.png";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import testinput from 'components/profile/testinput';

export default function ProfilePage() {
  const tablealbumlist = testinput.slice(0).reverse().map((e) => (
    <div key={`table${e.id}`}>
      <div id="example-table"></div>
      { e.id }번째 식탁 - { e.date }
    </div>
  ));

  return(
    <StyledWrapper>
      <div id="save-exit">
        <Button id="btn" variant="outlined" sx={{ fontFamily: "Jua", fontSize: 20, color: "black", backgroundColor: "#BABD42", borderColor: "#82954B" }}>
          <img src={ savebutton } id="saveicon" alt="저장하기" />저장하기
        </Button>
        <Link to={"/"}>
          <Button id="btn" variant="outlined" sx={{ fontFamily: "Jua", fontSize: 20, color: "black", ml: 3, backgroundColor: "#BABD42", borderColor: "#82954B" }}>
              <img src={ backbutton } id="exiticon" alt="돌아가기" />메인화면으로 돌아가기
          </Button>
        </Link>
      </div>
      <div id="myiconbox">
        <div id="myicon-camera">
          <img src={ hotdog } id="myicon" alt="아이콘" />
          <img src={ camera } id="camera" alt="수정" />
        </div>
      </div>
      <Box id="nickname-hello" component="form">
        <div>
          별명<Input id="nickname" placeholder="2글자 ~ 6글자" defaultValue="Nickname" />
        </div>
        <div>
          소개<Input id="introduce" placeholder="나를 표현해 주세요!" defaultValue="밥 잘 먹고 다니자" sx={{ width: 400 }}/>
        </div>
      </Box>
      <div id="album">
        <div id="table-album">
          {tablealbumlist}
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: center;
  align-items: center;

  a{
    text-decoration: none;
  }
  #save-exit {
    width: 100%;
    height: 3vh;
    margin: 5vh 10vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  #btn:hover {
    background-color: #82954B;
  }
  #saveicon {
    width: 3vh;
    height: 3vh;
    margin-right: 1vh;
  }
  #exiticon {
    width: 3vh;
    height: 3vh;
    margin-right: 1vh;
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
    background-color: #FFEF82;
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
  #nickname-hello {
    height: 10vh;
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    font-family: "Jua";
    font-size: 20px;
    flex-direction: column;
  }
  #nickname {
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 0 1vh;
  }
  #introduce {
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 0 1vh;
  }
  #album {
    width: 100vw;
    height: 43vh;
    display: flex;
    justify-content: center;
  }
  #table-album {
    width: 1200px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    font-family: "Jua";
    font-size: 17px;
    overflow: auto;
  }
  #example-table {
    background-color: rgb(185, 122, 86);
    width: 305.5px;
    height: 130px;
    margin: 2vh 0;
  }
`;