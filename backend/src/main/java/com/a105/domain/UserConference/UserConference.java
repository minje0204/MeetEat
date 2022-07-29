package com.a105.domain.userConference;

import com.a105.domain.conference.Conference;
import com.a105.domain.user.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "user_conference")
public class UserConference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "conference_id")
    @ManyToOne(targetEntity = Conference.class, fetch = FetchType.LAZY)
    private Conference conference;

    @JoinColumn(name = "user_id")
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    private User user;

    @Setter
    private int action;

    @Builder
    private UserConference(Conference conference, User user) {
        this.conference = conference;
        this.user = user;
    }
}
