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
            Map<String, Object> claims = verifyJws(request, response);
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
        String accessToken = findAccessToken(request.getCookies());
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

        // 로그인 상태에서의 요청
        // 여기로 왔다는 뜻은 refreshToken 이 존재하므로 로그인 상태에서의 요청이다.
        // accessToken 이 비었다면 refreshToken 검증을 위해 false
        // accessToken 이 존재한다면 알맞는 형식의 토큰인지 검증해서 잘못되었다면 true, 맞다면 false
        return accessToken == null ? false : !accessToken.startsWith("Bearer");
    }

    private Map<String, Object> verifyJws(HttpServletRequest request, HttpServletResponse response){
        // refreshToken 검증 및 accessToken 재발급
        String authorization = verifyJwsAndDelegateNewToken(request, response);
        String jws = authorization.replace("Bearer", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        // JWT 에서 Claims 파싱이 가능하다는 점에서 서명 검증에 성공
        return jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();
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

    private String verifyJwsAndDelegateNewToken(HttpServletRequest request, HttpServletResponse response){
        // accessToken 및 refreshToken 만료 에러 발생시켜 로그아웃
        String accessToken = findAccessToken(request.getCookies());
        String refreshToken = request.getHeader("RefreshToken");

        // refresh 유효성 검증이 선으로 되어야 한다.
        // 유효성 검증에 실패할 경우 예외 발생
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        Map<String, Object> refreshClaims = null;

        try{
            refreshClaims = jwtTokenizer.getClaims(refreshToken, base64EncodedSecretKey).getBody();
        }catch (SignatureException se) {
            throw new JwtException(ExceptionCode.BAD_TOKEN);
        } catch (ExpiredJwtException ee) {
            throw new JwtException(ExceptionCode.TIME_OUT);
        } catch (Exception e) {
            throw new JwtException(ExceptionCode.BAD_ACCESS);
        }
        // accessToken 만료, refreshToken 은 아직 쿠키가 남아 있으므로 기간이 유효하다.
        // 따라서, accessToken 만 생성해서 리턴
        if(accessToken == null) {
            // refreshToken 유효성 검증에 성공했으므로 accessToken 재발급
            String subject = (String) refreshClaims.get("username");
            Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
            String newAccessToken = "Bearer" + jwtTokenizer.generateToken(refreshClaims, subject, expiration, base64EncodedSecretKey);

            CookieGenerator cg = new CookieGenerator();
            cg.setCookieMaxAge(30);
            cg.setCookieName("AccessToken");
            cg.addCookie(response, newAccessToken);
            return newAccessToken; // 테스트용
        }

        return accessToken;
    }

    private void jwtExceptionHandler(HttpServletResponse response, ExceptionCode exceptionCode){
        response.setStatus(exceptionCode.getStatus());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try{
            String json = new ObjectMapper().writeValueAsString(ErrorResponse.of(HttpStatus.UNAUTHORIZED, exceptionCode.getMessage()));
            response.getWriter().write(json);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
    }
}
