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

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;

import java.io.Closeable;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import javax.annotation.PreDestroy;

import org.kurento.client.Continuation;
import org.kurento.client.MediaPipeline;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.WebSocketSession;

/**
 * @author Ivan Gracia (izanmail@gmail.com)
 * @since 4.3.1
 */
public class Room implements Closeable {

    private final Logger log = LoggerFactory.getLogger(Room.class);

    private final ConcurrentMap<String, UserSession> participants = new ConcurrentHashMap<>();
    private final MediaPipeline pipeline;
    private final String name;
    private String host;

    public String getHost() {
        return host;
    }

    private void setHost(String host) {
        this.host = host;
    }

    public void changeHost(String name) {
        setHost(name);
        final JsonObject hostChanged = new JsonObject();
        hostChanged.addProperty("id", "hostChanged");
        hostChanged.addProperty("name", name);
        for (final UserSession participant : participants.values()) {
            try {
                participant.sendMessage(hostChanged);
            } catch (final IOException e) {
                log.debug("ROOM {}: participant {} could not be notified", name,
                    participant.getName(), e);
            }
        }
    }

    public void sendChat(String name, String chat) {
        final JsonObject sendChat = new JsonObject();
        sendChat.addProperty("id", "chat");
        sendChat.addProperty("name", name);
        sendChat.addProperty("chat", chat);
        for (final UserSession participant : participants.values()) {
            try {
                participant.sendMessage(sendChat);
            } catch (final IOException e) {
                log.debug("ROOM {}: participant {} could not be notified", name,
                    participant.getName(), e);
            }
        }
    }

    public void sendTable(String name, JsonArray data) {
        final JsonObject sendTable = new JsonObject();
        sendTable.addProperty("id", "receiveTable");
        sendTable.addProperty("name", name);
        sendTable.addProperty("data", data.toString());
        for (final UserSession participant : participants.values()) {
            try {
                participant.sendMessage(sendTable);
            } catch (final IOException e) {
                log.debug("ROOM {}: participant {} could not be notified", name,
                    participant.getName(), e);
            }
        }
    }

    public String getName() {
        return name;
    }

    public Room(String roomName, MediaPipeline pipeline) {
        this.name = roomName;
        this.pipeline = pipeline;
        log.info("ROOM {} has been created", roomName);
    }

    @PreDestroy
    private void shutdown() {
        this.close();
    }

    public UserSession join(String userName, WebSocketSession session, String userId)
        throws IOException {
        log.info("ROOM {}: adding participant {}", this.name, userName);
        final UserSession participant = new UserSession(userName, this.name, session,
            this.pipeline, userId);
        joinRoom(participant);
        participants.put(participant.getName(), participant);
        sendParticipantNames(participant);
        return participant;
    }

    public void leave(UserSession user) throws IOException, ClassNotFoundException, SQLException {
        log.debug("PARTICIPANT {}: Leaving room {}", user.getName(), this.name);
        this.removeParticipant(user.getName());
        user.close();
        Class.forName("org.mariadb.jdbc.Driver");
        Connection con = DriverManager.getConnection("jdbc:mariadb://mariadb:3306/a105?characterEncoding=UTF-8&serverTimezone=UTC",
            "root", "meeteat1234");
        PreparedStatement pstmt = null;
        if (getParticipants().isEmpty()) {
            pstmt = con.prepareStatement(
                "update conference set call_end_time = now() where id = " + name);
            pstmt.execute();
        }
        pstmt.close();
        con.close();
    }

    private Collection<String> joinRoom(UserSession newParticipant) throws IOException {
        final JsonObject newParticipantMsg = new JsonObject();
        newParticipantMsg.addProperty("id", "newParticipantArrived");
        newParticipantMsg.addProperty("name", newParticipant.getName());

        final List<String> participantsList = new ArrayList<>(participants.values().size());
        log.debug("ROOM {}: notifying other participants of new participant {}", name,
            newParticipant.getName());

        for (final UserSession participant : participants.values()) {
            try {
                participant.sendMessage(newParticipantMsg);
            } catch (final IOException e) {
                log.debug("ROOM {}: participant {} could not be notified", name,
                    participant.getName(), e);
            }
            participantsList.add(participant.getName());
        }

        return participantsList;
    }

    private void removeParticipant(String name) throws IOException {
        participants.remove(name);

        log.debug("ROOM {}: notifying all users that {} is leaving the room", this.name, name);

        final List<String> unnotifiedParticipants = new ArrayList<>();
        final JsonObject participantLeftJson = new JsonObject();
        participantLeftJson.addProperty("id", "participantLeft");
        participantLeftJson.addProperty("name", name);
        for (final UserSession participant : participants.values()) {
            try {
                participant.cancelVideoFrom(name);
                participant.sendMessage(participantLeftJson);
            } catch (final IOException e) {
                unnotifiedParticipants.add(participant.getName());
            }
        }

        if (!unnotifiedParticipants.isEmpty()) {
            log.debug("ROOM {}: The users {} could not be notified that {} left the room",
                this.name,
                unnotifiedParticipants, name);
        }

    }

    public void sendParticipantNames(UserSession user) throws IOException {

        final JsonArray participantsArray = new JsonArray();
        for (final UserSession participant : this.getParticipants()) {
            if (!participant.equals(user)) {
                final JsonElement participantName = new JsonPrimitive(participant.getName());
                participantsArray.add(participantName);
            }
        }

        final JsonObject existingParticipantsMsg = new JsonObject();
        existingParticipantsMsg.addProperty("id", "existingParticipants");
        existingParticipantsMsg.add("data", participantsArray);
        existingParticipantsMsg.addProperty("host", host);
        log.debug("PARTICIPANT {}: sending a list of {} participants", user.getName(),
            participantsArray.size());
        user.sendMessage(existingParticipantsMsg);
    }

    public Collection<UserSession> getParticipants() {
        return participants.values();
    }

    public UserSession getParticipant(String name) {
        return participants.get(name);
    }

    @Override
    public void close() {
        for (final UserSession user : participants.values()) {
            try {
                user.close();
            } catch (IOException e) {
                log.debug("ROOM {}: Could not invoke close on participant {}", this.name,
                    user.getName(),
                    e);
            }
        }

        participants.clear();

        pipeline.release(new Continuation<Void>() {

            @Override
            public void onSuccess(Void result) throws Exception {
                log.trace("ROOM {}: Released Pipeline", Room.this.name);
            }

            @Override
            public void onError(Throwable cause) throws Exception {
                log.warn("PARTICIPANT {}: Could not release Pipeline", Room.this.name);
            }
        });

        log.debug("Room {} closed", this.name);
    }

}
