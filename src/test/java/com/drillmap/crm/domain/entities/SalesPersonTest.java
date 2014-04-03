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
public class SalesPersonTest {

    @Test
    public void checkEquality() {
        //different create and update dates should not affect equality.
        Calendar today = Calendar.getInstance();
        Calendar yesterday = Calendar.getInstance();
        yesterday.add(Calendar.DATE,-1);

        SalesPerson salesPerson1 = new SalesPerson();
        salesPerson1.setFirstName("Roberta");
        salesPerson1.setCreatedAt(today);
        salesPerson1.setId(1L);

        SalesPerson salesPerson2 = new SalesPerson();
        salesPerson2.setFirstName("Roberta");
        salesPerson2.setCreatedAt(yesterday);
        salesPerson2.setId(1L);

        Set<SalesPerson> salesPeople = new HashSet<SalesPerson>();
        salesPeople.add(salesPerson1);

        System.out.println("SalesPerson = " + salesPerson1);

        assertThat(salesPerson1, equalTo(salesPerson2));
        assertThat(salesPeople, hasItem(salesPerson2));

    }

}
