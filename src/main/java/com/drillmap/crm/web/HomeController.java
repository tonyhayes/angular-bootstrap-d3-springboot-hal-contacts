package com.drillmap.crm.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by sfrensley on 3/27/14.
 */
@Controller
public class HomeController {

    @RequestMapping(value = {"/index.html"}, method = RequestMethod.GET)
    public String index() {
        return "index";
    }
}
