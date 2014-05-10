package com.drillmap.crm;

import com.drillmap.crm.repository.extensions.invoker.CustomRepositoryInvokerFactory;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.invoke.RepositoryInvokerFactory;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

/**
 * Created by sfrensley on 3/29/14.
 */
@Configuration
@ComponentScan("com.drillmap.crm.config")
@EnableAutoConfiguration
@PropertySource("classpath:/application-test.properties")
public class TestConfig {
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
}
