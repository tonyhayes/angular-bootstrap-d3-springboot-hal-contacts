package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.Opportunity;
import com.drillmap.crm.domain.entities.SalesPerson;
import com.drillmap.crm.domain.entities.Company;
import com.drillmap.crm.domain.entities.Contact;
import com.drillmap.crm.domain.entities.OpportunityForm;
import com.drillmap.crm.domain.entities.OpportunityDetail;
import com.drillmap.crm.domain.entities.Probability;


import com.drillmap.crm.TestConfig;
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

public class OpportunityRepositoryTest {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    OpportunityRepository opportunityRepository;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    OpportunityDetailRepository opportunityDetailRepository;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    SalesPersonRepository salesPersonRepository;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    CompanyRepository companyRepository;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    ContactRepository contactRepository;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    ProbabilityRepository probabilityRepository;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    OpportunityFormRepository opportunityFormRepository;

    @Test
    public void testOpportunityFind() {

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

        Probability myProbability = new Probability();
        myProbability.setName("50%");
        Probability mySavedProbability = probabilityRepository.save(myProbability);

        SalesPerson mySalesPerson = new SalesPerson();
        mySalesPerson.setFirstName("Sheila");
        SalesPerson mySavedSalesPerson = salesPersonRepository.save(mySalesPerson);

        Opportunity myOpportunity = new Opportunity();
        myOpportunity.setDiscussion("myOpportunity");
        Opportunity mySavedOpportunity = opportunityRepository.save(myOpportunity);

        //create a detail
        OpportunityDetail od = new OpportunityDetail();
        od.setAction("Call after christmas");
        od.setSales(mySavedSalesPerson);
        od.setOpportunity(mySavedOpportunity);
        opportunityDetailRepository.save(od);

        Set myOpportunityDetails = new HashSet();

        myOpportunityDetails.add(od);
        myOpportunity.setOpportunityDetails(myOpportunityDetails);
        mySavedOpportunity = opportunityRepository.save(myOpportunity);

        List<Opportunity> opportunities = opportunityRepository.findAll();
        assertThat(opportunities.size(), is(greaterThan(0)));
        assertThat(opportunities.get(0).getId(), is(greaterThan(0L)));
    }

    @Test
    public void testCompanyRelationship() {
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

        Probability myProbability = new Probability();
        myProbability.setName("50%");
        Probability mySavedProbability = probabilityRepository.save(myProbability);

        SalesPerson mySalesPerson = new SalesPerson();
        mySalesPerson.setFirstName("Sheila");
        SalesPerson mySavedSalesPerson = salesPersonRepository.save(mySalesPerson);

        Opportunity myOpportunity = new Opportunity();
        myOpportunity.setDiscussion("myOpportunity");
        myOpportunity.setSales(mySavedSalesPerson);
        myOpportunity.setProbability(mySavedProbability);
        Opportunity mySavedOpportunity = opportunityRepository.save(myOpportunity);

        //create a detail
        OpportunityDetail od = new OpportunityDetail();
        od.setAction("Call after christmas");
        od.setSales(mySavedSalesPerson);
        od.setOpportunity(mySavedOpportunity);
        opportunityDetailRepository.save(od);

        Set myOpportunityDetails = new HashSet();

        myOpportunityDetails.add(od);
        myOpportunity.setOpportunityDetails(myOpportunityDetails);
        mySavedOpportunity = opportunityRepository.save(myOpportunity);


        assertThat(myOpportunity.getId(), notNullValue());
        myOpportunity = opportunityRepository.findOne(myOpportunity.getId());
        assertThat(myOpportunity.getOpportunityDetails(), notNullValue());
        assertThat(myOpportunity.getSales(), notNullValue());
        assertThat(myOpportunity.getProbability(), notNullValue());

    }


}
