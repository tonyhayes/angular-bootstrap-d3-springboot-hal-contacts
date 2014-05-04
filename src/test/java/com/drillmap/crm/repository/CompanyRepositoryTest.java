package com.drillmap.crm.repository;

import com.drillmap.crm.Application;
import com.drillmap.crm.TestConfig;
import com.drillmap.crm.domain.entities.Company;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;

/**
 * Created by anthonyhayes on 4/3/14.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ActiveProfiles("test")
@SpringApplicationConfiguration(classes = TestConfig.class)
@Transactional
public class CompanyRepositoryTest {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    CompanyRepository companyRepository;

    @Before
    public void setUp() {
        User user = new Application.TestUser("testuser", "", true, true,
                true, true, AuthorityUtils.createAuthorityList("USER"),1L);
        SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(user,"",user.getAuthorities()));
    }

    public void deleteCascade() {

    }


    @Test
    public void testFindCompany() {
        Company myCompany = new Company();
        myCompany.setCompanyName("myCompany");
        myCompany.setTenantId(1L);
        Company mySavedCompany = companyRepository.save(myCompany);
        //create a contact
        System.out.println(mySavedCompany);

    }





}
