package com.example.stackoverflow.user.controller;

import com.example.stackoverflow.question.entity.Question;
import com.example.stackoverflow.question.mapper.QuestionMapper;
import com.example.stackoverflow.question.service.QuestionService;
import com.example.stackoverflow.user.dto.request.UserLoginPasswordUpdateRequest;
import com.example.stackoverflow.user.dto.request.UserPatchRequest;
import com.example.stackoverflow.user.dto.request.UserPostRequest;
import com.example.stackoverflow.user.dto.response.CustomUserResponse;
import com.example.stackoverflow.user.dto.response.UserResponse;
import com.example.stackoverflow.user.entity.User;
import com.example.stackoverflow.user.mapper.UserMapper;
import com.example.stackoverflow.user.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.CookieGenerator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.util.List;

@RestController
@RequestMapping("/user")
@Validated
@CrossOrigin
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;

    public UserController(UserService userService, UserMapper userMapper, QuestionService questionService, QuestionMapper questionMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
        this.questionService = questionService;
        this.questionMapper = questionMapper;
    }

    // 회원가입 (post)
    // HttpStatus : 200 OK
    @PostMapping("/post")
    public ResponseEntity postUser(@Valid @RequestBody UserPostRequest request){
        User user = userMapper.userPostRequestToUser(request);
        userService.createUser(user);
        return new ResponseEntity(HttpStatus.CREATED);
    }



    // 회원 정보 삭제(탈퇴, delete)
    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteUser(HttpServletResponse response,
                                     @PathVariable("user-id") @Positive long userId){
        // 회원 탈퇴시 클라이언트에 저장되어 있는 쿠키 및 jwt 삭제를 위해 지속시간을 0으로만들어 쿠키 유효를 종료시킨다.
        userService.deleteUser(userId);
        CookieGenerator cg = new CookieGenerator();
        cg.setCookieMaxAge(0);
        cg.setCookieName("AccessToken");
        cg.addCookie(response, "");

        return new ResponseEntity(HttpStatus.OK);
    }

    // 회원 정보 수정(patch), 로그인, UserName 및 AboutMe 수정
    @PatchMapping("/profile/{user-id}")
    public ResponseEntity updateUser(@PathVariable("user-id") @Positive long userId,
                           @Valid @RequestBody UserPatchRequest request){
        request.setUserId(userId);
        // service 에서 들어온 값들 중 변경된 값 확인 후 업데이트
        userService.updateUser(request);

        // 성공 리턴
        return new ResponseEntity(HttpStatus.OK);
    }

    // 비밀번호 변경(patch), 로그인
    @PatchMapping("/password/{user-id}")
    public ResponseEntity updateUserPassword(@PathVariable("user-id") @Positive long userId,
                                   @Valid @RequestBody UserLoginPasswordUpdateRequest request){
        request.setUserId(userId);
        userService.updateUserPassword(request);

        // 성공 리턴
        return new ResponseEntity(HttpStatus.OK);
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity updateUserPasswordStatusLogout(HttpServletResponse response){
        // 로그아웃 시 클라이언트에 저장되어 있는 쿠키 및 jwt 삭제를 위해 지속시간을 0으로만들어 쿠키 유효를 종료시킨다.
        CookieGenerator cg = new CookieGenerator();
        cg.setCookieMaxAge(0);
        cg.setCookieName("AccessToken");
        cg.addCookie(response, "");

        return new ResponseEntity(HttpStatus.OK);
    }

    // 회원 정보 조회(get)
    @GetMapping("/profile/{profile-id}/{user-id}")
    public ResponseEntity getUser(@PathVariable("profile-id") @Positive long profileId, // 방문하고자 하는 회원의 식별자
                                  @PathVariable("user-id") @PositiveOrZero long userId) { // 방문하
        UserResponse userResponse = userMapper.userToUserResponse(userService.findUser(profileId));
        Page<Question> questionsList = questionService.findTopQuestions(profileId);
        userResponse.setPostList(questionMapper.questionListToQuestionTopDto(questionsList.getContent()));

        boolean isAdmin = false;
        // 로그아웃 상태에서 조회
        if(userId != 0) {
            // 로그인 상태에서 자신의 회원 정보 조회
            if(profileId == userId) isAdmin = true;
        }

        return new ResponseEntity<>(new CustomUserResponse(isAdmin, userResponse), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getUsers(@RequestParam(name = "page", defaultValue = "0") @Positive int page,
                                   @RequestParam(name = "size", defaultValue = "10") @Positive int size){
        Page<User> pageUsers = userService.findUsers(page, size);
        List<User> users = pageUsers.getContent();

        return new ResponseEntity(userMapper.usersToUserByPagingDtos(users), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity getUsersByKeyword(@RequestParam(name = "keyword") String keyword,
                                            @PageableDefault(size = 10, direction = Sort.Direction.DESC) Pageable pageable){
        Page<User> pageUsers = userService.findUsersByKeyword(keyword, pageable);
        List<User> users = pageUsers.getContent();

        return new ResponseEntity<>(userMapper.usersToUserByPagingDtos(users), HttpStatus.OK);
    }

    @PostMapping("/login")
    public void login(){
        System.out.println("test");
    }
}
