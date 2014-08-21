package com.drillmap.crm.security.legacy.manager;

import com.drillmap.crm.security.legacy.domain.CRMGrantedAuthority;
import com.drillmap.crm.security.legacy.domain.CRMUser;
import com.drillmap.crm.security.legacy.repository.CRMGrantedAuthorityRepository;
import com.drillmap.crm.security.legacy.repository.CRMUserCompanyRepository;
import com.drillmap.crm.security.legacy.repository.CRMUserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Set;

/**
 * Created by sfrensley on 8/12/14.
 */
public class CRMUserDetailsService implements UserDetailsService {

    private final CRMUserRepository userRepository;
    private final CRMUserCompanyRepository userCompanyRepository;
    private final CRMGrantedAuthorityRepository authorityRepository;

    public CRMUserDetailsService(CRMUserRepository userRepository,
                                 CRMUserCompanyRepository userCompanyRepository,
                                 CRMGrantedAuthorityRepository authorityRepository) {
        this.userRepository = userRepository;
        this.userCompanyRepository = userCompanyRepository;
        this.authorityRepository = authorityRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        CRMUser user =  userRepository.findByUsername(username);
        Set<CRMGrantedAuthority> authorities = authorityRepository.findAuthoritiesForUser(user.getId());
        user.setAuthorities(authorities);
        return user;
    }
}
