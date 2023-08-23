package com.example.stackoverflow.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class UserByPagingDto {
    private Long userId;
    private String displayName;
    private String img;
    private LocalDateTime createdAt;
}
