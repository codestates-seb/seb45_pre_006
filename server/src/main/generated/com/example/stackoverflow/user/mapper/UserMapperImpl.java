package com.example.stackoverflow.user.mapper;

import com.example.stackoverflow.user.dto.request.UserPostRequest;
import com.example.stackoverflow.user.dto.response.UserResponse;
import com.example.stackoverflow.user.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-08-19T15:12:37+0900",
    comments = "version: 1.5.2.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User userPostRequestToUser(UserPostRequest request) {
        if ( request == null ) {
            return null;
        }

        User user = new User();

        user.setEmail( request.getEmail() );
        user.setPassword( request.getPassword() );
        user.setDisplayName( request.getDisplayName() );

        return user;
    }

    @Override
    public UserResponse userToUserResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponse userResponse = new UserResponse();

        userResponse.setUserId( user.getUserId() );
        userResponse.setEmail( user.getEmail() );
        userResponse.setDisplayName( user.getDisplayName() );
        userResponse.setAboutMe( user.getAboutMe() );
        userResponse.setCreatedAt( user.getCreatedAt() );
        userResponse.setImg( user.getImg() );

        return userResponse;
    }
}
