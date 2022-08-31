package com.a105.domain.friendship;

import java.util.List;

public interface FriendshipRepositoryCustom {
    List<FriendshipDto> findFriendshipDtos(Long id);

    List<FriendshipDto> findReceivedRequests(Long id);

    List<FriendshipDto> findSentRequests(Long id);

    FriendshipDto converToDto(Long userId, Long id);
}
