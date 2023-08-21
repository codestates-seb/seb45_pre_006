package com.example.stackoverflow.user.dto.response;

import com.example.stackoverflow.question.dto.QuestionTopDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

// 회원 개인 정보 조회 시 보여줄 화면
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private Long userId;
    private String email;
    private String displayName;
    private String aboutMe;
    private LocalDateTime createdAt;
    // 임시
    private String img = "";
    private List<QuestionTopDto> postList;
    // questionList
}
