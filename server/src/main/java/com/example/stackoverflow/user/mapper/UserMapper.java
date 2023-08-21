package com.example.stackoverflow.user.mapper;

import com.example.stackoverflow.user.dto.request.UserPostRequest;
import com.example.stackoverflow.user.dto.response.UserByPagingDto;
import com.example.stackoverflow.user.dto.response.UserResponse;
import com.example.stackoverflow.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    public User userPostRequestToUser(UserPostRequest request);
    public UserResponse userToUserResponse(User user);

    default List<UserByPagingDto> usersToUserByPagingDtos(List<User> users){
        return users.stream()
                .map(user -> new UserByPagingDto(
                        user.getUserId(),
                        user.getDisplayName(),
                        user.getImg()
                )).collect(Collectors.toList());
    }
}
