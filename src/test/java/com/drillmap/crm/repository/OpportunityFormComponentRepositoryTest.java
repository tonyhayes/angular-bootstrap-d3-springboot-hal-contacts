package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.OpportunityFormComponent;
import com.drillmap.crm.domain.entities.OpportunityFormComponentOption;

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

public class OpportunityFormComponentRepositoryTest {

//    @SuppressWarnings("SpringJavaAutowiringInspection")
//    @Autowired
//    OpportunityFormComponentOptionRepository opportunityFormComponentOptionRepository;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    OpportunityFormComponentRepository opportunityFormComponentRepository;

    @Test
    public void testOpportunityFindFormComponent() {
        OpportunityFormComponent myFormComponent = new OpportunityFormComponent();
        myFormComponent.setField_id("myFormComponent");
        OpportunityFormComponent mySavedFormComponent = opportunityFormComponentRepository.save(myFormComponent);
        //create a FormComponent option
        OpportunityFormComponentOption formComponentOption = new OpportunityFormComponentOption();
        formComponentOption.setOption_title("Option");
        //formComponentOption.setComponent(mySavedFormComponent);

        //save a contact
        //opportunityFormComponentOptionRepository.save(formComponentOption);

        List<OpportunityFormComponent> formComponents = opportunityFormComponentRepository.findAll();
        assertThat(formComponents.size(), is(greaterThan(0)));
        assertThat(formComponents.get(0).getId(), is(greaterThan(0L)));
    }

    @Test
    public void testOpportunityFormComponentOptionRelationship() {
        OpportunityFormComponent myFormComponent = new OpportunityFormComponent();
        myFormComponent.setField_id("myFormComponent");
        OpportunityFormComponent mySavedFormComponent = opportunityFormComponentRepository.save(myFormComponent);
        assertThat(mySavedFormComponent.getId(), notNullValue());

        OpportunityFormComponentOption formComponentOption = new OpportunityFormComponentOption();
        formComponentOption.setOption_title("Option");
        //formComponentOption.setComponent(mySavedFormComponent);
       // OpportunityFormComponentOption FormComponentOption1 = opportunityFormComponentOptionRepository.save(formComponentOption);

        Set myFormComponentOption = new HashSet();

        //myFormComponentOption.add(FormComponentOption1);
        //myFormComponent.setOptions(myFormComponentOption);
        mySavedFormComponent = opportunityFormComponentRepository.save(myFormComponent);

        //assertThat(FormComponentOption1.getId(), notNullValue());
        //FormComponentOption1 = opportunityFormComponentOptionRepository.findOne(FormComponentOption1.getId());
        //assertThat(FormComponentOption1.getComponent(), notNullValue());
        mySavedFormComponent = opportunityFormComponentRepository.findOne(mySavedFormComponent.getId());
        //assertTh(mySavedFormComponent.getOptions(), notNullValue());

    }


}
