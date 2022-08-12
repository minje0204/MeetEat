package com.a105.api.request;

import lombok.Getter;
@Getter
public class SignupRequest {
    String email;
    String nickname;
    String provider;
    String bio;
}
