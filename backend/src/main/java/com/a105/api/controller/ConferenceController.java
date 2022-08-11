package com.a105.api.controller;

import com.a105.api.request.ConferenceRequest;
import com.a105.api.response.ConferenceListResponse;
import com.a105.api.service.ConferenceService;
import com.a105.api.service.UserConferenceService;
import com.a105.domain.conference.Conference;
import com.a105.security.CurrentUser;
import com.a105.security.UserPrincipal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    private ResponseEntity<List<ConferenceListResponse>> getConferenceList(
        @PathVariable int restaurantId) {
        List<ConferenceListResponse> list = conferenceService.getConferenceList(restaurantId);
        return new ResponseEntity<List<ConferenceListResponse>>(list, HttpStatus.OK);
    }

    @GetMapping("/{restaurantId}/conference/{conferenceId}")
    private ResponseEntity<Conference> joinConference(@CurrentUser UserPrincipal userPrincipal,
        @PathVariable Long conferenceId) {
        Long userId = userPrincipal.getId();
        Conference conference = conferenceService.getConferenceFromId(conferenceId);
        if (conference == null || conference.getCallEndTime() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (conference.getMaxUserNum() <= conferenceService.getCurrentUserNum(conferenceId)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (userConferenceService.checkUserConferenceDuplicate(conferenceId, userId)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        userConferenceService.joinConference(conferenceId, userId);
        return new ResponseEntity<>(conference, HttpStatus.OK);
    }

    @PostMapping("/{restaurantId}")
    private ResponseEntity<Conference> createConference(@CurrentUser UserPrincipal userPrincipal,
        @PathVariable int restaurantId, @RequestBody ConferenceRequest conferenceRequest) {
        if (conferenceService.checkConferenceDuplicate(restaurantId,
            conferenceRequest.getPosition())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Conference conference = conferenceService.createConference(conferenceRequest,
            userPrincipal.getId(), restaurantId);
        userConferenceService.joinConference(conference.getId(), (userPrincipal.getId()));
        return new ResponseEntity<>(conference, HttpStatus.OK);
    }

    @PatchMapping("/{restaurantId}/conference/{conferenceId}")
    private ResponseEntity<?> leaveConference(@CurrentUser UserPrincipal userPrincipal,
        @PathVariable Long conferenceId) {
        userConferenceService.leaveConference(conferenceId, userPrincipal.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
