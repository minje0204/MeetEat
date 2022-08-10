package com.a105.api.controller;

import com.a105.api.request.FriendshipRequest;
import com.a105.api.response.DefaultResponse;
import com.a105.api.response.FriendInfoResponse;
import com.a105.api.response.ResponseCode;
import com.a105.api.service.FriendshipService;
import com.a105.domain.friendship.Friendship;
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

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getFriendList(@PathVariable("id") Long userId){
        List<FriendInfoResponse> friendInfos = friendService.getFriendList(userId);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, GET_FRIEND_LIST, friendInfos));
    }

    @GetMapping(value = "/{id}/waiting")
    public ResponseEntity<?> getWaitingList(@PathVariable("id") Long userId){
        List<FriendInfoResponse> friendInfos = friendService.getWaitingList(userId);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, GET_WAITING_LIST, friendInfos));
    }

    @PostMapping("/{id}/request/{friend_id}")
    public ResponseEntity<?> sendRequest(@PathVariable("id") Long userId, @PathVariable("friend_id") Long friendId){
        Friendship friendship = friendService.addRequest(userId, friendId);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, SEND_FRIEND_REQUEST, friendship));
    }

    @DeleteMapping("/{id}/delete/{friend_id}")
    public ResponseEntity<?> deleteFriend(@PathVariable("id") Long userId, @PathVariable("friend_id") Long friendId){
        friendService.deleteFriend(userId, friendId);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, DELETE_FRIEND));
    }

    @DeleteMapping("/{id}/received/decline")
    public ResponseEntity<?> declineReceivedRequest(@PathVariable("id") Long userId, @RequestBody FriendshipRequest friendRequest){
        friendService.declineReceivedRequest(userId, friendRequest);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, DECLINE_RECEIVED_REQUEST));
    }

    @PatchMapping("/{id}/received/accept")
    public ResponseEntity<?> acceptReceivedRequest(@PathVariable("id") Long userId, @RequestBody FriendshipRequest friendRequest){
        friendService.acceptReceivedRequest(userId, friendRequest);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, ACCEPT_RECEIVED_REQUEST));
    }

    @DeleteMapping("/{id}/sent/cancel")
    public ResponseEntity<?> cancelSentRequest(@PathVariable("id") Long userId, @RequestBody FriendshipRequest friendRequest){
        friendService.cancelSentRequest(userId, friendRequest);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, CANCEL_SENT_REQUEST));
    }

}
