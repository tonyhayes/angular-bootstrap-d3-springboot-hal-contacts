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
public class OpportunityFormComponentOptionTest {

    @Test
    public void checkEquality() {
        //different create and update dates should not affect equality.
        Calendar today = Calendar.getInstance();
        Calendar yesterday = Calendar.getInstance();
        yesterday.add(Calendar.DATE,-1);

        OpportunityFormComponentOption opportunityFormComponentOption1 = new OpportunityFormComponentOption();
        opportunityFormComponentOption1.setOption_title("Austin");

        OpportunityFormComponentOption opportunityFormComponentOption2 = new OpportunityFormComponentOption();
        opportunityFormComponentOption2.setOption_title("Austin");


        Set<OpportunityFormComponentOption> opportunityFormComponentOptions = new HashSet<OpportunityFormComponentOption>();
        opportunityFormComponentOptions.add(opportunityFormComponentOption1);

        System.out.println("OpportunityFormComponentOption = " + opportunityFormComponentOption1);

        assertThat(opportunityFormComponentOption1, equalTo(opportunityFormComponentOption2));
        assertThat(opportunityFormComponentOptions, hasItem(opportunityFormComponentOption2));

    }


}
