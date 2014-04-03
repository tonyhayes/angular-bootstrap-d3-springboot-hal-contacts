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
public class OpportunityTest {

    @Test
    public void checkEquality() {
        //different create and update dates should not affect equality.
        Calendar today = Calendar.getInstance();
        Calendar yesterday = Calendar.getInstance();
        yesterday.add(Calendar.DATE,-1);

        Opportunity opportunity1 = new Opportunity();
        opportunity1.setDiscussion("A New Opportunity");
        opportunity1.setCreatedAt(today);
        opportunity1.setId(1L);

        Opportunity opportunity2 = new Opportunity();
        opportunity2.setDiscussion("A New Opportunity");
        opportunity2.setCreatedAt(yesterday);
        opportunity2.setId(1L);

        Set<Opportunity> opportunities = new HashSet<Opportunity>();
        opportunities.add(opportunity1);

        System.out.println("Opportunity = " + opportunity1);

        assertThat(opportunity1, equalTo(opportunity2));
        assertThat(opportunities, hasItem(opportunity2));

    }


}
