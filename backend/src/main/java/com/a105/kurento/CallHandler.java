/*
 * (C) Copyright 2014 Kurento (http://kurento.org/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package com.a105.kurento;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.sql.SQLException;
import org.kurento.client.IceCandidate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

/**
 * @author Ivan Gracia (izanmail@gmail.com)
 * @since 4.3.1
 */
public class CallHandler extends TextWebSocketHandler {

    private static final Logger log = LoggerFactory.getLogger(CallHandler.class);

    private static final Gson gson = new GsonBuilder().create();

    @Autowired
    private RoomManager roomManager;

    @Autowired
    private UserRegistry registry;

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        final JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);

        final UserSession user = registry.getBySession(session);

        if (user != null) {
            log.debug("Incoming message from user '{}': {}", user.getName(), jsonMessage);
        } else {
            log.debug("Incoming message from new user: {}", jsonMessage);
        }

        switch (jsonMessage.get("id").getAsString()) {
            case "sendChat":
                sendChat(jsonMessage);
                break;
            case "joinRoom":
                joinRoom(jsonMessage, session);
                break;
            case "receiveVideoFrom":
                final String senderName = jsonMessage.get("sender").getAsString();
                final UserSession sender = registry.getByName(senderName);
                final String sdpOffer = jsonMessage.get("sdpOffer").getAsString();
                user.receiveVideoFrom(sender, sdpOffer);
                break;
            case "leaveRoom":
                leaveRoom(user);
                break;
            case "onIceCandidate":
                JsonObject candidate = jsonMessage.get("candidate").getAsJsonObject();

                if (user != null) {
                    IceCandidate cand = new IceCandidate(candidate.get("candidate").getAsString(),
                        candidate.get("sdpMid").getAsString(),
                        candidate.get("sdpMLineIndex").getAsInt());
                    user.addCandidate(cand, jsonMessage.get("name").getAsString());
                }
                break;
            case "changeHost":
                changeHost(jsonMessage);
                break;
            case "kickOut":
                kickOut(jsonMessage);
                break;
            case "updateTable":
                updateTable(jsonMessage);
                break;
            default:
                System.out.println(jsonMessage.getAsString());
                break;
        }
    }

    private void updateTable(JsonObject params) {
        System.out.println(params);
        final String roomName = params.get("room").getAsString();
        final String name = params.get("name").getAsString();
        final JsonArray data = params.get("data").getAsJsonArray();
        log.info("PARTICIPANT {}: trying to updating table with {} in room {}", name, data,
            roomName);
        Room room = roomManager.getRoom(roomName);
        room.sendTable(name, data);
    }

    private void sendChat(JsonObject params) {
        final String roomName = params.get("room").getAsString();
        final String name = params.get("name").getAsString();
        final String chat = params.get("chat").getAsString();
        log.info("PARTICIPANT {}: trying to chatting in room {} saying {}", name, roomName, chat);
        Room room = roomManager.getRoom(roomName);
        room.sendChat(name, chat);
    }

    private void kickOut(JsonObject params)
        throws IOException, SQLException, ClassNotFoundException {
        final String roomName = params.get("room").getAsString();
        final String name = params.get("name").getAsString();
        final String kick = params.get("kick").getAsString();
        log.info("room {} HOST {}: trying to kick {} out", roomName, name, kick);
        Room room = roomManager.getRoom(roomName);
        if (!room.getHost().equals(name)) {
            log.info("permission denied : attempt to kick out");
            return;
        }
        UserSession user = registry.getByName(kick);
        leaveRoom(user);
    }

    private void changeHost(JsonObject params) {
        final String roomName = params.get("room").getAsString();
        final String name = params.get("name").getAsString();
        final String change = params.get("change").getAsString();
        log.info("room {} HOST {}: trying to change the host to {}", roomName, name, change);
        Room room = roomManager.getRoom(roomName);
        if (!room.getHost().equals(name)) {
            log.info("permission denied : attempt to change host");
            return;
        }
        room.changeHost(change);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status)
        throws Exception {
        UserSession user = registry.removeBySession(session);
        roomManager.getRoom(user.getRoomName()).leave(user);
    }

    private void joinRoom(JsonObject params, WebSocketSession session) throws IOException {
        final String roomName = params.get("room").getAsString();
        final String name = params.get("name").getAsString();
        final String userId = params.get("userId").getAsString();
        log.info("PARTICIPANT {}: trying to join room {}", name, roomName);

        Room room = roomManager.getRoom(roomName);
        if (room.getHost() == null) {
            room.changeHost(name);
        }
        final UserSession user = room.join(name, session, userId);
        registry.register(user);
//        log.info("PARTICIPANT {}: joined {} host is {}", name, roomName, room.getHost());
    }

    private void leaveRoom(UserSession user)
        throws IOException, SQLException, ClassNotFoundException {
        final Room room = roomManager.getRoom(user.getRoomName());
        room.leave(user);
        if (room.getParticipants().isEmpty()) {
            roomManager.removeRoom(room);
        }
    }
}
