package com.a105.domain.user;

import java.util.List;

public interface UserRepositoryCustom {

    Boolean findOneByNickname(String nickname);

    List<User> search(String email, String nickname);

    List<User> searchByEmail(String email);

    List<User> searchByNickname(String nickname);


}
