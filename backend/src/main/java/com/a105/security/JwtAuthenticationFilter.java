package com.a105.security;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final AuthTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {
        System.out.println("filter start");
        final String authorizationHeader = request.getHeader("Authorization");
        System.out.println(authorizationHeader);
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
            String tokenStr = getAccessToken(request);
            System.out.println(tokenStr);
            AuthToken token = tokenProvider.convertAuthToken(tokenStr);

            if(token.validate()){
                Authentication authentication = tokenProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request, response);
        }
        System.out.println("filter end");
    }
    public static String getAccessToken(HttpServletRequest request) {
        String headerValue = request.getHeader("Authorization");

        if (headerValue == null) {
            return null;
        }

        if (headerValue.startsWith("Bearer ")) {
            return headerValue.substring("Bearer ".length());
        }

        return null;
    }
}
