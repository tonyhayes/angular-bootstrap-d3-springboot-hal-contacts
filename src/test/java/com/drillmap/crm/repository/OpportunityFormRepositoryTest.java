package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.Opportunity;
import com.drillmap.crm.domain.entities.OpportunityForm;


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

public class OpportunityFormRepositoryTest {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    OpportunityRepository opportunityRepository;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    OpportunityFormRepository opportunityFormRepository;

    @Test
    public void testOpportunityFormFind() {
        Opportunity myOpportunity = new Opportunity();
        myOpportunity.setDiscussion("myOpportunity");
        Opportunity mySavedOpportunity = opportunityRepository.save(myOpportunity);
        //create a contact
        OpportunityForm c = new OpportunityForm();
        c.setName("Austin");
        c.setOpportunity(mySavedOpportunity);

        //save a contact
        opportunityFormRepository.save(c);
        List<OpportunityForm> opportunityForms = opportunityFormRepository.findAll();
        assertThat(opportunityForms.size(), is(greaterThan(0)));
        assertThat(opportunityForms.get(0).getId(), is(greaterThan(0L)));
    }

    @Test
    public void testOpportunityRelationship() {
        Opportunity myOpportunity = new Opportunity();
        myOpportunity.setDiscussion("myOpportunity");
        Opportunity mySavedOpportunity = opportunityRepository.save(myOpportunity);
        assertThat(mySavedOpportunity.getId(), notNullValue());

        OpportunityForm c = new OpportunityForm();
        c.setName("Austin");
        c.setOpportunity(mySavedOpportunity);
        OpportunityForm c1 = opportunityFormRepository.save(c);

        assertThat(c1.getId(), notNullValue());
        c1 = opportunityFormRepository.findOne(c1.getId());
        assertThat(c1.getOpportunity(), notNullValue());

    }


}
