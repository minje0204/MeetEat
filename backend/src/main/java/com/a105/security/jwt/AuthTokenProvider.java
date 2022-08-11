package com.a105.security.jwt;

import com.a105.exception.TokenValidFailedException;
import com.a105.security.UserPrincipal;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

@Component
public class AuthTokenProvider {
    @Value("${jwt.access-token.expiry}")
    private String expiry;
    private final Key key;
    private static final String AUTHORITIES_KEY = "role";

    public AuthTokenProvider( @Value("${jwt.secret-key}") String secretKey ){
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
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
        if(authToken.validate()){
            Claims claims = authToken.getTokenClaims();
            Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(new String[]{claims.get(AUTHORITIES_KEY).toString()})
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());

            UserPrincipal principal = new UserPrincipal(Long.parseLong(claims.getSubject()), "", "", authorities);
            return new UsernamePasswordAuthenticationToken(principal, authToken, authorities);
        } else {
            throw new TokenValidFailedException("Failed to generate Token.");
        }
    }


}
