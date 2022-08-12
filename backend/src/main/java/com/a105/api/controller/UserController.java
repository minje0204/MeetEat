package com.a105.api.controller;

import com.a105.api.request.UserBioRequest;
import com.a105.api.request.UserNicknameRequest;
import com.a105.api.response.DefaultResponse;
import com.a105.api.response.ResponseCode;
import com.a105.api.response.UserInfoResponse;
import com.a105.api.service.UserService;
import com.a105.exception.BadRequestException;
import com.a105.security.CurrentUser;
import com.a105.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import static com.a105.api.response.ResponseMessage.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    @Operation(summary = "모든 사용자 정보 조회")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "모든 사용자 정보 조회 성공", content = @Content(array = @ArraySchema( schema = @Schema(implementation = UserInfoResponse.class))))
    })
    public ResponseEntity<?> getAllUsers() {
        List<UserInfoResponse> userInfos = userService.getAllUserInfo();
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, GET_ALL_USERS, userInfos));
    }

    @GetMapping(value = "/{id}")
    @Operation(summary = "특정 사용자 정보 조회", description = "해당 id의 사용자 정보를 조회한다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "특정 사용자 정보 조회 성공", content = @Content( schema = @Schema(implementation = UserInfoResponse.class)))
    })
    public ResponseEntity<?> getUser(@PathVariable("id") Long id) {
        UserInfoResponse userInfo = userService.getUserInfo(id);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, GET_USER, userInfo));
    }

    @GetMapping(value = "/search")
    @Operation(summary = "사용자 검색 결과 조회", description = "이메일 또는 별명을 검색한 결과를 조회한다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "모든 사용자 정보 조회 성공", content = @Content(array = @ArraySchema( schema = @Schema(implementation = UserInfoResponse.class))))
    })
    public ResponseEntity<?> searchUser(@RequestParam(required = false) String email,
        @RequestParam(required = false) String nickname) {
        List<UserInfoResponse> userInfos;
        if(email == null || email.length() == 0){
            email = "";
        }
        if(nickname == null || nickname.length() == 0){
            nickname = "";
        }
        userInfos = userService.searchByEmailOrNickname(email, nickname);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, SEARCH_USER, userInfos));
    }

    @GetMapping("/exists/{nickname}")
    @Operation(summary = "별명 중복 확인", description = "해당 별명이 사용 중인지 조회한다.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "모든 사용자 정보 조회 성공")
    })
    public ResponseEntity<?> checkNicknameDuplicate(@PathVariable String nickname) {
        boolean checkDuplicate = userService.checkDuplicateNickname(nickname);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, CHECK_DUPLICATE_NICKNAME, checkDuplicate));
    }

    @PatchMapping("/bio")
    @Operation(summary = "자기소개 수정")
    public ResponseEntity<?> updateUserBio(@CurrentUser UserPrincipal userPrincipal,
        @RequestBody UserBioRequest bio) {
        UserInfoResponse userInfo = userService.updateUserBio(userPrincipal.getId(), bio);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, UPDATE_USER_BIO, userInfo));
    }

    @PatchMapping("/nickname")
    @Operation(summary = "별명 수정")
    public ResponseEntity<?> updateUserNickname(@CurrentUser UserPrincipal userPrincipal,
        @RequestBody UserNicknameRequest nickname) {
        UserInfoResponse userInfo = userService.updateUserNickname(userPrincipal.getId(), nickname);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, UPDATE_USER_NICKNAME, userInfo));
    }


    @PostMapping("/profile")
    @Operation(summary = "프로필 사진 업로드")
    public ResponseEntity<?> uploadProfileImage(@CurrentUser UserPrincipal userPrincipal, @RequestParam(value = "file") MultipartFile file) {
        UserInfoResponse userInfo = userService.uploadProfileImage(userPrincipal.getId(), file);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, UPLOAD_PROFILE_IMAGE, userInfo));
    }

    @DeleteMapping("/profile")
    @Operation(summary = "프로필 사진 삭제")
    public ResponseEntity<?> deleteProfileImage(@CurrentUser UserPrincipal userPrincipal) {
        UserInfoResponse userInfo = userService.deleteProfileImage(userPrincipal.getId());
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, DELETE_PROFILE_IMAGE, userInfo));
    }

    @PatchMapping("/profile")
    @Operation(summary = "프로필 사진 수정")
    public ResponseEntity<?> changeProfileImage(@CurrentUser UserPrincipal userPrincipal, @RequestParam(value = "file") MultipartFile file){
        UserInfoResponse userInfo = userService.changeProfileImage(userPrincipal.getId(), file);
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, UPLOAD_PROFILE_IMAGE, userInfo));
    }

    @GetMapping("/me")
    @Operation(summary = "현재 로그인한 사용자 정보 조회")
    public ResponseEntity<?> getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        UserInfoResponse userInfo = userService.getUserInfo(userPrincipal.getId());
        return ResponseEntity.ok().body(DefaultResponse.of(ResponseCode.OK, GET_CURRENT_USER, userInfo));
    }

}
