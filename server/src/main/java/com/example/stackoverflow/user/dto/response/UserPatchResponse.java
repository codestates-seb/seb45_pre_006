package com.example.stackoverflow.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserPatchResponse {
    private Long userId;
    private String displayName;
    private String aboutMe;
}
