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
public class OpportunityDetailTest {

    @Test
    public void checkEquality() {
        //different create and update dates should not affect equality.
        Calendar today = Calendar.getInstance();
        Calendar yesterday = Calendar.getInstance();
        yesterday.add(Calendar.DATE,-1);

        OpportunityDetail opportunityDetail1 = new OpportunityDetail();
        opportunityDetail1.setAction("Call after Christmas");
        opportunityDetail1.setCreatedAt(today);
        opportunityDetail1.setId(1L);

        OpportunityDetail opportunityDetail2 = new OpportunityDetail();
        opportunityDetail2.setAction("Call after Christmas");
        opportunityDetail2.setCreatedAt(yesterday);
        opportunityDetail2.setId(1L);

        Set<OpportunityDetail> opportunityDetails = new HashSet<OpportunityDetail>();
        opportunityDetails.add(opportunityDetail1);

        System.out.println("OpportunityDetail = " + opportunityDetail1);

        assertThat(opportunityDetail1, equalTo(opportunityDetail2));
        assertThat(opportunityDetails, hasItem(opportunityDetail2));

    }


}
