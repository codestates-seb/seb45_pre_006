package com.example.stackoverflow.mail.service;

import com.example.stackoverflow.exeception.BusinessLogicException;
import com.example.stackoverflow.exeception.ExceptionCode;
import com.example.stackoverflow.mail.dto.MailDto;
import com.example.stackoverflow.user.entity.User;
import com.example.stackoverflow.user.repository.UserRepository;
import com.example.stackoverflow.user.service.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Optional;
import java.util.Random;

@Service
public class MailService {
    private final JavaMailSender mailSender;
    private final UserRepository userRepository;
    @Value("${spring.mail.username}")
    private static String FROM_ADDRESS;
    private static final int CODE_LENGTH = 6;

    public MailService(JavaMailSender mailSender, UserRepository userRepository) {
        this.mailSender = mailSender;
        this.userRepository = userRepository;
    }

    public String sendMail(String userEmail){
        // email db 확인
        findVerifiedUser(userEmail);
        // 인증번호 생성
        String randomCode = makeRandomCode();
        // 메일 전송
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(userEmail);
        message.setFrom(FROM_ADDRESS);
        message.setSubject("인증 확인");
        message.setText("인증번호: " + randomCode);

        mailSender.send(message);

        return randomCode;
    }


    public void findVerifiedUser(String userEmail){
        Optional<User> findUser = userRepository.findByEmail(userEmail);

        if(!findUser.isPresent()) throw new BusinessLogicException(ExceptionCode.USER_NOT_FOUND);
    }
    private String makeRandomCode(){
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder randomCode = new StringBuilder();
        Random random = new SecureRandom();

        for(int i = 0;i < CODE_LENGTH;i++){
            int index = random.nextInt(characters.length());
            randomCode.append(characters.charAt(index));
        }

        return randomCode.toString();
    }
}
