package com.example.stackoverflow.user.mapper;

import com.example.stackoverflow.user.dto.request.UserPostRequest;
import com.example.stackoverflow.user.dto.response.UserResponse;
import com.example.stackoverflow.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    public User userPostRequestToUser(UserPostRequest request);
    public UserResponse userToUserResponse(User user);
}
