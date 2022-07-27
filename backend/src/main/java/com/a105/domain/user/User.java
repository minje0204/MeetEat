package com.a105.domain.user;

import com.a105.domain.tray.Tray;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    private String email;
    @Setter
    private String nickname;

    private String password;

    private String profile;

    @Setter
    private String bio;

    @OneToMany
    @JoinColumn(name = "user_idx")
    private List<Tray> trayAlbum = new ArrayList<Tray>();

    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;

    @Builder
    public User(String email, String nickname, String password, AuthProvider provider, String providerId) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.provider = provider;
        this.providerId = providerId;
    }

}
