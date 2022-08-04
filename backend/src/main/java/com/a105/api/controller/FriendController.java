package com.a105.api.controller;

import com.a105.api.request.FriendRequest;
import com.a105.api.response.FriendInfoResponse;
import com.a105.api.response.UserInfoResponse;
import com.a105.api.service.FriendshipService;
import com.a105.domain.friendship.Friendship;
import com.a105.domain.friendship.FriendshipDto;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/friend")
@RequiredArgsConstructor
public class FriendController {

    private final FriendshipService friendService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getAllFriends(@PathVariable("id") Long id){
        List<FriendInfoResponse> friendInfos = friendService.getFriendDtos(id);
        return new ResponseEntity<>(friendInfos, HttpStatus.OK);
    }

    @PostMapping("/{id}/request/{friend_id}")
    public ResponseEntity<?> sendRequest(@PathVariable("id") Long userId, @PathVariable("friend_id") Long friendId){
        Friendship friendship = friendService.addRequest(userId, friendId);
        return new ResponseEntity<>(friendship, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}/received/decline")
    public ResponseEntity<?> declineReceivedRequest(@PathVariable("id") Long userId, @RequestBody FriendRequest friendRequest){
        friendService.declineReceivedRequest(userId, friendRequest);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PatchMapping("/{id}/received/accept")
    public ResponseEntity<?> acceptReceivedRequest(@PathVariable("id") Long userId, @RequestBody FriendRequest friendRequest){
        friendService.acceptReceivedRequest(userId, friendRequest);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @DeleteMapping("/{id}/sent/cancel")
    public ResponseEntity<?> cancelSentRequest(@PathVariable("id") Long userId, @RequestBody FriendRequest friendRequest){
        friendService.cancelSentRequest(userId, friendRequest);
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
