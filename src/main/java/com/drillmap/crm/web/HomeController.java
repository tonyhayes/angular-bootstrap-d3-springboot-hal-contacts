package com.drillmap.crm.web;

import com.drillmap.crm.security.legacy.domain.CRMUser;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by sfrensley on 3/27/14.
 */
@Controller
public class HomeController {

    @ModelAttribute(value="crmuser")
    protected CRMUser getUserDetails() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            // no authentication available, must not be logged in
            return null;
        }
        Object principal = auth.getPrincipal();
        if (principal instanceof CRMUser) {
            return ((CRMUser) principal);
        } else {
            return null;
        }
    }

    @RequestMapping(value = {"/index.html"}, method = RequestMethod.GET)
    public String index() {
        return "index";
    }
}
