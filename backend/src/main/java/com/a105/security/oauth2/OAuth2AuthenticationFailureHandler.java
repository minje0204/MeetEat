package com.a105.security.oauth2;

import com.a105.config.AppProperties;
import com.a105.security.TokenProvider;
import com.a105.util.CookieUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.a105.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

@Component
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    private AppProperties appProperties;
    private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
    private static final String ERROR_PARAM = "?error=";

    @Autowired
    OAuth2AuthenticationFailureHandler(AppProperties appProperties,
                                       HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository) {
        this.appProperties = appProperties;
        this.httpCookieOAuth2AuthorizationRequestRepository = httpCookieOAuth2AuthorizationRequestRepository;
    }

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        String redirectUri = CookieUtils.resolveCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
            .map(Cookie::getValue)
            .orElse(("/"));

        String targetUrl = getAuthorizedTargetUrl(exception, redirectUri);

        httpCookieOAuth2AuthorizationRequestRepository.clearCookies(request, response);

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    private String getAuthorizedTargetUrl(AuthenticationException exception, String redirectUri){
        StringBuilder targetUrl = new StringBuilder();
        if (redirectUri.isBlank() || notAuthorized(redirectUri)) {
            targetUrl.append(appProperties.getOauth2().getDefaultRedirectUri());
        }
        else {
            targetUrl.append(redirectUri);
        }
        targetUrl.append(ERROR_PARAM).append(exception.getLocalizedMessage());

        return targetUrl.toString();
    }


    private boolean notAuthorized(String redirectUrl) {
        return !redirectUrl.isBlank() &&
                !appProperties.getOauth2().isAuthorizedRedirectUri(redirectUrl);
    }

}
