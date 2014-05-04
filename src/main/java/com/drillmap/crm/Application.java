package com.drillmap.crm;

import com.drillmap.crm.repository.support.CustomRepositoryInvokerFactory;
import com.drillmap.crm.security.TenantAwareUser;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.invoke.RepositoryInvokerFactory;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.hateoas.UriTemplate;
import org.springframework.hateoas.hal.CurieProvider;
import org.springframework.hateoas.hal.DefaultCurieProvider;
import org.springframework.scheduling.annotation.EnableAsync;
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
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

import java.io.Serializable;
import java.util.Collection;

/**
 * Created by sfrensley on 3/27/14.
 */

public class Application {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(WebConfiguration.class);
        app.setShowBanner(false);
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
    @Import({ ApplicationConfiguration.class, WebSecurityConfiguration.class, CustomRepositoryRestConfiguration.class, WebSocketConfiguration.class})
    @ComponentScan(excludeFilters = @Filter({ Service.class, Configuration.class }))
    static class WebConfiguration {
        @Bean
        public CurieProvider curieProvider() {
            return new DefaultCurieProvider("crm", new UriTemplate("http://localhost:9090/rels/{rel}"));
        }
    }

    /**
     * Repository Configuration
     */
    @Configuration
    static class CustomRepositoryRestConfiguration extends  RepositoryRestMvcConfiguration {


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
    static class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
        @Override
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