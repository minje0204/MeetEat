package com.a105.api.request;

import com.a105.domain.oauth2.AuthProvider;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;
@Getter
public class SignupRequest {
    String email;
    String nickname;
    String provider;
    String bio;
}
