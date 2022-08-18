package com.a105.api.service;

import com.a105.api.request.UserBioRequest;
import com.a105.api.request.UserNicknameRequest;
import com.a105.api.response.NicknameResponse;
import com.a105.api.response.SearchResponse;
import com.a105.api.response.UserInfoResponse;
import com.a105.domain.user.User;
import com.a105.domain.user.UserRepository;
import com.a105.domain.user.UserSearchDto;
import com.a105.exception.BadRequestException;
import com.a105.exception.ResourceNotFoundException;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserService {

    private final AwsS3Service storageService;
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

    public List<SearchResponse> searchByEmailOrNickname(Long userId, String email, String nickname){
        if(email.length() == 0 && nickname.length() == 0){
            throw new BadRequestException("No Search Keyword");
        }
        List<SearchResponse> searchResults = new ArrayList<>();
        userRepository.search(userId, email, nickname).forEach(
            searchDto ->  searchResults.add(SearchResponse.of(findById(searchDto.getId()), searchDto.getStatus()))
        );
        return searchResults;
    }

    public NicknameResponse checkDuplicateNickname(String nickname) {
        NicknameResponse nicknameResponse = NicknameResponse.of(nickname, userRepository.findOneByNickname(nickname) != null);
        return nicknameResponse;
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

    @Transactional
    public UserInfoResponse uploadProfileImage(Long id, MultipartFile file){
        String dirFileName = "profile/" + id;
        String fileUrl = storageService.uploadMultipartFile(file, dirFileName);

        User user = findById(id);
        user.setProfile(fileUrl);
        return UserInfoResponse.fromEntity(userRepository.save(user));
    }

    @Transactional
    public UserInfoResponse deleteProfileImage(Long id){
        String dirFileName = "profile/" + id;
        storageService.deleteFile(dirFileName);

        User user = findById(id);
        user.setProfile(null);
        return UserInfoResponse.fromEntity(userRepository.save(user));
    }

    @Transactional
    public UserInfoResponse changeProfileImage(Long id, MultipartFile file){
        String dirFileName = "profile/" + id;
        storageService.deleteFile(dirFileName);

        return uploadProfileImage(id, file);
    }

    public UserInfoResponse findByNickname(String nickname){
        User user = userRepository.findOneByNickname(nickname);
        return UserInfoResponse.fromEntity(user);
    }


}
