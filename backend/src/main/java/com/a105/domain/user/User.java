package com.a105.domain.user;

import com.a105.domain.tray.Tray;
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

}
