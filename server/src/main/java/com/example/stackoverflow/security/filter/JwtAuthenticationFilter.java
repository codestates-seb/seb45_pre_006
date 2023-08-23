package com.example.stackoverflow.security.filter;

import com.example.stackoverflow.dto.LoginDTO;
import com.example.stackoverflow.security.jwt.JwtTokenizer;
import com.example.stackoverflow.user.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonObject;
import lombok.Builder;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.util.CookieGenerator;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

// 클라이언트의 로그인 인증 요청을 처리하는 엔트리 포인트
// 로그인 과정은 controller 도달 필요 없이 filter 과정에서 db 조회를 통해 비교 후 jwt 생성 후 리턴 해주면 된다.
// url : /user/login
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response){
        // 클라이언트에서 전송한 Email, Password 역직렬화
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDTO loginDTO = objectMapper.readValue(request.getInputStream(), LoginDTO.class);
        // 토큰 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword());

        // 매니저에게 인증처리 위임 -> 적절한 provider 탐색 -> userdetails에서 사용자 조회 후 패스워드 비교 -> 값이 같다면
        // -> 아래 successfulAuthentication 실행
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {
        User user = (User) authResult.getPrincipal();

        response = setResponse(user, response);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    // accessToken 생성
    private String delegateAccessToken(User user){
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getEmail());
        claims.put("roles", user.getRoles());

        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodeSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodeSecretKey);

        return accessToken;
    }
    // refreshToken 생성
    private String delegateRefreshToken(User user){
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getEmail());
        claims.put("roles", user.getRoles());

        String subject = user.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());

        String base64EncodeSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String token = jwtTokenizer.generateToken(claims, subject, expiration, base64EncodeSecretKey);

        return token;
    }

    private HttpServletResponse setResponse(User user, HttpServletResponse response) throws IOException {
        String accessToken = delegateAccessToken(user);
        String refreshToken = delegateRefreshToken(user);

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        JsonObject jsonResponse = new JsonObject();
        // 로그인 과정에서 엔드포인트에 도달하는 대신 사용자 정보를 토큰과 더불어 헤더에 추가
        // 사용자의 민감한 정보가 아니기 때문에 헤더에 담는다.
        // header 는 value 가 String 이므로 response 단위로 묶지 못한다.
        jsonResponse.addProperty("userId", String.valueOf(user.getUserId()));
        // ★ 한글 인코딩 문제 발생 ★
        jsonResponse.addProperty("displayName", user.getDisplayName());
        jsonResponse.addProperty("img", user.getImg());

        response.setHeader("AccessToken", "Bearer" + accessToken);
        response.setHeader("RefreshToken", refreshToken);

        response.getWriter().write(jsonResponse.toString());
        return response;
    }
}
