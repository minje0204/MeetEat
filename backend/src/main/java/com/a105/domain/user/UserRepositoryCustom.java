package com.a105.domain.user;

import java.util.List;

public interface UserRepositoryCustom {

    List<User> searchByEmail(String email);

    List<User> searchByNickname(String nickname);


}
