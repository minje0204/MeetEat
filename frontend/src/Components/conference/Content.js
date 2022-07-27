const Content = () => {
  let OV;
  let session;

  const joinSession = () => {
    var mySessionId = document.getElementById("sessionId").value;

    OV = new OpenVidu();
    session = OV.initSession();

    session.on("streamCreated", function (event) {
      session.subscribe(event.stream, "subscriber");
    });

    getToken(mySessionId).then(token => {
      session
        .connect(token)
        .then(() => {
          document.getElementById("session-header").innerText = mySessionId;
          document.getElementById("join").style.display = "none";
          document.getElementById("session").style.display = "block";

          var publisher = OV.initPublisher("publisher");
          session.publish(publisher);
        })
        .catch(error => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message,
          );
        });
    });
  };

  const leaveSession = () => {
    session.disconnect();
    document.getElementById("join").style.display = "block";
    document.getElementById("session").style.display = "none";
  };

  window.onbeforeunload = function () {
    if (session) session.disconnect();
  };

  var OPENVIDU_SERVER_URL = "https://" + location.hostname + ":4443";
  var OPENVIDU_SERVER_SECRET = "MY_SECRET";

  function getToken(mySessionId) {
    return createSession(mySessionId).then(sessionId => createToken(sessionId));
  }

  function createSession(sessionId) {
    // See https://docs.openvidu.io/en/stable/reference-docs/REST-API/#post-openviduapisessions
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url: OPENVIDU_SERVER_URL + "/openvidu/api/sessions",
        data: JSON.stringify({ customSessionId: sessionId }),
        headers: {
          Authorization:
            "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          "Content-Type": "application/json",
        },
        success: response => resolve(response.id),
        error: error => {
          if (error.status === 409) {
            resolve(sessionId);
          } else {
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL,
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"',
              )
            ) {
              location.assign(OPENVIDU_SERVER_URL + "/accept-certificate");
            }
          }
        },
      });
    });
  }

  function createToken(sessionId) {
    // See https://docs.openvidu.io/en/stable/reference-docs/REST-API/#post-openviduapisessionsltsession_idgtconnection
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url:
          OPENVIDU_SERVER_URL +
          "/openvidu/api/sessions/" +
          sessionId +
          "/connection",
        data: JSON.stringify({}),
        headers: {
          Authorization:
            "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          "Content-Type": "application/json",
        },
        success: response => resolve(response.token),
        error: error => reject(error),
      });
    });
  }

  return (
    <>
      <div id="join">
        <h1>Join a video session</h1>
        <form onsubmit={joinSession}>
          <p>
            <label>Session:</label>
            <input type="text" id="sessionId" value="SessionA" required />
          </p>
          <p>
            <input type="submit" value="JOIN" />
          </p>
        </form>
      </div>
      <div id="session" style="display: none;">
        <h1 id="session-header"></h1>
        <input type="button" onclick={leaveSession} value="LEAVE" />
        <div>
          <div id="publisher">
            <h3>YOU</h3>
          </div>
          <div id="subscriber">
            <h3>OTHERS</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
