package com.drillmap.crm.security.legacy.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

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
    String cookieName;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse res = (HttpServletResponse) response;
        Cookie[] cookies = req.getCookies();
        if (cookies != null) {
            boolean found = false;
            for (Cookie ck : cookies) {
                if (cookieName.toLowerCase().equals(ck.getName().toLowerCase())) {
                    found = true;
                }
            }
            if (!found) {
                log.info("No SSO cookie found.");
                req.getSession().invalidate();
            }
        }
        chain.doFilter(request,response);
    }

    @Override
    public void destroy() {

    }
}
