package com.drillmap.crm.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Created by sfrensley on 8/22/14.
 */
@Component
public class ProductVersion {

    private static final Logger logger = LoggerFactory.getLogger(ProductVersion.class);

    public static String getBuildNumber() {
        Package pack = ProductVersion.class.getPackage();
        if (pack == null) {
            logger.error("Product version could not be determine because package is null.");
            return "";
        }
        String ver = ProductVersion.class.getPackage().getImplementationVersion();
        if (ver == null) {
            return "dev";
        }
        return ver;
    }
}
