package com.example.stackoverflow.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserByPagingDto {
    private Long userId;
    private String displayName;
    private String img;
    // private int questionCount;
}
