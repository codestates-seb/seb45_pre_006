package com.example.stackoverflow.user.service;

import com.example.stackoverflow.exeception.BusinessLogicException;
import com.example.stackoverflow.exeception.ExceptionCode;
import com.example.stackoverflow.question.entity.Question;
import com.example.stackoverflow.question.repository.QuestionRepository;
import com.example.stackoverflow.question.service.QuestionService;
import com.example.stackoverflow.security.utils.CustomAuthorityUtils;
import com.example.stackoverflow.user.dto.request.UserLoginPasswordUpdateRequest;
import com.example.stackoverflow.user.dto.request.UserPatchRequest;
import com.example.stackoverflow.user.dto.request.UserPostRequest;
import com.example.stackoverflow.user.dto.response.UserPatchResponse;
import com.example.stackoverflow.user.entity.User;
import com.example.stackoverflow.user.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final QuestionRepository questionRepository;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       CustomAuthorityUtils authorityUtils,
                       QuestionRepository questionRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.questionRepository = questionRepository;
    }

    public void createUser(User user){
        // 이메일 중복 확인
        verifiedExistsEmail(user.getEmail());
        List<String> roles = authorityUtils.createRoles(user.getEmail());
        // 패스워드 암호화 후 저장, advanced : setter 이외의 방법 찾아보기
        // 유저 권한 저장
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setImg("");
        // 데이터베이스 저장
        userRepository.save(user);
    }

    public void updateUser(UserPatchRequest request){
        User findUser = findVerifiedUser(request.getUserId());

        Optional.ofNullable(request.getDisplayName())
                .ifPresent(username -> findUser.setDisplayName(username));

        Optional.ofNullable(request.getAboutMe())
                .ifPresent(aboutMe -> findUser.setAboutMe(aboutMe));

        userRepository.save(findUser);
    }

    public void updateUserPassword(UserLoginPasswordUpdateRequest request){
        User findUser = findVerifiedUser(request.getUserId());

        // 사용자의 현재 비밀번호와 DB 에서 조회한 비밀번호 비교(다를 시 예외 처리)
        comparePassword(request.getCurrentPassword(), findUser.getPassword());

        // 비밀번호 업데이트
        findUser.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(findUser);
    }

    public User findUser(Long userId){
        // id 를 통한 유저 탐색
        User user = findVerifiedUser(userId);

        return user;
    }
    public Page<User> findUsers(int page, int size){
        return userRepository.findAll(PageRequest.of(page, size, Sort.by("userId").descending()));
    }

    public Page<User> findUsersByKeyword(String keyword, Pageable pageable){
        return userRepository.findByDisplayNameContaining(keyword, pageable);
    }

    @Transactional
    public void deleteUser(Long userId){
        System.out.println("들어오나?1");
        User user = findVerifiedUser(userId);
        userRepository.delete(user);
        System.out.println("들어오나?2");
    }

    // 이메일로 테이블 조회
    public void verifiedExistsEmail(String email){
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()){
            // 예외처리
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
        }
    }

    public User findVerifiedUser(Long userId){
        Optional<User> optionalUser = userRepository.findById(userId);

        return optionalUser.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));
    }

    private void comparePassword(String requestPassword, String userPassword){
        // passwordEncoder.matches(requestPassword, userPassword);
        // 비밀번호 변경 시 비밀번호가 틀리다면 예외 처리
        // 단순 equals 비교가 아닌 matches 를 통해 비교해야 정확한 비교가 가능
        if(!passwordEncoder.matches(requestPassword, userPassword)){
            throw new BusinessLogicException(ExceptionCode.DIFFERENT_PASSWORD);
        }
    }
}
