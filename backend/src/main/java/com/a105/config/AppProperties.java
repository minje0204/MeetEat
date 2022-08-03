package com.a105.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@ConfigurationProperties(prefix = "app")
public class AppProperties {
    private final Auth auth = new Auth();
    private final OAuth2 oauth2 = new OAuth2();

    public static class Auth {
        private String tokenSecret;
        private long tokenExpirationMsec;

        public String getTokenSecret() {
            return tokenSecret;
        }

        public void setTokenSecret(String tokenSecret) {
            this.tokenSecret = tokenSecret;
        }

        public long getTokenExpirationMsec() {
            return tokenExpirationMsec;
        }

        public void setTokenExpirationMsec(long tokenExpirationMsec) {
            this.tokenExpirationMsec = tokenExpirationMsec;
        }
    }

    public static final class OAuth2 {
        private String defaultRedirectUri;

        private List<String> authorizedRedirectUris = new ArrayList<>();

        public String getDefaultRedirectUri() {
            return defaultRedirectUri;
        }

        public List<String> getAuthorizedRedirectUris() {
            return authorizedRedirectUris;
        }

        public boolean isAuthorizedRedirectUri(String uri){
            URI clientRedirectUri = URI.create(uri);
            return this.authorizedRedirectUris.stream()
                    .anyMatch(authorizedRedirectUri -> {
                        URI authorizedURI = URI.create(authorizedRedirectUri);
                        return authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                                && authorizedURI.getPort() == clientRedirectUri.getPort()
                                && authorizedURI.getScheme().equalsIgnoreCase(clientRedirectUri.getScheme());
                    });
        }
    }

    public Auth getAuth() {
        return auth;
    }

    public OAuth2 getOauth2() {
        return oauth2;
    }
}
