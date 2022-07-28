package com.a105.api.controller;

import com.a105.api.request.ConferenceRequest;
import com.a105.api.response.ConferenceListResponse;
import com.a105.api.service.ConferenceService;
import com.a105.api.service.UserConferenceService;
import com.a105.domain.conference.Conference;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurant")
@RequiredArgsConstructor
public class ConferenceController {

    private final ConferenceService conferenceService;
    private final UserConferenceService userConferenceService;

    @GetMapping("/{restaurantIdx}")
    private ResponseEntity<List<ConferenceListResponse>> getConferenceList(@PathVariable int restaurantIdx) {
        List<ConferenceListResponse> list = conferenceService.getConferenceList(restaurantIdx);
        return new ResponseEntity<List<ConferenceListResponse>>(list, HttpStatus.OK);
    }

    @GetMapping("/{restaurantIdx}/conference/{conferenceIdx}")
    private ResponseEntity<Conference> joinConference(@PathVariable Long conferenceIdx) {
        Conference conference = conferenceService.getConferenceFromIdx(conferenceIdx);
        if (conference.getCallEndTime() != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (conference.getMaxUserNum() <= conferenceService.getCurrentUserNum(conferenceIdx)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (userConferenceService.checkUserConferenceDuplicate(conferenceIdx, 3L))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        userConferenceService.joinConference(conferenceIdx, 3L);
        return new ResponseEntity<>(conference, HttpStatus.OK);
    }

    @PostMapping("/{restaurantId}")
    private ResponseEntity<Conference> insertConference(@PathVariable int restaurantId, @RequestBody ConferenceRequest conferenceRequest) {
        if (conferenceService.checkConferenceDuplicate(restaurantId, conferenceRequest.getPosition()))
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        Conference conference = conferenceService.insertConference(conferenceRequest, restaurantId);
        userConferenceService.joinConference(conference.getIdx(), 3L);
        return new ResponseEntity<>(conference, HttpStatus.OK);
    }

    @PatchMapping("/{restaurantId}/conference/{conferenceId}")
    private ResponseEntity<?> leaveConference(@PathVariable Long conferenceId) {
        userConferenceService.leaveConference(conferenceId, 3L);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
