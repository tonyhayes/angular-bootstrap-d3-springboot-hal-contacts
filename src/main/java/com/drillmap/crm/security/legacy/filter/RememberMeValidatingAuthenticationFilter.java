package com.drillmap.crm.security.legacy.filter;

import com.drillmap.crm.security.legacy.token.PersistentTokenBasedRememberMeServices;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.rememberme.RememberMeAuthenticationFilter;

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

    private AuthenticationManager authenticationManager;
    private RememberMeServices rememberMeServices;

    public RememberMeValidatingAuthenticationFilter(AuthenticationManager authenticationManager,
                                                            RememberMeServices rememberMeServices) {
        super(authenticationManager,rememberMeServices);
        this.authenticationManager = authenticationManager;
        this.rememberMeServices = rememberMeServices;

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
                //rememberMeServices.loginFail(request, response);
                onUnsuccessfulAuthentication(request, response, ae);

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
    }

}
