package com.a105.api.controller;

import com.a105.api.request.UserBioRequest;
import com.a105.api.request.UserNicknameRequest;
import com.a105.api.response.DefaultResponse;
import com.a105.api.response.ResponseCode;
import com.a105.api.response.UserInfoResponse;
import com.a105.api.service.AwsS3Service;
import com.a105.api.service.UserService;
import com.a105.domain.user.User;
import com.a105.exception.BadRequestException;
import com.a105.security.CurrentUser;
import com.a105.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import static com.a105.api.response.ResponseMessage.*;

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
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, GET_ALL_USERS, userInfos));
    }

    @GetMapping(value = "/{idx}")
    public ResponseEntity<?> getUser(@PathVariable("idx") Long idx) {
        UserInfoResponse userInfo = userService.getUserInfo(idx);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, GET_USER, userInfo));
    }

    @GetMapping(value = "/search")
    public ResponseEntity<?> searchUser(@RequestParam(required = false) String email,
        @RequestParam(required = false) String nickname) {
        List<UserInfoResponse> userInfos;
        if (nickname == null && email != null && email.length() > 0) {
            userInfos = userService.getUserInfosByEmail(email);
        } else if (email == null && nickname != null && nickname.length() > 0) {
            userInfos = userService.getUserInfosByNickname(nickname);
        } else {
            throw new BadRequestException("검색어를 입력하세요");
        }
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, SEARCH_USER, userInfos));
    }

    @GetMapping("/exists/{nickname}")
    public ResponseEntity<?> checkNicknameDuplicate(@PathVariable String nickname) {
        boolean checkDuplicate = userService.checkDuplicateNickname(nickname);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, CHECK_DUPLICATE_NICKNAME, checkDuplicate));
    }

    @PatchMapping("/{id}/bio")
    public ResponseEntity<?> updateUserBio(@PathVariable("id") Long id,
        @RequestBody UserBioRequest bio) {
        UserInfoResponse userInfo = userService.updateUserBio(id, bio);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, UPDATE_USER_BIO, userInfo));
    }

    @PatchMapping("/{id}/nickname")
    public ResponseEntity<?> updateUserNickname(@PathVariable("id") Long id,
        @RequestBody UserNicknameRequest nickname) {
        UserInfoResponse userInfo = userService.updateUserNickname(id, nickname);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, UPDATE_USER_NICKNAME, userInfo));
    }


    @PostMapping("/{id}/profile")
    public ResponseEntity<?> uploadProfileImage(@PathVariable("id") Long id, @RequestParam(value = "file") MultipartFile file) {
        String fileUrl = storageService.uploadFile(file, "profile/" + id);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, UPLOAD_PROFILE_IMAGE, fileUrl));
    }

    @DeleteMapping("/{id}/profile")
    public ResponseEntity<?> deleteProfileImage(@PathVariable("id") Long id) {
        storageService.deleteFile("profile/" + id);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, DELETE_PROFILE_IMAGE));
    }

    @PatchMapping("/{id}/profile")
    public ResponseEntity<?> changeProfileImage(@PathVariable("id") Long id, @RequestParam(value = "file") MultipartFile file){
        storageService.deleteFile("profile/" + id);
        String fileUrl = storageService.uploadFile(file, "profile/" + id);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, UPLOAD_PROFILE_IMAGE, fileUrl));
    }


    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        UserInfoResponse userInfo = userService.getUserInfo(userPrincipal.getId());
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, GET_CURRENT_USER, userInfo));
    }

}
