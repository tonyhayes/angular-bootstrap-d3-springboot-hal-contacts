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
public class OpportunityFormTest {

    @Test
    public void checkEquality() {
        //different create and update dates should not affect equality.
        Calendar today = Calendar.getInstance();
        Calendar yesterday = Calendar.getInstance();
        yesterday.add(Calendar.DATE,-1);

        OpportunityForm opportunityForms1 = new OpportunityForm();
        opportunityForms1.setName("Location");
        opportunityForms1.setCreatedAt(today);
        opportunityForms1.setId(1L);

        OpportunityForm opportunityForms2 = new OpportunityForm();
        opportunityForms2.setName("Location");
        opportunityForms2.setCreatedAt(yesterday);
        opportunityForms2.setId(1L);

        Set<OpportunityForm> opportunityForms = new HashSet<OpportunityForm>();
        opportunityForms.add(opportunityForms1);

        System.out.println("OpportunityForm = " + opportunityForms1);

        assertThat(opportunityForms1, equalTo(opportunityForms2));
        assertThat(opportunityForms, hasItem(opportunityForms2));

    }


}
