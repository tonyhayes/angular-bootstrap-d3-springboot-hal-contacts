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
public class FormComponentOptionTest {

    @Test
    public void checkEquality() {
        //different create and update dates should not affect equality.
        Calendar today = Calendar.getInstance();
        Calendar yesterday = Calendar.getInstance();
        yesterday.add(Calendar.DATE,-1);

        FormComponentOption formComponentOption1 = new FormComponentOption();
        formComponentOption1.setOption_title("Austin");
        formComponentOption1.setCreatedAt(today);
        formComponentOption1.setId(1L);

        FormComponentOption formComponentOption2 = new FormComponentOption();
        formComponentOption2.setOption_title("Austin");
        formComponentOption2.setCreatedAt(yesterday);
        formComponentOption2.setId(1L);

        Set<FormComponentOption> formComponentOptions = new HashSet<FormComponentOption>();
        formComponentOptions.add(formComponentOption1);

        System.out.println("FormComponentOption = " + formComponentOption1);

        assertThat(formComponentOption1, equalTo(formComponentOption2));
        assertThat(formComponentOptions, hasItem(formComponentOption2));

    }


}
