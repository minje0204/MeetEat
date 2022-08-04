package com.a105.api.controller;

import com.a105.api.request.UserBioRequest;
import com.a105.api.request.UserNicknameRequest;
import com.a105.api.response.UserInfoResponse;
import com.a105.api.service.AwsS3Service;
import com.a105.api.service.UserService;
import com.a105.domain.user.User;
import com.a105.exception.ResourceNotFoundException;
import com.a105.security.CurrentUser;
import com.a105.security.UserPrincipal;
import com.nimbusds.openid.connect.sdk.claims.UserInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Autowired
    private AwsS3Service storageService;

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<UserInfoResponse> userInfos = userService.getAllUserInfo();
        return new ResponseEntity<>(userInfos, HttpStatus.OK);
    }

    @GetMapping(value = "/{idx}")
    public ResponseEntity<?> getUser(@PathVariable("idx") Long idx) {
        UserInfoResponse userInfo = userService.getUserInfo(idx);
        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }

    @GetMapping(value = "/search")
    public ResponseEntity<?> searchUser(@RequestParam(required = false) String email,
        @RequestParam(required = false) String nickname) {
        List<UserInfoResponse> userInfos;
        if (nickname == null) {
            userInfos = userService.getUserInfosByEmail(email);
        } else if (email == null) {
            userInfos = userService.getUserInfosByNickname(nickname);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(userInfos, HttpStatus.OK);
    }

    @GetMapping("/exists/{nickname}")
    public ResponseEntity<?> checkNicknameDuplicate(@PathVariable String nickname) {
        return  new ResponseEntity<>(userService.checkNicknameDuplicate(nickname), HttpStatus.OK);
    }

    @PatchMapping("/{idx}/bio")
    public ResponseEntity<?> updateUserBio(@PathVariable("idx") Long idx,
        @RequestBody UserBioRequest bio) {
        UserInfoResponse userInfo = userService.updateUserBio(idx, bio);
        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }

    @PatchMapping("/{idx}/nickname")
    public ResponseEntity<?> updateUserNickname(@PathVariable("idx") Long idx,
        @RequestBody UserNicknameRequest nickname) {
        UserInfoResponse userInfo = userService.updateUserNickname(idx, nickname);
        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }


    @PostMapping("/{id}/profile")
    public ResponseEntity<String> uploadProfile(@PathVariable("id") Long id, @RequestParam(value = "file") MultipartFile file) {
        return new ResponseEntity<>(storageService.uploadFile(file, "profile/" + id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}/profile")
    public ResponseEntity<String> deleteProfile(@PathVariable("id") Long id) {
        return new ResponseEntity<>(storageService.deleteFile("profile/" + id), HttpStatus.OK);
    }

    @PatchMapping("/{id}/profile")
    public ResponseEntity<String> changeProfile(@PathVariable("id") Long id, @RequestParam(value = "file") MultipartFile file){
        storageService.deleteFile("profile/" + id);
        return new ResponseEntity<>(storageService.uploadFile(file, "profile/" + id), HttpStatus.OK);
    }


    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userService.findById(userPrincipal.getId());

    }

}
