package com.example.stackoverflow.user.dto.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;


// 수정이기 때문에 꼭 값이 담겨 있을 필요는 없다.
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserPatchRequest {
    private Long userId;
    @Pattern(regexp = "^(?=.*[\\p{L}\\d]).{2,}$")
    private String displayName;
    private String aboutMe;

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
