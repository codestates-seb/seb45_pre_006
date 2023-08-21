package com.example.stackoverflow.config;

import com.example.stackoverflow.security.filter.ExceptionHandlerFilter;
import com.example.stackoverflow.security.filter.JwtAuthenticationFilter;
import com.example.stackoverflow.security.filter.JwtVerificationFilter;
import com.example.stackoverflow.security.handler.UserAuthenticationFailureHandler;
import com.example.stackoverflow.security.handler.UserAuthenticationSuccessHandler;
import com.example.stackoverflow.security.jwt.JwtTokenizer;
import com.example.stackoverflow.security.utils.CustomAuthorityUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

@Configuration
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(Customizer.withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/user/post").permitAll()
                        .antMatchers("/h2/**").permitAll()
                        .antMatchers("/mail").permitAll()
                        .antMatchers(HttpMethod.GET, "/user/profile/**").permitAll()
                        .antMatchers("/user/logout").permitAll() // 엔드포인트까지 연결 가능
                        .antMatchers("/questions/**").permitAll()
                        .antMatchers("/answers/**").permitAll()
                        .antMatchers("/answer-comments/**").permitAll()
                        .antMatchers("/question-comments/**").permitAll()
                        .anyRequest().authenticated());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    
    // CORS 정책
    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        // 모든 출처에 대한 스크립트 기반 HTTP 통신 허용
        configuration.setAllowedOrigins(Arrays.asList("*"));
        // HTTP 메서드에 대한 HTTP 통신 허용
        configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PATCH", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // 모든 URL 에 앞에서 구성한 CORS 정책 적용
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity>{
        @Override
        public void configure(HttpSecurity builder) throws Exception{

            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/user/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);
            ExceptionHandlerFilter exceptionHandlerFilter = new ExceptionHandlerFilter();

            builder
                    .addFilter(jwtAuthenticationFilter)
                    // 사용자가 로그인 후 request 에 Jwt 가 포함되어 있을 경우 동작
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class)
                    .addFilterBefore(exceptionHandlerFilter, JwtVerificationFilter.class);
        }
    }
}
