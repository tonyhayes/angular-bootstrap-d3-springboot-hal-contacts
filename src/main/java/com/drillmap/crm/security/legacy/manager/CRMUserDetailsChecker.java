package com.drillmap.crm.security.legacy.manager;

import com.drillmap.crm.security.legacy.domain.CRMUser;
import com.drillmap.crm.security.legacy.domain.CRMUserCompany;
import com.drillmap.crm.security.legacy.repository.CRMUserCompanyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.dao.DataAccessException;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.SpringSecurityMessageSource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsChecker;
import java.util.Date;
import org.springframework.util.Assert;


/**
 * Created by sfrensley on 8/13/14.
 */
public class CRMUserDetailsChecker implements UserDetailsChecker {
    protected final static Logger logger = LoggerFactory.getLogger(CRMUserDetailsChecker.class);

    protected MessageSourceAccessor messages = SpringSecurityMessageSource.getAccessor();

    private final CRMUserCompanyRepository companyRepository;

    public CRMUserDetailsChecker(CRMUserCompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public void check(UserDetails toCheck) {
        Assert.notNull(toCheck, "User must not be null.");
        if (!toCheck.isAccountNonLocked()) {
            logger.debug("User account is locked");

            throw new LockedException(messages.getMessage("AbstractUserDetailsAuthenticationProvider.locked",
                    "User account is locked"));
        }

        if (!toCheck.isEnabled()) {
            logger.debug("User account is disabled");

            throw new DisabledException(messages.getMessage("AbstractUserDetailsAuthenticationProvider.disabled",
                    "User is disabled"));
        }

        if (!toCheck.isAccountNonExpired()) {
            logger.debug("User account is expired");

            throw new AccountExpiredException(messages.getMessage("AbstractUserDetailsAuthenticationProvider.expired",
                    "User account has expired"));
        }

        if (toCheck instanceof CRMUser) {
            CRMUser user = (CRMUser) toCheck;
            //check company enabled
            Integer owner = user.getOwner();
            Assert.notNull(owner,String.format("Owner must not be null for user %s", user.getUsername()));
            try {
                CRMUserCompany company = companyRepository.findOne(owner);
                Assert.notNull(owner,String.format("Company must not be null for user %s", user.getUsername()));
                if (!company.getEnabled()) {
                    throw new DisabledException(String.format("Cannot find company for user %s. Cannot authenticate.", toCheck.getUsername()));
                }
            } catch (DataAccessException dae) {
                throw new DisabledException(String.format("Cannot find company for user %s. Cannot authenticate.", toCheck.getUsername()),dae);
            }
            //check end date
            if (user.getEnd_date() != null) {
                if (new Date().after(user.getEnd_date())) {
                    throw new CredentialsExpiredException(String.format("User account has expired for %s", user.getUsername()));
                }
            }
            return;
        }
        throw new DisabledException(String.format("User is not instance of DrillMapUser. Cannot authenticate user %s.", toCheck.getUsername()));
    }
}
