package com.a105.api.controller;

import static com.a105.api.response.ResponseMessage.*;

import com.a105.api.request.ConferenceRequest;
import com.a105.api.response.ConferenceListResponse;
import com.a105.api.response.DefaultResponse;
import com.a105.api.response.ResponseCode;
import com.a105.api.response.UserInfoResponse;
import com.a105.api.service.AuthService;
import com.a105.api.service.ConferenceService;
import com.a105.api.service.UserConferenceService;
import com.a105.domain.conference.Conference;
import com.a105.security.CurrentUser;
import com.a105.security.UserPrincipal;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/restaurant")
@RequiredArgsConstructor
public class ConferenceController {

    private final ConferenceService conferenceService;
    private final UserConferenceService userConferenceService;
    private final AuthService authService;

    @GetMapping("/{restaurantId}")
    private ResponseEntity<?> getConferenceList(
        @PathVariable int restaurantId) {
        List<ConferenceListResponse> list = conferenceService.getConferenceList(restaurantId);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, GET_RESTAURANT, list));
    }

    @GetMapping("/{restaurantId}/conference/{conferenceId}")
    private ResponseEntity<?> joinConference(HttpServletRequest request,
        @PathVariable Long conferenceId) {
        String headerValue = request.getHeader("Authorization");
        String token = headerValue.substring("Bearer ".length());
        UserInfoResponse userInfoResponse = authService.getUserInfoFromToken(token);
        Conference conference = conferenceService.joinConference(conferenceId,
            userInfoResponse.getId());
        return ResponseEntity.ok()
            .body(DefaultResponse.of(ResponseCode.OK, JOIN_CONFERENCE, conference));
    }

    @PostMapping("/{restaurantId}")
    private ResponseEntity<?> createConference(HttpServletRequest request,
        @PathVariable int restaurantId, @RequestBody ConferenceRequest conferenceRequest) {
        String headerValue = request.getHeader("Authorization");
        String token = headerValue.substring("Bearer ".length());
        UserInfoResponse userInfoResponse = authService.getUserInfoFromToken(token);
        Conference conference = conferenceService.createConference(conferenceRequest,
            userInfoResponse.getId(), restaurantId);
        return ResponseEntity.ok()
            .body(DefaultResponse.of(ResponseCode.OK, CREATE_CONFERENCE, conference));
    }

    @PatchMapping("/{restaurantId}/conference/{conferenceId}")
    private ResponseEntity<?> leaveConference(HttpServletRequest request,
        @PathVariable Long conferenceId) {
        String headerValue = request.getHeader("Authorization");
        String token = headerValue.substring("Bearer ".length());
        UserInfoResponse userInfoResponse = authService.getUserInfoFromToken(token);
        userConferenceService.leaveConference(conferenceId, userInfoResponse.getId());
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, LEAVE_CONFERENCE));
    }
}
