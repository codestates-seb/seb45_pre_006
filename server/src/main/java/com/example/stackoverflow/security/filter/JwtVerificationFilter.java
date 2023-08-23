package com.example.stackoverflow.security.filter;

import com.example.stackoverflow.exeception.BusinessLogicException;
import com.example.stackoverflow.exeception.ExceptionCode;
import com.example.stackoverflow.exeception.JwtException;
import com.example.stackoverflow.response.ErrorResponse;
import com.example.stackoverflow.security.jwt.JwtTokenizer;
import com.example.stackoverflow.security.utils.CustomAuthorityUtils;
import com.example.stackoverflow.user.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.CookieGenerator;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// request 당 한 번 실행되는 SecurityFilter
@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
                                    throws ServletException, IOException {
        try {
            System.out.println("필터 실행");
            Map<String, Object> claims = verifyJwsAndDelegateNewToken(request, response);
            setAuthenticationToContext(claims);
            // 해당 예외들은 request 의 애트리뷰트로 추가
        } catch (JwtException e) {
            throw new JwtException(e.getExceptionCode());
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException{
        if(request.getRequestURI().startsWith("/h2")) return true;
        if(request.getRequestURI().startsWith("/user/logout")) return true;
        String accessToken = request.getHeader("AccessToken");
        String refreshToken = request.getHeader("RefreshToken");
        // 로그아웃 상태에서의 요청
        if(accessToken == null && refreshToken == null){
            // 회원가입 신청은 로그아웃 상태에서 정상적인 요청으로 올 수 있는 유일한 POST 방식이다.
            // 그 이외의, 글 등록, 댓글 등록 등 요청들은 토큰이 있어야 가능
            if(request.getMethod().equals("POST") && (request.getRequestURI().startsWith("/user/post"))) return true;
            // GET 이외에 DB 에 직접적인 영향을 주는 요청들은 토큰 없이 실행 불가능 하므로 예외 발생
            if(!request.getMethod().equals("GET")) throw new JwtException(ExceptionCode.BAD_ACCESS);
            // GET 요청은 토큰 없이도 가능하므로 필터 실행 x
            return true;
        }
        return accessToken == null || !accessToken.startsWith("Bearer");
    }


    private void setAuthenticationToContext(Map<String, Object> claims){
        String email = (String) claims.get("email");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List) claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
    private String findAccessToken(Cookie[] cookies){
        // 쿠키가 아예 없을 경우
        if(cookies == null) return null;
        String accessToken = null;
        for(Cookie cookie : cookies){
            if(cookie.getName().equals("AccessToken")) accessToken = cookie.getValue();
        }

        return accessToken;
    }

    private Map<String, Object> verifyJwsAndDelegateNewToken(HttpServletRequest request, HttpServletResponse response){
        // 헤더 값이기 때문에 토큰이 null 불가
        String accessToken = request.getHeader("AccessToken").replace("Bearer", "");
        String refreshToken = request.getHeader("RefreshToken");

        System.out.println("AccessToken : " + accessToken);
        System.out.println("RefreshToken : " + refreshToken);

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = null;

        try{
            claims = jwtTokenizer.getClaims(refreshToken, base64EncodedSecretKey).getBody();
            System.out.println("RefreshToken 검증");
        }catch (SignatureException se) {
            throw new JwtException(ExceptionCode.BAD_TOKEN);
        } catch (ExpiredJwtException ee) {
            throw new JwtException(ExceptionCode.TIME_OUT);
        } catch (Exception e) {
            throw new JwtException(ExceptionCode.BAD_ACCESS);
        }
        // refreshToken 은 문제 없음.
        // accessToken 검증
        try{
            jwtTokenizer.verifySignature(accessToken, base64EncodedSecretKey);
        }catch (SignatureException se) {
            throw new JwtException(ExceptionCode.BAD_TOKEN);
        } catch (ExpiredJwtException ee) {
            // 시간 만료시 재발급 후 헤더 갱신
            regenerateToken(claims, response);
        } catch (Exception e) {
            throw new JwtException(ExceptionCode.BAD_ACCESS);
        }
        return claims;
    }

    private void regenerateToken(Map<String, Object> claims, HttpServletResponse response){
        String subject = (String) claims.get("username");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String newAccessToken = "Bearer" + jwtTokenizer.generateToken(claims, subject, expiration, base64EncodedSecretKey);
        response.setHeader("AccessToken", newAccessToken);
    }
}
