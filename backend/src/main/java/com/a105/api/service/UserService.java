package com.a105.api.service;

import com.a105.api.request.UserBioRequest;
import com.a105.api.request.UserNicknameRequest;
import com.a105.api.response.UserInfoResponse;
import com.a105.domain.user.User;
import com.a105.domain.user.UserRepository;
import com.a105.exception.BadRequestException;
import com.a105.exception.ResourceNotFoundException;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserInfoResponse getUserInfo(Long id) {
        return UserInfoResponse.fromEntity(findById(id));
    }

    public List<UserInfoResponse> getAllUserInfo() {
        List<UserInfoResponse> userInfos = new ArrayList<>();
        userRepository.findAll().forEach(user -> userInfos.add(UserInfoResponse.fromEntity(user)));
        return userInfos;
    }

    public User findById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
    }

    public List<UserInfoResponse> searchByEmailOrNickname(String email, String nickname){
        if(email == "" && nickname == ""){
            throw new BadRequestException("No Search Keyword");
        }
        List<UserInfoResponse> userInfos = new ArrayList<>();
        userRepository.search(email, nickname).forEach(user ->  userInfos.add(getUserInfo(user.getId())));
        return userInfos;
    }

    public List<UserInfoResponse> getUserInfosByEmail(String email){
        List<UserInfoResponse> userInfos = new ArrayList<>();
        userRepository.searchByEmail(email).forEach(user ->  userInfos.add(getUserInfo(user.getId())));
        return userInfos;
    }

    public List<UserInfoResponse> getUserInfosByNickname(String nickname){
        List<UserInfoResponse> userInfos = new ArrayList<>();
        userRepository.searchByNickname(nickname).forEach(user ->  userInfos.add(getUserInfo(user.getId())));
        return userInfos;
    }

    public boolean checkDuplicateNickname(String nickname) {
        return userRepository.findOneByNickname(nickname);
    }

    @Transactional
    public UserInfoResponse updateUserBio(Long id, UserBioRequest userBioRequest) {
        User user = findById(id);
        userBioRequest.updateUserBio(user);
        return UserInfoResponse.fromEntity(userRepository.save(user));
    }

    @Transactional
    public UserInfoResponse updateUserNickname(Long id, UserNicknameRequest userNicknameRequest) {
        User user = findById(id);
        userNicknameRequest.updateUserNickname(user);
        return UserInfoResponse.fromEntity(userRepository.save(user));
    }


}
