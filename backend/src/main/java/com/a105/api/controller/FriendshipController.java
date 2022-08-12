package com.a105.api.controller;

import com.a105.api.request.FriendshipRequest;
import com.a105.api.response.DefaultResponse;
import com.a105.api.response.FriendInfoResponse;
import com.a105.api.response.ResponseCode;
import com.a105.api.service.FriendshipService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import com.a105.domain.friendship.Friendship;
import com.a105.security.CurrentUser;
import com.a105.security.UserPrincipal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import static com.a105.api.response.ResponseMessage.*;

@RestController
@RequestMapping("/friend")
@RequiredArgsConstructor
public class FriendshipController {

    private final FriendshipService friendService;

    @GetMapping
    @Operation(summary = "친구 정보 목록 조회")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "친구 정보 목록 조회 성공", content = @Content(array = @ArraySchema( schema = @Schema(implementation = FriendInfoResponse.class))))
    })
    public ResponseEntity<?> getFriendList(@CurrentUser UserPrincipal userPrincipal){
        List<FriendInfoResponse> friendInfos = friendService.getFriendList(userPrincipal.getId());
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, GET_FRIEND_LIST, friendInfos));
    }

    @GetMapping(value = "/waiting")
    @Operation(summary = "수락 대기 중 목록 조회")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "수락 대기 중 목록 조회 성공", content = @Content(array = @ArraySchema( schema = @Schema(implementation = FriendInfoResponse.class))))
    })
    public ResponseEntity<?> getWaitingList(@CurrentUser UserPrincipal userPrincipal){
        List<FriendInfoResponse> friendInfos = friendService.getWaitingList(userPrincipal.getId());
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, GET_WAITING_LIST, friendInfos));
    }

    @PostMapping("/request/{friend_id}")
    @Operation(summary = "친구 추가 요청 전송")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "수락 대기 중 목록 조회 성공", content = @Content( schema = @Schema(implementation = FriendInfoResponse.class)))
    })
    public ResponseEntity<?> sendRequest(@CurrentUser UserPrincipal userPrincipal, @PathVariable("friend_id") Long friendId){
        FriendInfoResponse friendship = friendService.addRequest(userPrincipal.getId(), friendId);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, SEND_FRIEND_REQUEST, friendship));
    }

    @DeleteMapping("/delete/{friend_id}")
    @Operation(summary = "친구 삭제")
    public ResponseEntity<?> deleteFriend(@CurrentUser UserPrincipal userPrincipal, @PathVariable("friend_id") Long friendId){
        friendService.deleteFriend(userPrincipal.getId(), friendId);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, DELETE_FRIEND));
    }

    @DeleteMapping("/received/decline")
    @Operation(summary = "받은 친구 요청 거절")
    public ResponseEntity<?> declineReceivedRequest(@CurrentUser UserPrincipal userPrincipal, @RequestBody FriendshipRequest friendRequest){
        friendService.declineReceivedRequest(userPrincipal.getId(), friendRequest);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, DECLINE_RECEIVED_REQUEST));
    }

    @PatchMapping("/received/accept")
    @Operation(summary = "받은 친구 요청 수락")
    public ResponseEntity<?> acceptReceivedRequest(@CurrentUser UserPrincipal userPrincipal, @RequestBody FriendshipRequest friendRequest){
        friendService.acceptReceivedRequest(userPrincipal.getId(), friendRequest);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, ACCEPT_RECEIVED_REQUEST));
    }

    @DeleteMapping("/sent/cancel")
    @Operation(summary = "보낸 친구 요청 취소")
    public ResponseEntity<?> cancelSentRequest(@CurrentUser UserPrincipal userPrincipal, @RequestBody FriendshipRequest friendRequest){
        friendService.cancelSentRequest(userPrincipal.getId(), friendRequest);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, CANCEL_SENT_REQUEST));
    }

}
