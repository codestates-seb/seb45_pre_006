package com.example.stackoverflow.user.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;


@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginPasswordUpdateRequest {
    Long userId;
    @NotBlank
    @Pattern(regexp = "^(?=.*\\d).{8,15}$") // 8자리 이상, 숫자 한개 포함
    String currentPassword;
    @NotBlank
    @Pattern(regexp = "^(?=.*\\d).{8,15}$") // 8자리 이상, 숫자 한개 포함
    String newPassword;

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
