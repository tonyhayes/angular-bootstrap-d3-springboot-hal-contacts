package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.Opportunity;
import com.drillmap.crm.domain.entities.OpportunityDetail;
import com.drillmap.crm.domain.entities.SalesPerson;

import com.drillmap.crm.TestConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.transaction.Transactional;
import java.util.List;

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

public class OpportunityDetailRepositoryTest {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    OpportunityRepository opportunityRepository;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    OpportunityDetailRepository opportunityDetailRepository;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    SalesPersonRepository salesPersonRepository;

    @Test
    public void testOpportunityDetailsFind() {
        SalesPerson mySalesPerson = new SalesPerson();
        mySalesPerson.setFirstName("Sheila");
        SalesPerson mySavedSalesPerson = salesPersonRepository.save(mySalesPerson);

        Opportunity myOpportunity = new Opportunity();
        myOpportunity.setDiscussion("myOpportunity");
        Opportunity mySavedOpportunity = opportunityRepository.save(myOpportunity);

        //create a detail
        OpportunityDetail c = new OpportunityDetail();
        c.setAction("Call after christmas");
        c.setSales(mySavedSalesPerson);
        c.setOpportunity(mySavedOpportunity);

        //save a contact
        opportunityDetailRepository.save(c);
        List<OpportunityDetail> opportunityDetails = opportunityDetailRepository.findAll();
        assertThat(opportunityDetails.size(), is(greaterThan(0)));
        assertThat(opportunityDetails.get(0).getId(), is(greaterThan(0L)));
    }

    @Test
    public void testOpportunityRelationship() {
        SalesPerson mySalesPerson = new SalesPerson();
        mySalesPerson.setFirstName("Sheila");
        SalesPerson mySavedSalesPerson = salesPersonRepository.save(mySalesPerson);

        Opportunity myOpportunity = new Opportunity();
        myOpportunity.setDiscussion("myOpportunity");
        Opportunity mySavedOpportunity = opportunityRepository.save(myOpportunity);
        assertThat(mySavedOpportunity.getId(), notNullValue());

        OpportunityDetail c = new OpportunityDetail();
        c.setAction("Call after christmas");
        c.setSales(mySavedSalesPerson);
        c.setOpportunity(mySavedOpportunity);
        OpportunityDetail c1 = opportunityDetailRepository.save(c);

        assertThat(c1.getId(), notNullValue());
        c1 = opportunityDetailRepository.findOne(c1.getId());
        assertThat(c1.getOpportunity(), notNullValue());
        assertThat(c1.getSales(), notNullValue());

    }


}
