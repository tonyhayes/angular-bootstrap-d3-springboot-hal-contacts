package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.FormComponent;
import com.drillmap.crm.domain.entities.FormComponentOption;

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

public class FormComponentRepositoryTest {

//    @SuppressWarnings("SpringJavaAutowiringInspection")
//    @Autowired
//    FormComponentOptionRepository formComponentOptionRepository;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    FormComponentRepository formComponentRepository;

    @Test
    public void testFindFormComponent() {
        FormComponent myFormComponent = new FormComponent();
        myFormComponent.setField_id("myFormComponent");
        FormComponent mySavedFormComponent = formComponentRepository.save(myFormComponent);
        //create a FormComponent option
        FormComponentOption formComponentOption = new FormComponentOption();
        formComponentOption.setOption_title("Option");
        //formComponentOption.setComponent(mySavedFormComponent);

        //save a contact
        //formComponentOptionRepository.save(formComponentOption);

        List<FormComponent> formComponents = formComponentRepository.findAll();
        assertThat(formComponents.size(), is(greaterThan(0)));
        assertThat(formComponents.get(0).getId(), is(greaterThan(0L)));
    }

    @Test
    public void testFormComponentOptionRelationship() {
        FormComponent myFormComponent = new FormComponent();
        myFormComponent.setField_id("myFormComponent");
        FormComponent mySavedFormComponent = formComponentRepository.save(myFormComponent);
        assertThat(mySavedFormComponent.getId(), notNullValue());

        FormComponentOption formComponentOption = new FormComponentOption();
        formComponentOption.setOption_title("Option");
        //formComponentOption.setComponent(mySavedFormComponent);
        //FormComponentOption FormComponentOption1 = formComponentOptionRepository.save(formComponentOption);

        Set myFormComponentOption = new HashSet();

//        myFormComponentOption.add(FormComponentOption1);
//        myFormComponent.setOptions(myFormComponentOption);
        mySavedFormComponent = formComponentRepository.save(myFormComponent);

//        assertThat(FormComponentOption1.getId(), notNullValue());
//        FormComponentOption1 = formComponentOptionRepository.findOne(FormComponentOption1.getId());
//        assertThat(FormComponentOption1.getComponent(), notNullValue());
        mySavedFormComponent = formComponentRepository.findOne(mySavedFormComponent.getId());
        //assertThat(mySavedFormComponent.getOptions(), notNullValue());

    }


}
