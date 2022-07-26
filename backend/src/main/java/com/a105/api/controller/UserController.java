package com.a105.api.controller;

import com.a105.api.response.UserInfoResponse;
import com.a105.api.service.UserService;
import com.a105.domain.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> user = userService.findAll();
        return new ResponseEntity<List<User>>(user, HttpStatus.OK);
    }

    @GetMapping(value = "/{idx}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> getUser(@PathVariable("idx") Long idx){
        UserInfoResponse userInfo = userService.getUserInfo(idx);
        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }

    @GetMapping(value = "/search")
    public ResponseEntity<List<User>> searchUser(@RequestParam(required = false) String email, @RequestParam(required = false) String nickname){
        List<User> users;
        if(nickname == null){
            users = userService.searchFromEmail(email);
        }
        else if(email == null){
            users = userService.searchFromNickname(nickname);
        } else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }


}
