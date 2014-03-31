package com.drillmap.crm;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 * Created by sfrensley on 3/29/14.
 */
@Configuration
@ComponentScan("com.drillmap.crm.config")
@EnableAutoConfiguration
@PropertySource("classpath:/application-test.properties")
public class TestConfig {
}
