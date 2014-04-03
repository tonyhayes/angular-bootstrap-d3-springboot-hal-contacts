package com.drillmap.crm.repository;

import com.drillmap.crm.TestConfig;
import com.drillmap.crm.domain.entities.Company;
import com.drillmap.crm.domain.entities.Contact;
import com.drillmap.crm.domain.entities.Opportunity;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.junit.Assert.assertThat;

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
    ContactRepository contactRepository;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    CompanyRepository companyRepository;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    OpportunityRepository opportunityRepository;

    @Test
    public void testFindCompany() {
        Company myCompany = new Company();
        myCompany.setCompanyName("myCompany");
        Company mySavedCompany = companyRepository.save(myCompany);
        //create a contact
        Contact c = new Contact();
        c.setFirstName("Shane");
        c.setLastName("Frensley");
        c.setCompany(mySavedCompany);

        //save a contact
        contactRepository.save(c);

        List<Company> companies = companyRepository.findAll();
        assertThat(companies.size(), is(greaterThan(0)));
        assertThat(companies.get(0).getId(), is(greaterThan(0L)));
    }

    @Test
    public void testContactRelationship() {
        Company myCompany = new Company();
        myCompany.setCompanyName("myCompany");
        Company mySavedCompany = companyRepository.save(myCompany);
        assertThat(mySavedCompany.getId(), notNullValue());

        Contact c = new Contact();
        c.setFirstName("Tony");
        c.setLastName("Hayes");
        c.setCompany(mySavedCompany);
        Contact c1 = contactRepository.save(c);

        Set myContacts = new HashSet();
//        myContacts = myCompany.getContacts();

        myContacts.add(c);
        myCompany.setContacts(myContacts);
        mySavedCompany = companyRepository.save(myCompany);

        assertThat(c1.getId(), notNullValue());
        c1 = contactRepository.findOne(c1.getId());
        assertThat(c1.getCompany(), notNullValue());
        mySavedCompany = companyRepository.findOne(mySavedCompany.getId());
        assertThat(mySavedCompany.getContacts(), notNullValue());

    }

    @Test
    public void testPrimaryContactRelationship() {
        Company myCompany = new Company();
        myCompany.setCompanyName("myCompany");
        Company mySavedCompany = companyRepository.save(myCompany);
        assertThat(mySavedCompany.getId(), notNullValue());

        Contact c = new Contact();
        c.setFirstName("Tony");
        c.setLastName("Hayes");
        c.setCompany(mySavedCompany);
        Contact c1 = contactRepository.save(c);

        Set myContacts = new HashSet();
//        myContacts = myCompany.getContacts();

        myContacts.add(c);
        myCompany.setContacts(myContacts);
        myCompany.setPrimaryContact(c1);
        mySavedCompany = companyRepository.save(myCompany);

        assertThat(c1.getId(), notNullValue());
        c1 = contactRepository.findOne(c1.getId());
        assertThat(c1.getCompany(), notNullValue());
        mySavedCompany = companyRepository.findOne(mySavedCompany.getId());
        assertThat(mySavedCompany.getContacts(), notNullValue());
        assertThat(mySavedCompany.getPrimaryContact(), notNullValue());

    }

    @Test
    public void testOpportunityRelationship() {
        Company myCompany = new Company();
        myCompany.setCompanyName("myCompany");
        Company mySavedCompany = companyRepository.save(myCompany);
        assertThat(mySavedCompany.getId(), notNullValue());

        Opportunity o = new Opportunity();
        o.setDiscussion("Tony");
        o.setCompany(mySavedCompany);
        Opportunity o1 = opportunityRepository.save(o);

        Set myOpportunities = new HashSet();

        myOpportunities.add(o);
        myCompany.setOpportunities(myOpportunities);
        mySavedCompany = companyRepository.save(myCompany);

        assertThat(o1.getId(), notNullValue());
        o1 = opportunityRepository.findOne(o1.getId());
        assertThat(o1.getCompany(), notNullValue());
        mySavedCompany = companyRepository.findOne(mySavedCompany.getId());
        assertThat(mySavedCompany.getOpportunities(), notNullValue());

    }

}
