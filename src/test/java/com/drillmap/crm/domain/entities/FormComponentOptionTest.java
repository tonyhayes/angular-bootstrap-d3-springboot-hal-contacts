package com.drillmap.crm.domain.entities;

import org.junit.Test;

import java.util.*;

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

        FormComponentOption formComponentOption2 = new FormComponentOption();
        formComponentOption2.setOption_title("Austin");

        List<FormComponentOption> formComponentOptions = new ArrayList<FormComponentOption>();
        formComponentOptions.add(formComponentOption1);

        assertThat(formComponentOption1, equalTo(formComponentOption2));
        assertThat(formComponentOptions, hasItem(formComponentOption2));

    }


}
