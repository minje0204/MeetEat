package com.a105.domain.friendship;

import java.util.List;

public interface FriendshipRepositoryCustom {
    public List<FriendshipDto> findFriendshipDtos(Long id);

    public List<FriendshipDto> findReceivedRequests(Long id);

    public List<FriendshipDto> findSentRequests(Long id);

    FriendshipDto converToDto(Long userId, Long id);
}
