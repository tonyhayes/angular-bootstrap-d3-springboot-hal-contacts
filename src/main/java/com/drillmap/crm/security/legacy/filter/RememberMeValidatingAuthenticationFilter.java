package com.drillmap.crm.security.legacy.filter;

import com.drillmap.crm.security.legacy.token.PersistentTokenBasedRememberMeServices;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.rememberme.RememberMeAuthenticationFilter;
import org.springframework.security.web.session.InvalidSessionStrategy;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by sfrensley on 8/12/14.
 */
public class RememberMeValidatingAuthenticationFilter extends
        RememberMeAuthenticationFilter {

    private RememberMeServices rememberMeServices;
    private InvalidSessionStrategy invalidSessionStrategy;

    public RememberMeValidatingAuthenticationFilter(AuthenticationManager authenticationManager,
                                                            RememberMeServices rememberMeServices) {
        super(authenticationManager,rememberMeServices);
        this.rememberMeServices = rememberMeServices;

    }

    public RememberMeValidatingAuthenticationFilter setInvalidSessionStrategy(InvalidSessionStrategy strategy) {
        this.invalidSessionStrategy = strategy;
        return this;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        if (rememberMeServices instanceof PersistentTokenBasedRememberMeServices) {
            PersistentTokenBasedRememberMeServices services = (PersistentTokenBasedRememberMeServices) rememberMeServices;
            //check the token before passing it onto the regular filter
            try {
                services.validateToken(request, response);
            } catch (AuthenticationException ae) {
                if (logger.isDebugEnabled()) {
                    logger.debug("Failed to initially validate token on request.", ae);
                }
                onUnsuccessfulAuthentication(request, response, ae);
                return;
            }

        }
        super.doFilter(req, res, chain);

    }

    @Override
    protected void onUnsuccessfulAuthentication(HttpServletRequest request,
                                                HttpServletResponse response, AuthenticationException failed) {
        super.onUnsuccessfulAuthentication(request, response, failed);
        //remove this threads authentication
        SecurityContextHolder.getContext().setAuthentication(null);
        //respond with 403 for xmlhttp requests so that the client can do more intelligent processing.
        if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
            try {
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Access Denied");
            } catch (IOException e) {
                logger.error("Unable to send Access Denied error.",e);
            }
        } else if (invalidSessionStrategy !=  null) {
            try {
                invalidSessionStrategy.onInvalidSessionDetected(request,response);
            } catch (Exception e) {
               logger.error("Unable to handle invalid session.",e);
            }
        }
    }
}
