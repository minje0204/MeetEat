package com.a105.domain.user;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class UserSearchDto {

    Long id;
    int status;

    @QueryProjection
    public UserSearchDto(Long id, int status){
        this.id = id;
        this.status = status;
    }
}
