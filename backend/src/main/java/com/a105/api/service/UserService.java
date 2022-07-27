package com.a105.api.service;

import com.a105.api.request.UserBioRequest;
import com.a105.api.request.UserNicknameRequest;
import com.a105.api.response.UserInfoResponse;
import com.a105.domain.user.User;
import com.a105.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserInfoResponse getUserInfo(Long idx){
        return UserInfoResponse.fromEntity(getUserFromIdx(idx));
    }

    public User getUserFromIdx(Long idx){
        return userRepository.findById(idx).orElseThrow();
    }

    public List<User> searchFromEmail(String email){
        return userRepository.searchByEmail(email);
    }

    public List<User> searchFromNickname(String nickname){
        return userRepository.searchByNickname(nickname);
    }

    public List<User> findAll() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(e -> users.add(e));
        return users;
    }
    
    public boolean checkNicknameDuplicate(String nickname){
        return userRepository.existsByNickname(nickname);
    }

    @Transactional
    public UserInfoResponse updateUserBio(Long idx, UserBioRequest userBioRequest){
        User user = getUserFromIdx(idx);
        userBioRequest.updateUserBio(user);
        return UserInfoResponse.fromEntity(user);
    }

    @Transactional
    public UserInfoResponse updateUserNickname(Long idx, UserNicknameRequest userNicknameRequest) {
        User user = getUserFromIdx(idx);
        userNicknameRequest.updateUserNickname(user);
        return UserInfoResponse.fromEntity(user);
        // -> exception 작성하기 (ResourceNotFoundException)
    }
}
