package com.a105.api.service;

import com.a105.api.request.FriendRequest;
import com.a105.api.response.FriendInfoResponse;
import com.a105.domain.friendship.FriendshipDto;
import com.a105.domain.friendship.Friendship;
import com.a105.domain.friendship.FriendshipRepository;
import com.a105.domain.user.User;
import com.a105.exception.BadRequestException;
import com.a105.exception.ResourceNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FriendshipService {

    private final FriendshipRepository friendRepository;
    private final UserService userService;
    public List<FriendInfoResponse> getFriendDtos(Long id){
        List<FriendshipDto> friendshipDtos = friendRepository.findFriendDtos(id);
        List<FriendInfoResponse> friendInfoResponses = new ArrayList<>();

        for (FriendshipDto friendshipDto:friendshipDtos) {
            User friend = userService.findById(friendshipDto.getFriendId());
            FriendInfoResponse friendInfoResponse = FriendInfoResponse.fromEntity(friend, friendshipDto);
            friendInfoResponses.add(friendInfoResponse);
        }
        return friendInfoResponses;
    }


    /**
     * 새로 친구 요청을 보낸다.
     * @param friendId
     */
    public Friendship addRequest(Long userId, Long friendId){
        Optional<Friendship> sent = findByUserIdAndFriendId(userId, friendId);
        Optional<Friendship> received = findByUserIdAndFriendId(friendId, userId);

        if(sent.isEmpty() && received.isEmpty()){
            Friendship newFriendship = friendRepository.save(new Friendship(userId, friendId, 0));
            return newFriendship;
        } else if(sent.isPresent() && sent.get().getStatus() == 0){
            throw new BadRequestException("상대에게 이미 요청을 보냈습니다.");
        } else if(received.isPresent() && received.get().getStatus() == 0) {
            throw new BadRequestException("상대로부터 이미 요청을 받았습니다.");
        } else {
            throw new BadRequestException("상대와 이미 친구입니다.");
        }
    }

    public Friendship findById(Long id) {
        return friendRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Friendship", "id", id));
    }

    public Optional<Friendship> findByUserIdAndFriendId(Long userId, Long friendId){
        return friendRepository.findByUserIdAndFriendId(userId, friendId);
    }


    public void declineReceivedRequest(Long id, FriendRequest friendRequest){
        // 받은 요청을 거절한다.
        Friendship friendship = findById(friendRequest.getId());
        if(friendship.getStatus() == 1){
            throw new BadRequestException("요청을 이미 수락했습니다.");
        }
        friendRepository.delete(friendship);
    }

    @Transactional
    public void acceptReceivedRequest(Long id, FriendRequest friendRequest){
        // 받은 요청을 수락한다.
        Friendship friendship = findById(friendRequest.getId());
        if(friendship.getStatus() == 1){
            throw new BadRequestException("상대와 이미 친구입니다.");
        }
        friendRequest.updateFriend(friendship, 1);
    }

    public void cancelSentRequest(Long id, FriendRequest friendRequest){
        // 보낸 요청을 취소한다.
        Friendship friendship = findById(friendRequest.getId());
        if(friendship.getStatus() == 1){
            throw new BadRequestException("상대가 요청을 이미 받았습니다.");
        }
        friendRepository.delete(friendship);
    }

}
