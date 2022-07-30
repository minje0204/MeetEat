package com.a105.domain.userConference;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Table(name = "user_conference")
public class UserConference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "conference_id")
    private int conferenceId;

    private int action;

}
