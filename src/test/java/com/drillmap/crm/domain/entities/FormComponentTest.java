package com.drillmap.crm.domain.entities;

import org.junit.Test;

import java.util.Calendar;
import java.util.HashSet;
import java.util.Set;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasItem;
import static org.junit.Assert.assertThat;

/**
 * Created by anthonyhayes on 4/3/14.
 */
public class FormComponentTest {

    @Test
    public void checkEquality() {
        //different create and update dates should not affect equality.
        Calendar today = Calendar.getInstance();
        Calendar yesterday = Calendar.getInstance();
        yesterday.add(Calendar.DATE,-1);

        FormComponent formComponent1 = new FormComponent();
        formComponent1.setField_id("Location");
        formComponent1.setCreatedAt(today);
        formComponent1.setId(1L);

        FormComponent formComponent2 = new FormComponent();
        formComponent2.setField_id("Location");
        formComponent2.setCreatedAt(yesterday);
        formComponent2.setId(1L);

        Set<FormComponent> formComponentOptions = new HashSet<FormComponent>();
        formComponentOptions.add(formComponent1);

        System.out.println("FormComponent = " + formComponent1);

        assertThat(formComponent1, equalTo(formComponent2));
        assertThat(formComponentOptions, hasItem(formComponent2));

    }


}
