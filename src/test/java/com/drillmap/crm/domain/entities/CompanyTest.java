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
public class CompanyTest {

    @Test
    public void checkEquality() {
        //different create and update dates should not affect equality.
        Calendar today = Calendar.getInstance();
        Calendar yesterday = Calendar.getInstance();
        yesterday.add(Calendar.DATE,-1);

        Company company1 = new Company();
        company1.setCompanyName("drilling services inc");
        company1.setCreatedAt(today);
        company1.setId(1L);

        Company company2 = new Company();
        company2.setCompanyName("drilling services inc");
        company2.setCreatedAt(yesterday);
        company2.setId(1L);

        Set<Company> companies = new HashSet<Company>();
        companies.add(company1);

        System.out.println("company = " + company1);

        assertThat(company1, equalTo(company2));
        assertThat(companies, hasItem(company2));

    }


}
