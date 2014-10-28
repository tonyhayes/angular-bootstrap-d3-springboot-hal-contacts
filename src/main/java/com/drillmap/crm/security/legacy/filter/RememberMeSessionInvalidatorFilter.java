package com.drillmap.crm.security.legacy.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by sfrensley on 10/24/14.
 */

@Slf4j
@Component
public class RememberMeSessionInvalidatorFilter  implements Filter {


    @Value("${sso.cookie.name}")
    private String cookieName;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        Cookie[] cookies = req.getCookies();
        if (cookies != null)
        {
            boolean found = false;
            for (Cookie ck : cookies)
            {
                if (cookieName.toLowerCase().equals(ck.getName().toLowerCase()))
                {
                    found = true;
                }
            }
            if (found) {
                String tokenValue = extractTokenCookie(req);
                if (StringUtils.hasText(tokenValue))
                {
                    String sessionStamp = getSessionStamp(req);
                    if (sessionStamp == null)
                    {
                        log.info("New session stamp.");
                        putSessionStamp(req,tokenValue);
                    }
                    else
                    {
                        if (!sessionStamp.equals(tokenValue))
                        {
                            log.info("Session mismatch. Invalidate and stamp.");
                            req.getSession().invalidate();
                            putSessionStamp(req,tokenValue);
                        }
                    }
                }
                else
                {
                    log.info("Token has no length. Invalidate session.");
                    req.getSession().invalidate();
                }
            }
            else
            {
                log.info("No SSO cookie found. Invalidate session.");
                req.getSession().invalidate();
            }
        }
        chain.doFilter(request,response);
    }

    private String getSessionStamp(HttpServletRequest req) {
        return (String) req.getSession().getAttribute(cookieName.toLowerCase());
    }

    private void putSessionStamp(HttpServletRequest req, String token) {
        req.getSession().setAttribute(cookieName.toLowerCase(),token);
    }

    private String extractTokenCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        if ((cookies == null) || (cookies.length == 0)) {
            return null;
        }

        for (Cookie cookie : cookies) {
            if (cookieName.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }

        return null;
    }


    @Override
    public void destroy() {

    }
}
