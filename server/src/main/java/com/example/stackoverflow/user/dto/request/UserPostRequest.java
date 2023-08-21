package com.example.stackoverflow.user.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserPostRequest {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Pattern(regexp = "^(?=.*\\d).{8,15}$") // 8자리 이상, 숫자 한개 포함
    private String password;

    @NotBlank
    @Pattern(regexp = "^(?=.*[\\p{L}\\d]).{2,}$") // 한글, 영어, 숫자 관계없이 2글자 이상
    private String displayName;
}
