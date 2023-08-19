package com.example.stackoverflow.mail.controller;

import com.example.stackoverflow.mail.dto.MailDto;
import com.example.stackoverflow.mail.dto.MailResponseDto;
import com.example.stackoverflow.mail.service.MailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/mail")
public class MailController {
    private final MailService mailService;

    public MailController(MailService mailService) {
        this.mailService = mailService;
    }

    @PostMapping
    public ResponseEntity execMail(@Valid @RequestBody MailDto request){
        String randomCode = mailService.sendMail(request.getEmail());
        MailResponseDto responseDto = new MailResponseDto(randomCode);
        return new ResponseEntity(responseDto, HttpStatus.CREATED);
    }
}
