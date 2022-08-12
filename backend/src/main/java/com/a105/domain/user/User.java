package com.a105.domain.user;

import com.a105.domain.oauth2.AuthProvider;
import com.a105.domain.tray.Tray;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    @Setter
    private String nickname;

    private String password;
    @Setter
    private String profile;

    @Setter
    private String bio;

    @OneToMany
    @JoinColumn(name = "user_id")
    private List<Tray> trayAlbum = new ArrayList<Tray>();

    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    @Builder
    public User(String email, String nickname, String password, AuthProvider provider, String bio) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.provider = provider;
        this.bio = bio;
    }
}
