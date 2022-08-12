package com.a105.api.controller;

import static com.a105.api.response.ResponseMessage.CREATE_CONFERENCE;
import static com.a105.api.response.ResponseMessage.GET_RESTAURANT;
import static com.a105.api.response.ResponseMessage.JOIN_CONFERENCE;
import static com.a105.api.response.ResponseMessage.LEAVE_CONFERENCE;

import com.a105.api.request.ConferenceRequest;
import com.a105.api.response.ConferenceListResponse;
import com.a105.api.response.DefaultResponse;
import com.a105.api.response.ResponseCode;
import com.a105.api.service.ConferenceService;
import com.a105.api.service.UserConferenceService;
import com.a105.domain.conference.Conference;
import com.a105.security.CurrentUser;
import com.a105.security.UserPrincipal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/restaurant")
@RequiredArgsConstructor
public class ConferenceController {

    private final ConferenceService conferenceService;
    private final UserConferenceService userConferenceService;

    @GetMapping("/{restaurantId}")
    private ResponseEntity<?> getConferenceList(
        @PathVariable int restaurantId) {
        List<ConferenceListResponse> list = conferenceService.getConferenceList(restaurantId);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, GET_RESTAURANT, list));
    }

    @GetMapping("/{restaurantId}/conference/{conferenceId}")
    private ResponseEntity<?> joinConference(@CurrentUser UserPrincipal userPrincipal,
        @PathVariable Long conferenceId) {
        Conference conference = conferenceService.joinConference(conferenceId, userPrincipal.getId());
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, JOIN_CONFERENCE, conference));
    }

    @PostMapping("/{restaurantId}")
    private ResponseEntity<?> createConference(@CurrentUser UserPrincipal userPrincipal,
        @PathVariable int restaurantId, @RequestBody ConferenceRequest conferenceRequest) {
        Conference conference = conferenceService.createConference(conferenceRequest,
            userPrincipal.getId(), restaurantId);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, CREATE_CONFERENCE, conference));
    }

    @PatchMapping("/{restaurantId}/conference/{conferenceId}")
    private ResponseEntity<?> leaveConference(@CurrentUser UserPrincipal userPrincipal,
        @PathVariable Long conferenceId) {
        userConferenceService.leaveConference(conferenceId, userPrincipal.getId());
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, LEAVE_CONFERENCE));
    }
}
