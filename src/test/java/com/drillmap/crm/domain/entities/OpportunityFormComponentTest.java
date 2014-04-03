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
public class OpportunityFormComponentTest {

    @Test
    public void checkEquality() {
        //different create and update dates should not affect equality.
        Calendar today = Calendar.getInstance();
        Calendar yesterday = Calendar.getInstance();
        yesterday.add(Calendar.DATE,-1);

        OpportunityFormComponent opportunityDetail1 = new OpportunityFormComponent();
        opportunityDetail1.setField_title("Location");
        opportunityDetail1.setCreatedAt(today);
        opportunityDetail1.setId(1L);

        OpportunityFormComponent opportunityDetail2 = new OpportunityFormComponent();
        opportunityDetail2.setField_title("Location");
        opportunityDetail2.setCreatedAt(yesterday);
        opportunityDetail2.setId(1L);

        Set<OpportunityFormComponent> opportunityFormComponents = new HashSet<OpportunityFormComponent>();
        opportunityFormComponents.add(opportunityDetail1);

        System.out.println("OpportunityFormComponent = " + opportunityDetail1);

        assertThat(opportunityDetail1, equalTo(opportunityDetail2));
        assertThat(opportunityFormComponents, hasItem(opportunityDetail2));

    }


}
