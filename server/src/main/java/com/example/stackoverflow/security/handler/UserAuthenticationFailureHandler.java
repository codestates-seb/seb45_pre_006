package com.example.stackoverflow.security.handler;

import com.example.stackoverflow.exeception.ExceptionCode;
import com.example.stackoverflow.response.ErrorResponse;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class UserAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {
        // 인증 실패 시, 에러 로그를 기록하거나 error response 전송 가능
        log.error("# Authentication failed: {}", exception.getMessage());



        sendErrorResponse(response, exception);
    }

    private void sendErrorResponse(HttpServletResponse response, AuthenticationException exception) throws IOException{
        ErrorResponse errorResponse = null;
        System.out.println(exception.getMessage());
        if(exception.getMessage().equals("User not found")) {
            errorResponse = ErrorResponse.of(ExceptionCode.USER_NOT_FOUND);
            response.setStatus(ExceptionCode.USER_NOT_FOUND.getStatus());
        }
        else {
            errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED);
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        }
        Gson gson = new Gson();
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}
