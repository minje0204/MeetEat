import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import SearchFriends from "components/friends/SearchFriends";
import SearchInputFriends from "components/friends/SearchInputFriends";
import MyFriends from "components/friends/MyFriends";
import Axios from "utils/axios/Axios";
// import default_profile from "assets/img/default_profile.png";
import { toast } from "react-toastify";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function a22yProps(index) {
  return {
    id: `sub-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabFriends() {
  const [value, setValue] = React.useState(1);
  const [subValue, setSubValue] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("nickname");
  const [searchName, setSearchName] = React.useState("");
  const [searchSign, setSearchSign] = React.useState(0);
  const [searchResultList, setSearchResultList] = React.useState([]);
  const [receivedFriendRequest, setReceivedFriendRequest] = React.useState([]);
  const [sendFriendRequest, setsendFriendRequest] = React.useState([]);
  const myNickname = sessionStorage.getItem("nickname");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const subHandleChange = (event, newValue) => {
    setSubValue(newValue);
  };

  React.useEffect(() => {
    if (searchSign === 1) {
      setSearchSign(0);
      Axios.get(`/user/search?${searchValue}=${searchName}`).then(res => {
        setSearchResultList(res.data.response);
      });
    }
  }, [searchValue, searchName, searchSign]);

  function requestList(data) {
    const receivedRequestList = [];
    const sendRequestList = [];
    for (let i = 0; i < data.length; i++) {
      let user = data[i];
      if (user.status === 0) {
        if (user.received === true) {
          receivedRequestList.push(user);
        } else if (user.received === false) {
          sendRequestList.push(user);
        }
      }
    }
    setReceivedFriendRequest(receivedRequestList);
    setsendFriendRequest(sendRequestList);
  }

  React.useEffect(() => {
    Axios.get(`/friend/waiting`).then(res => {
      requestList(res.data.response);
    });
  }, []);

  const receivedRequestResult = receivedFriendRequest.map((e, idx) => (
    <div id="who-each" key={`received-${idx}`}>
      <div id="who-icon-nickname">
        <div id="who-imgbox">
          <img
            src={
              e.friendInfo.profile !== null
                ? e.friendInfo.profile
                : "/images/profile_image/default_profile.png"
            }
            id="image"
            alt={`사진 ${idx}`}
          />
        </div>
        <div id="nickname">{e.friendInfo.nickname}</div>
      </div>
      <div id="profile-menu">
        <Button
          variant="outlined"
          id="profile"
          onClick={event => friendReceiveYes(e.id)}
        >
          밥친구 수락
        </Button>
      </div>
    </div>
  ));

  const sendRequestResult = sendFriendRequest.map((e, idx) => (
    <div id="who-each" key={`received-${idx}`}>
      <div id="who-icon-nickname">
        <div id="who-imgbox">
          <img
            src={
              e.friendInfo.profile !== null
                ? e.friendInfo.profile
                : "/images/profile_image/default_profile.png"
            }
            id="image"
            alt={`사진 ${idx}`}
          />
        </div>
        <div id="nickname">{e.friendInfo.nickname}</div>
      </div>
      <div id="profile-menu">
        <Button
          variant="outlined"
          id="profile"
          onClick={event => friendSendCancle(e.id)}
        >
          요청 취소
        </Button>
      </div>
    </div>
  ));

  const friendReceiveYes = idx => {
    Axios.patch(`/friend/received/accept`, { id: idx }).then(() => {
      Axios.get(`/friend/waiting`).then(res => {
        requestList(res.data.response);
      });
    });
  };

  const friendSendCancle = idx => {
    Axios.delete(`/friend/sent/cancel`, { data: { id: idx } }).then(() => {
      Axios.get(`/friend/waiting`).then(res => {
        requestList(res.data.response);
      });
    });
  };

  const friendPlus = idx => {
    Axios.post(`/friend/request/${idx}`)
      .then(
        toast.error("밥친구 요청을 보냈습니다.", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        }),
      )
      .then(() => {
        Axios.get(`/friend/waiting`).then(res => {
          requestList(res.data.response);
        });
      });
  };

  const searchResult = searchResultList.map((e, idx) => (
    <div id="who-each" key={`${idx}`}>
      <div id="who-icon-nickname">
        <div id="who-imgbox">
          <img
            src={
              e.profile !== null
                ? e.profile
                : "/images/profile_image/default_profile.png"
            }
            id="image"
            alt={`사진 ${idx}`}
          />
        </div>
        <div id="nickname">{e.nickname}</div>
      </div>
      <div id="profile-menu">
        <Button
          variant="outlined"
          id="profile"
          onClick={event => friendPlus(e.id)}
        >
          밥친구 추가
        </Button>
      </div>
    </div>
  ));

  return (
    <StyledWrapper>
      <div id="friend-dialog">
        <Box sx={{ width: "100%", bgcolor: "#FFEF82" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab
              label="밥친구 요청"
              {...a11yProps(0)}
              sx={{ fontSize: 20, fontFamily: "Jua" }}
            />
            <Tab
              label="밥친구 목록"
              {...a11yProps(1)}
              sx={{ fontSize: 20, fontFamily: "Jua" }}
            />
            <Tab
              label="밥친구 검색"
              {...a11yProps(2)}
              sx={{ fontSize: 20, fontFamily: "Jua" }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div id="friend-request">
            <Tabs
              id="subtab"
              value={subValue}
              onChange={subHandleChange}
              aria-label="basic tabs example"
              centered
              sx={{ p: 1 }}
              indicatorColor=""
              textColor="inherit"
            >
              <Tab
                label="받은 요청"
                {...a22yProps(0)}
                sx={{ fontSize: 20, fontFamily: "Jua" }}
              />
              <Tab
                label="보낸 요청"
                {...a22yProps(1)}
                sx={{ fontSize: 20, fontFamily: "Jua" }}
              />
            </Tabs>
            <hr id="horizon-line" />
            <TabPanel id="subtab-detail" value={subValue} index={0}>
              {receivedRequestResult.length === 0
                ? "받은 요청이 없어요!"
                : receivedRequestResult}
            </TabPanel>
            <TabPanel id="subtab-detail" value={subValue} index={1}>
              {sendRequestResult.length === 0
                ? "보낸 요청이 없어요!"
                : sendRequestResult}
            </TabPanel>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} id="friend-list">
          <div>
            <MyFriends />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div id="search">
            <SearchFriends setSearchValue={setSearchValue} />
            <SearchInputFriends
              setSearchName={setSearchName}
              setSearchSign={setSearchSign}
            />
          </div>
          <hr id="horizon-line" />
          <div id="result-list">
            {searchResult.length === 0
              ? "검색결과가 없어요!"
              : searchResultList.map((e, idx) => (
                  <div id="who-each" key={`${idx}`}>
                    <div id="who-icon-nickname">
                      <div id="who-imgbox">
                        <img
                          src={
                            e.profile !== null
                              ? e.profile
                              : "/images/profile_image/default_profile.png"
                          }
                          id="image"
                          alt={`사진 ${idx}`}
                        />
                      </div>
                      <div id="nickname">{e.nickname}</div>
                    </div>
                    <div id="profile-menu">
                      <Button
                        variant="outlined"
                        id="profile"
                        onClick={event => friendPlus(e.id)}
                        disabled={myNickname === e.nickname}
                      >
                        {myNickname === e.nickname ? `나` : `밥친구 추가`}
                      </Button>
                    </div>
                  </div>
                ))}
          </div>
        </TabPanel>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #friend-dialog {
    width: 450px;
    height: 580px;
    border: 6px dashed #efd345;
    overflow: auto;
  }
  #friend-request {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #simple-tabpanel-0 > div {
    padding: 0px;
  }
  #subtab-detail > div {
    padding: 0px;
  }
  #subtab-detail > div > span {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #request-example-1 {
    width: 346.792px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    border: 4px solid #efd345;
    border-radius: 20px;
  }
  #subtab {
    color: #82954b;
    margin-top: 15px;
  }
  #subtab-detail {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  #search {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 30%;
  }
  #search-result {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #horizon-line {
    margin: 10px 0 5px;
    width: 100%;
    border: 0;
    height: 1px;
    background-color: #e2e2e2;
  }
  #friend-list {
    overflow: auto;
    height: 530px;
  }
  #example-1 {
    height: 70px;
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    border: 4px solid #efd345;
    border-radius: 20px;
  }
  #result-list {
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #who-each {
    height: 70px;
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    border: 4px solid #efd345;
    border-radius: 20px;
  }
  #who-icon-nickname {
    font-family: "Jua";
    font-size: 26px;
    display: flex;
    align-items: center;
  }
  #who-imgbox {
    height: 50px;
    width: 50px;
    margin: 0 10px;
    border: 2px solid black;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  #image {
    width: 90%;
    height: 90%;
    object-fit: cover;
  }
  #profile-menu {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
  }
  #profile {
    margin-left: 10px;
    padding: 2px 5px;
    border-color: black;
    font-family: "Jua";
    font-size: 16px;
    color: black;
    background-color: #efd345;
    margin: 0 10px;
    :disabled {
      background-color: gray;
    }
  }
`;
