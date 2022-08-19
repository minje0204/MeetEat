import styled from "@emotion/styled";
import RoomGuest from "components/conference/RoomGuest";
import TableSlide from "components/conference/TableSlide";
import UseSocket from "hooks/UseSocket";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SwitchMic from "components/conference/SwitchMic";
import SwitchVideo from "components/conference/SwitchVideo";
import Chatting from "components/conference/Chatting";
import Door from "components/conference/Door";
import { Link } from "react-router-dom";
import { SocketContextProvider } from "components/socket/SocketContext";
import { ConferenceContextProvider } from "components/conference/ConferenceContext";
import Axios from "utils/axios/Axios";
import { useNavigate } from "react-router-dom";
import { Reset } from "modules/table";
import { useDispatch, useSelector } from "react-redux";
import restaurantName from "utils/conference/conferenceName";

export default function ConferencePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const myMenu = useSelector(state => state.table.present.tableList);
  const { title, peopleLimit, userName, conferenceId, restaurantId, position } =
    location.state;
  const [num, setNum] = useState(1);
  const [tableData, setTableData] = useState({ id: null, data: null });
  const { handleClickSendMessage, rtcPeer, host, resetParticipants } =
    UseSocket({
      name: location.state.userName,
      setNum,
      setTableData,
    });
  const peopleLimitNum = Number(peopleLimit);
  const handleLeave = () => {
    Axios.patch(
      `/restaurant/conference/${encodeURI(conferenceId)}`,
      conferenceId,
    );
    window.sessionStorage.setItem("conferencePermission", false);
    navigate(`/restaurant/${restaurantId}`, {
      params: {
        restaurantId,
      },
    });
  };

  function getPermission() {
    if (sessionStorage.getItem("conferencePermission") === "false") {
      handleLeave();
    }
  }

  window.onbeforeunload = function () {
    Axios.patch(
      `/restaurant/conference/${encodeURI(conferenceId)}`,
      conferenceId,
    );
    window.sessionStorage.setItem("conferencePermission", false);
    return;
  };
  useEffect(() => {
    getPermission();
  }, []);

  useEffect(() => {
    if (!rtcPeer) return;
    return () => {
      dispatch(Reset());
      rtcPeer.dispose();
    };
  }, [rtcPeer]);

  useEffect(() => {
    let message = {
      id: "joinRoom",
      name: userName,
      room: conferenceId,
      userId: sessionStorage.getItem("id"),
    };
    handleClickSendMessage(message);
    return () => {
      handleLeave();
      resetParticipants();
    };
  }, [userName, handleClickSendMessage]);

  return (
    <SocketContextProvider sendMessage={handleClickSendMessage}>
      <ConferenceContextProvider name={userName} title={conferenceId}>
        <StyledWrapper>
          <div id="table-name">
            {`[ ${restaurantName[restaurantId]} - ${position}번 테이블 : ${title} (${num}명 / ${peopleLimit}명) ]`}
          </div>
          <div id="table-label">
            <img id="circle-image" src="/images/circle.png" alt="circle"></img>
            <span id="table-num">{`${position}`}</span>
          </div>
          <div id={"cam-container"}>
            <TableSlide conferenceId={conferenceId} />
            {peopleLimitNum > 3 ? (
              <div className="cam-column">
                <div className="cam-row">
                  {_.range(0, parseInt((peopleLimitNum + 1) / 2)).map(
                    (_, idx) => (
                      <div
                        key={idx}
                        className="roomguest-chatting"
                        id={`roomguest-chatting-${idx}`}
                      >
                        <RoomGuest
                          key={`roomGuest-${idx}`}
                          idx={idx}
                          value={{ host }}
                          tableData={
                            tableData.id === idx ? tableData.data : null
                          }
                        />
                        <div
                          id="chatting-balloon"
                          style={{ display: "none" }}
                        ></div>
                      </div>
                    ),
                  )}
                </div>
                <div className="cam-row">
                  {_.range(
                    parseInt((peopleLimitNum + 1) / 2),
                    peopleLimitNum,
                  ).map((_, idx) => (
                    <div
                      key={idx}
                      className="roomguest-chatting"
                      id={`roomguest-chatting-${
                        idx + parseInt((peopleLimitNum + 1) / 2)
                      }`}
                    >
                      <RoomGuest
                        key={`roomGuest-${
                          idx + parseInt((peopleLimitNum + 1) / 2)
                        }`}
                        idx={idx + parseInt((peopleLimitNum + 1) / 2)}
                        value={{ host }}
                      />
                      <div
                        id="chatting-balloon"
                        style={{ display: "none" }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div id={`room_guest_row`}>
                <div className="cam-row">
                  {_.range(0, peopleLimitNum).map((_, idx) => (
                    <div
                      key={idx}
                      className="roomguest-chatting"
                      id={`roomguest-chatting-${idx}`}
                    >
                      <RoomGuest
                        key={`roomGuest-${idx}`}
                        idx={idx}
                        value={{ host }}
                        tableData={tableData.id === idx ? tableData.data : null}
                      />
                      <div
                        id="chatting-balloon"
                        style={{ display: "none" }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div id="footer">
            <Link to={"/restaurant/" + restaurantId}>
              <Door id="exitdoor" />
            </Link>
            <div id="switch">
              <SwitchMic value={{ rtcPeer: rtcPeer }}></SwitchMic>
              <SwitchVideo value={{ rtcPeer: rtcPeer }}></SwitchVideo>
            </div>
            <div id="chatting">
              <Chatting
                handleClickSendMessage={handleClickSendMessage}
                value={{ room: conferenceId, name: userName }}
              ></Chatting>
            </div>
          </div>
        </StyledWrapper>
      </ConferenceContextProvider>
    </SocketContextProvider>
  );
}
const StyledWrapper = styled.div`
  #table-num {
    position: absolute;
    top: 14px;
    left: 41px;
    font-size: 70px;
    text-align: center;
    font-family: cursive;
    color: #cccccc;
  }
  background-color: #faf0d7;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;

  #cam-container {
    min-height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #table-label {
    position: absolute;
    margin-left: 1rem;
    margin-top: 4rem;
  }
  #circle-image {
    width: 120px;
    height: 120px;
  }
  .cam-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
  }
  .cam-row {
    display: flex;
    justify-content: space-evenly;
    margin: auto 50px;
  }
  min-width: 1500px;
  #table-name {
    display: block;
    margin: 14px 0 0 14px;
    font-family: "Jua";
    font-size: 24px;
    color: #82954b;
  }
  #footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    height: 40px;
    margin-bottom: 15px;
  }
  #switch {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 300px;
  }
  #chatting-balloon {
    right: -10px;
    top: 0;
    position: absolute;
    width: 100px;
    min-height: 40px;
    height: auto;
    margin-top: 50px;
    background: #d6feff;
    border-radius: 10px;
    font-family: "Jua";
    white-space: normal;
    word-break: break-word;
    text-align: center;
  }
  #chatting-balloon:after {
    border-top: 15px solid #d6feff;
    border-left: 15px solid transparent;
    border-right: 0px solid transparent;
    border-bottom: 0px solid transparent;
    content: "";
    position: absolute;
    top: 10px;
    left: -15px;
  }
  .roomguest-chatting {
    margin: 0 2rem;
    position: relative;
  }
`;
