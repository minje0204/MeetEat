package com.a105.security;

import com.a105.api.response.OAuth2Response;
import com.a105.exception.BadRequestException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

@Component
public class AuthTokenProvider {
    private String expiry = "10000000000";
    private final Key key;
    private static final String AUTHORITIES_KEY = "role";
    private static final String SECRET_KEY="MySecretKey1$1$234MySecretKey1$1$234MySecretKey1$1$234MySecretKey1$1$234MySecretKey1$1$234MySecretKey1$1$234MySecretKey1$1$234MySecretKey1$1$234";

    public AuthTokenProvider(){
        this.key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public AuthToken createToken(Long id){
        Date expiryDate = getExpiryDate(expiry);
        return new AuthToken(id, expiryDate, key);
    }

    public AuthToken convertAuthToken(String token) {
        return new AuthToken(token, key);
    }

    public static Date getExpiryDate(String expiry){
        return new Date(System.currentTimeMillis() + Long.parseLong(expiry));
    }

    public Authentication getAuthentication(AuthToken authToken){
        System.out.println("getAuthentication");
        if(authToken.validate()){
            Claims claims = authToken.getTokenClaims();
            Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(new String[]{claims.get(AUTHORITIES_KEY).toString()})
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());

            UserPrincipal principal = new UserPrincipal(Long.parseLong(claims.getSubject()), "", "", authorities);
            return new UsernamePasswordAuthenticationToken(principal, authToken, authorities);
        } else {
            throw new BadRequestException("TOKEN VALID FAILED");
        }
    }


}
