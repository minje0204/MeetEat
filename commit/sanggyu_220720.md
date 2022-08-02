# 쿠렌토.,..

쿠렌토 헬로월드

# \***\*Application Server Logic\*\***

![*Server-side class diagram of the HelloWorld app*](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/309805aa-18d2-4fae-927a-7cc6bffabb26/Untitled.png)

_Server-side class diagram of the HelloWorld app_

- Application (HelloWorldApp)
  ```java
  @SpringBootApplication
  @EnableWebSocket
  public class HelloWorldApp implements WebSocketConfigurer{
  	@Bean //
  	public HelloWorldHandler handler(){
  		return new HelloWorldHandler();
  }
  	@Bean //미디어기능을 추가하기 위해서 kurentoclient 빈 등록
  	public KurentoClient kurentoClient(){
  		return KurentoClient.create();
  }
  	@Override
  	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry){
  		registry.addHandler(handler(), "/helloworld");
  }
  	public static void main(String[] args)throws Exception{
  		SpringApplication.run(HelloWorldApp.class, args);
  }
  ```
  - 주요 클래스!
  - 이 웹 애플리케이션은 spa이다
  - 애플리케이션 서버와 통신하기 위해 웹소켓을 사용한다.
  - /helloworld 경로의 웹소켓요청을 처리하기 위해서`WebSocketHandler` 를 등록한다
    → `WebSocketHandler` 핸들러 등록을 위해 `WebSocketConfigurer` 인터페이스 구현
- HelloWorldHandler
  text 웹소켓 요청을 다루기위해 `TextWebSocketHandler` 를 상속받음

```java
public void handleTextMessage(WebSocketSession session, TextMessage message)
    throws Exception {
  [...]
  switch (messageId) {
    case "start":
      start(session, jsonMessage);
      break;
    case "stop": {
      stop(session);
      break;
    }
    case "onIceCandidate":
      onRemoteIceCandidate(session, jsonMessage);
      break;
    default:
      sendError(session, "Invalid message, ID: " + messageId);
      break;
  }
  [...]
}
```

handleTextMessage → Signaling

# **Client-Side Logic**

서버사이드에서 생성한 웹소켓을 사용한다

서버와 WebRTC상호작용을 쉽게 하기 위해 **kurento-utils.js** 라이브러리를 사용한다

이 라이브러리는 브라우저 호환성을 위해 만든 adapter.js에 의존한다…

이 라이브러리들은 메이븐에서 dependency로 넣어줌. index.html에 로드되고 index.js에서 사용함

→ 라이브러리를 이용해서 webRTC구현

/helloworld경로에서 웹소켓 만든다.

ws에 리스너 등록

`startResponse`, `error`, `iceCandidate` 세가지 케이스를 처리함

```jsx
// 서버사이드에서 생성한 웹소켓을 ws에 넣어줌
var ws = new WebSocket("ws://" + location.host + "/helloworld");

ws.onmessage = function (message) {
  var parsedMessage = JSON.parse(message.data);
  console.info("Received message: " + message.data);

  switch (parsedMessage.id) {
    case "startResponse":
      startResponse(parsedMessage);
      break;
    case "error":
      if (state == I_AM_STARTING) {
        setState(I_CAN_START);
      }
      onError("Error message from server: " + parsedMessage.message);
      break;
    case "iceCandidate":
      webRtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
        if (error) return console.error("Error adding candidate: " + error);
      });
      break;
    default:
      if (state == I_AM_STARTING) {
        setState(I_CAN_START);
      }
      onError("Unrecognized message", parsedMessage);
  }
};

function start() {
  console.log("Starting video call ...");

  // Disable start button
  setState(I_AM_STARTING);
  showSpinner(videoInput, videoOutput);

  console.log("Creating WebRtcPeer and generating local sdp offer ...");

  var options = {
    localVideo: videoInput,
    remoteVideo: videoOutput,
    onicecandidate: onIceCandidate,
  };
  webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendrecv(
    options,
    function (error) {
      if (error) return console.error(error);
      webRtcPeer.generateOffer(onOffer);
    }
  );
}

function onOffer(error, offerSdp) {
  if (error) return console.error("Error generating the offer");
  console.info("Invoking SDP offer callback function " + location.host);
  var message = {
    id: "start",
    sdpOffer: offerSdp,
  };
  sendMessage(message);
}

function onIceCandidate(candidate) {
  console.log("Local candidate" + JSON.stringify(candidate));

  var message = {
    id: "onIceCandidate",
    candidate: candidate,
  };
  sendMessage(message);
}

function startResponse(message) {
  setState(I_CAN_STOP);
  console.log("SDP answer received from server. Processing ...");

  webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
    if (error) return console.error(error);
  });
}

function stop() {
  console.log("Stopping video call ...");
  setState(I_CAN_START);
  if (webRtcPeer) {
    webRtcPeer.dispose();
    webRtcPeer = null;

    var message = {
      id: "stop",
    };
    sendMessage(message);
  }
  hideSpinner(videoInput, videoOutput);
}

function sendMessage(message) {
  var jsonMessage = JSON.stringify(message);
  console.log("Sending message: " + jsonMessage);
  ws.send(jsonMessage);
}
```

## Dependencies

1. Kurento Client Java dependency (_kurento-client_)
2. JavaScript Kurento utility library (_kurento-utils_) for the client-side

나머지 client 라이브러리는 WebJars
