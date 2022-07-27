package com.a105.api.controller;

import com.a105.api.response.ConferenceListResponse;
import com.a105.api.service.ConferenceService;
import com.a105.domain.UserConference.UserConference;
import com.a105.domain.conference.Conference;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/restaurant")
@RequiredArgsConstructor
public class ConferenceController {

    private final ConferenceService conferenceService;

//    private final Principal principal;

    @GetMapping("/{restaurantIdx}")
    private ResponseEntity<List<ConferenceListResponse>> getConferenceList(@PathVariable int restaurantIdx){
        List<ConferenceListResponse> list = conferenceService.getConferenceList(restaurantIdx);
        return new ResponseEntity<List<ConferenceListResponse>>(list, HttpStatus.OK);
    }

    @GetMapping("/{restaurantIdx}/conference/{conferenceIdx}")// join 요청
    private ResponseEntity<?> getConference(@PathVariable Long restaurantIdx,@PathVariable Long conferenceIdx){
        Conference conference = conferenceService.getConferenceFromIdx(conferenceIdx);
        if(conference.getCallEndTime() == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
//        UserConference userConference = new UserConference(null, conference.getIdx(), principal.getName(), 0);
//        conferenceService.
        return new ResponseEntity<>(conference, HttpStatus.OK);
    }

//    @PostMapping("/{restaurant}")
//    private ResponseEntity<?> addConference(@RequestBody Conference conference){
//        Conference
//    }
}
