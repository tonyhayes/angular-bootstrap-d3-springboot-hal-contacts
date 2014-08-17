package com.drillmap.crm.security.legacy.manager;

import com.drillmap.crm.security.legacy.repository.CRMUserCompanyRepository;
import com.drillmap.crm.security.legacy.repository.CRMUserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 * Created by sfrensley on 8/12/14.
 */
public class CRMUserDetailsService implements UserDetailsService {

    private final CRMUserRepository userRepository;
    private final CRMUserCompanyRepository userCompanyRepository;

    public CRMUserDetailsService(CRMUserRepository userRepository, CRMUserCompanyRepository userCompanyRepository) {
        this.userRepository = userRepository;
        this.userCompanyRepository = userCompanyRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username);
    }
}
