package com.drillmap.crm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.convert.support.ConfigurableConversionService;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;
import org.springframework.hateoas.UriTemplate;
import org.springframework.hateoas.hal.CurieProvider;
import org.springframework.hateoas.hal.DefaultCurieProvider;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

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
    static class ApplicationConfiguration {}


    @Configuration
    @Import({ ApplicationConfiguration.class, CustomRepositoryRestConfiguration.class })
    @ComponentScan(excludeFilters = @Filter({ Service.class, Configuration.class }))
    static class WebConfiguration {
        @Bean
        public CurieProvider curieProvider() {
            return new DefaultCurieProvider("crm", new UriTemplate("http://localhost:9090/rels/{rel}"));
        }
    }

    @Configuration
    static class CustomRepositoryRestConfiguration extends  RepositoryRestMvcConfiguration {
        @Override
        protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
            //custom rest repository stuff here
            super.configureRepositoryRestConfiguration(config);
        }
    }

}