package com.drillmap.crm;

import com.drillmap.crm.repository.extensions.invoker.CustomRepositoryInvokerFactory;
import com.drillmap.crm.security.TenantAwareUser;
import com.drillmap.crm.security.legacy.filter.RememberMeValidatingAuthenticationFilter;
import com.drillmap.crm.security.legacy.manager.CRMUserDetailsChecker;
import com.drillmap.crm.security.legacy.manager.CRMUserDetailsService;
import com.drillmap.crm.security.legacy.repository.CRMGrantedAuthorityRepository;
import com.drillmap.crm.security.legacy.repository.CRMUserCompanyRepository;
import com.drillmap.crm.security.legacy.repository.CRMUserRepository;
import com.drillmap.crm.security.legacy.token.JdbcTokenRepositoryImpl;
import com.drillmap.crm.security.legacy.token.PersistentTokenBasedRememberMeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.system.ApplicationPidListener;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.cache.Cache;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.*;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.invoke.RepositoryInvokerFactory;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.hateoas.UriTemplate;
import org.springframework.hateoas.hal.CurieProvider;
import org.springframework.hateoas.hal.DefaultCurieProvider;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.authentication.RememberMeAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.session.InvalidSessionStrategy;
import org.springframework.security.web.session.SimpleRedirectInvalidSessionStrategy;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

import javax.sql.DataSource;
import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.concurrent.TimeUnit;

/**
 * Created by sfrensley on 3/27/14.
 */

public class Application {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(WebConfiguration.class);
        app.setShowBanner(false);
        app.addListeners(new ApplicationPidListener("app.pid"));
        app.run(args);
    }

    @Configuration
    @EnableAsync
    @EnableAutoConfiguration
    @ComponentScan(includeFilters = @Filter(Service.class), useDefaultFilters = false)
    static class ApplicationConfiguration {

    }


    /**
     * Web Configuration
     */
    @Configuration
    @EnableCaching
    @Import({ ApplicationConfiguration.class, WebSecurityConfiguration.class, CustomRepositoryRestConfiguration.class, WebSocketConfiguration.class})
    @ComponentScan(excludeFilters = @Filter({ Service.class, Configuration.class }))
    static class WebConfiguration {
        @Bean
        public CurieProvider curieProvider() {
            return new DefaultCurieProvider("crm", new UriTemplate("http://localhost:9090/rels/{rel}"));
        }

        @Bean
        public SimpleCacheManager simpleCacheManager() {
            Collection<Cache> caches = new HashSet<Cache>(1);
            //token cache
            caches.add(new com.drillmap.crm.cache.Cache("token",5, TimeUnit.MINUTES,500, true));
            SimpleCacheManager manager = new SimpleCacheManager();
            manager.setCaches(caches);
            return manager;
        }
    }

    /**
     * Repository Configuration
     */
    @Configuration
    static class CustomRepositoryRestConfiguration extends RepositoryRestMvcConfiguration {

        @Override
        @Bean
        public RepositoryInvokerFactory repositoryInvokerFactory() {
            return new CustomRepositoryInvokerFactory(repositories(), defaultConversionService());

        }

        @Override
        protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
            //custom rest repository stuff here
            super.configureRepositoryRestConfiguration(config);
        }
    }

    /**
     * WebSocket configuration
     */
    @Configuration
    @EnableWebSocketMessageBroker
    static class WebSocketConfiguration extends AbstractWebSocketMessageBrokerConfigurer {

        @Override
        public void registerStompEndpoints(StompEndpointRegistry registry) {
            registry.addEndpoint("/socket").withSockJS();
        }

        @Override
        public void configureMessageBroker(org.springframework.messaging.simp.config.MessageBrokerRegistry registry) {
            registry.enableSimpleBroker("/queue/", "/topic/");
            registry.setApplicationDestinationPrefixes("/app");
        }
    }

    /**
     * Web security configuration. Allow only webjars and assets unless logged in.
     * Defines what the login/logout urls are.
     */
    @Configuration
    @Profile({"dev","prod","stage"})
    static class  WebSecurityConfiguration extends WebSecurityConfigurerAdapter {


        @Autowired
        CRMUserRepository userRepository;

        @Autowired
        CRMUserCompanyRepository userCompanyRepository;

        @Autowired
        CRMGrantedAuthorityRepository authorityRepository;

        @Autowired
        DataSource dataSource;

        @Value("${sso.cookie.name}")
        public String SSO_COOKIE_NAME;

        @Value("${sso.cookie.domain}")
        public String SSO_COOKIE_DOMAIN;

        @Value("${application.login.url}")
        public String APPLICATION_LOGIN_URL;

        @Bean
        public PersistentTokenRepository persistentTokenRepository() {
            JdbcTokenRepositoryImpl repository = new JdbcTokenRepositoryImpl();
            repository.setDataSource(dataSource);
            return repository;
        }

        @Bean
        public RememberMeServices rememberMeServices() {
            PersistentTokenBasedRememberMeServices service = new PersistentTokenBasedRememberMeServices("DM-SECRET-RMKEY", new CRMUserDetailsService(userRepository,userCompanyRepository,authorityRepository), persistentTokenRepository());
            service.setAlwaysRemember(true);
            service.setCookieName(SSO_COOKIE_NAME);
            service.setCookiePath("/");
            service.setCookieDomain(SSO_COOKIE_DOMAIN);
            service.setUpdateToken(false);
            service.setUserDetailsChecker(new CRMUserDetailsChecker(userCompanyRepository));
            return service;
        }



        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
            auth.authenticationProvider(new RememberMeAuthenticationProvider("DM-SECRET-RMKEY"));
        }

        protected InvalidSessionStrategy invalidSessionStrategy() {
            return new SimpleRedirectInvalidSessionStrategy(APPLICATION_LOGIN_URL);
        }

        protected void configure(HttpSecurity http) throws Exception {

            http
                    .addFilter(new RememberMeValidatingAuthenticationFilter( authenticationManager(),rememberMeServices()).setInvalidSessionStrategy(invalidSessionStrategy()))
                    .csrf().disable()
                    .authorizeRequests()
                    .antMatchers("/app/**").permitAll()
                    .antMatchers("/webjars/**").permitAll()
                    .antMatchers("/**").hasRole("CRM")
                    .anyRequest().authenticated();

        }

    }

    /**
     * Web security configuration. Allow only webjars and assets unless logged in.
     * Defines what the login/logout urls are.
     */
    @Configuration
    @Profile({"test"})
    static class TestWebSecurityConfiguration extends WebSecurityConfigurerAdapter {
        protected void configure(HttpSecurity http) throws Exception {
            http    .httpBasic()
                    .and()
                    .csrf().disable()
                    .authorizeRequests()
                    .antMatchers("/app/**").permitAll()
                    .antMatchers("/webjars/**").permitAll()
                    .anyRequest().authenticated()
                    .and()
                    .logout()
                    .logoutSuccessUrl("/login.html?logout")
                    .logoutUrl("/logout.html")
                    .permitAll()
                    .and()
                    .formLogin()
                    .defaultSuccessUrl("/index.html")
                    .loginPage("/login.html")
                    .failureUrl("/login.html?error")
                    .permitAll();
        }

       /**
         * Configure user details service and password encoder that takes any user and any password.
         * @param auth
         * @throws Exception
         */
        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
            //authenticate everything
            auth.userDetailsService(new UserDetailsService() {

                @Override
                public UserDetails loadUserByUsername(String username)
                        throws UsernameNotFoundException {
                    return new TestUser(username, "", true, true,
                            true, true, AuthorityUtils.createAuthorityList("USER"),1L);
                }
            }).passwordEncoder(new PasswordEncoder() {

                /**
                 * Allows any passwords
                 * @param rawPassword
                 * @param encodedPassword
                 * @return
                 */
                @Override
                public boolean matches(CharSequence rawPassword, String encodedPassword) {
                    return true;
                }

                @Override
                public String encode(CharSequence rawPassword) {
                    return null;
                }
            });
        }
    }

    /**
     * User implementation class for development purposes
     */
    public static class TestUser extends User implements TenantAwareUser {
        Long id;

        public TestUser(String username, String password, Collection<? extends GrantedAuthority> authorities, Long id) {
            super(username, password, authorities);
            this.id = id;
        }

        public TestUser(String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities, Long id) {
            super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
            this.id = id;
        }

        public Long getId() {
            return this.id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        @Override
        public Long getTenantId() {
            return getId();
        }

        @Override
        public void setTenantId(Serializable id) {
            //
        }

    }
}