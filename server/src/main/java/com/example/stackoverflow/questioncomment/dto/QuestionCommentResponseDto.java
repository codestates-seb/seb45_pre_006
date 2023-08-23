package com.example.stackoverflow.questioncomment.dto;

import com.example.stackoverflow.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
public class QuestionCommentResponseDto {

    private long questionComment_id;
    private Long userId;
    private String displayName;
    private String questionComment_content;
    private LocalDateTime questionComment_createdAt;
    private LocalDateTime questionComment_modifiedAt;

    public void setUser(User user){
        this.userId = user.getUserId();
        this.displayName = user.getDisplayName();
    }
}
