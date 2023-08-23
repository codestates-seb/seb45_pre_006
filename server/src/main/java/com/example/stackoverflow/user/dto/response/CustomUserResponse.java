package com.example.stackoverflow.user.dto.response;

import lombok.Getter;

@Getter
public class CustomUserResponse {
    private boolean isAdmin;
    private UserResponse response;

    public CustomUserResponse(boolean isAdmin, UserResponse response) {
        this.isAdmin = isAdmin;
        this.response = response;
    }
}
