package com.drillmap.crm.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by sfrensley on 4/27/14.
 */
@Controller
public class AuthenticationController {

    @RequestMapping(value = {"/login"})
    public String login() {

        return "login";
    }

}
