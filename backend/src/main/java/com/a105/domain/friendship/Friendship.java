package com.a105.domain.friendship;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
public class Friendship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "friend_id")
    private Long friendId;
    @Setter
    private int status;

    @Column(name = "is_read")
    private int isRead;

    public Friendship(Long userId, Long friendId, int status){
        this.userId = userId;
        this.friendId = friendId;
        this.status = status;
    }
}
