package com.a105.util;


import org.springframework.util.SerializationUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Base64;
import java.util.Optional;

public class CookieUtils {
    /**
     * request에 담겨 있는 쿠키를 꺼낸다.
     */
    public static Optional<Cookie> resolveCookie(HttpServletRequest request, String name){
        Cookie[] cookies = request.getCookies();

        if(cookies != null & cookies.length > 0){
            for(Cookie cookie : cookies){
                if(cookie.getName().equals(name)){
                    return Optional.of(cookie);
                }
            }
        }
        return Optional.empty();
    }

    /**
     * response 응답에 쿠키를 적어서 보내준다.
     * key : cookieName
     * value : cookieContents
     */
    public static void setCookie(HttpServletResponse response, String cookieName, String cookieContents, int maxAge){
        Cookie cookie = new Cookie(cookieName, cookieContents);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(maxAge);
        response.addCookie(cookie);
    }

    /**
     * 쿠키의 maxAge를 0으로 설정하여 브라우저가 파기하도록 한다.
     */
    public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name){
        Cookie[] cookies = request.getCookies();
        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie: cookies) {
                if (cookie.getName().equals(name)) {
                    cookie.setValue("");
                    cookie.setPath("/");
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                }
            }
        }
    }

    /**
     * 브라우저 쿠키에 담기 위해 String으로 변환
     */
    public static String serialize(Object object) {
        return Base64.getUrlEncoder()
            .encodeToString(SerializationUtils.serialize(object));
    }

    /**
     * request로부터 resolve한 쿠키
     * String 타입인 cookie value를 cls 타입으로 변환
     */
    public static <T> T deserialize(Cookie cookie, Class<T> cls) {
        return cls.cast(SerializationUtils.deserialize(
            Base64.getUrlDecoder().decode(cookie.getValue())));
    }

}
