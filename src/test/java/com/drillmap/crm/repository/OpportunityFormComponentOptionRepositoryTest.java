package com.drillmap.crm.repository;

import com.drillmap.crm.TestConfig;
import com.drillmap.crm.domain.entities.OpportunityFormComponent;
import com.drillmap.crm.domain.entities.OpportunityFormComponentOption;
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

public class OpportunityFormComponentOptionRepositoryTest {

//    @SuppressWarnings("SpringJavaAutowiringInspection")
//    @Autowired
//    OpportunityFormComponentOptionRepository formComponentOptionRepository;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    OpportunityFormComponentRepository formComponentRepository;

    @Test
    public void testOpportunityFormComponentOptionFind() {
        OpportunityFormComponent myFormComponent = new OpportunityFormComponent();
        myFormComponent.setField_id("myFormComponent");
        OpportunityFormComponent mySavedFormComponent = formComponentRepository.save(myFormComponent);
        //create a formComponentOption
        OpportunityFormComponentOption formComponentOption = new OpportunityFormComponentOption();
        formComponentOption.setOption_title("Option");
        //formComponentOption.setComponent(mySavedFormComponent);

        //save a contact
        //formComponentOptionRepository.save(formComponentOption);
        //List<OpportunityFormComponentOption> formComponentOptions = formComponentOptionRepository.findAll();
        //assertThat(formComponentOptions.size(), is(greaterThan(0)));
        //assertThat(formComponentOptions.get(0).getId(), is(greaterThan(0L)));
    }

    @Test
    public void testOpportunityFormComponentRelationship() {
        OpportunityFormComponent myFormComponent = new OpportunityFormComponent();
        myFormComponent.setField_id("myFormComponent");
        OpportunityFormComponent mySavedFormComponent = formComponentRepository.save(myFormComponent);
        assertThat(mySavedFormComponent.getId(), notNullValue());

        OpportunityFormComponentOption formComponentOption = new OpportunityFormComponentOption();
        formComponentOption.setOption_title("Option");
        //formComponentOption.setComponent(mySavedFormComponent);
        //OpportunityFormComponentOption c1 = formComponentOptionRepository.save(formComponentOption);

        //assertThat(c1.getId(), notNullValue());
        //c1 = formComponentOptionRepository.findOne(c1.getId());
        //assertThat(c1.getComponent(), notNullValue());

    }

}
