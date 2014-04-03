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
public class ProbabilityTest {

    @Test
    public void checkEquality() {
        //different create and update dates should not affect equality.
        Calendar today = Calendar.getInstance();
        Calendar yesterday = Calendar.getInstance();
        yesterday.add(Calendar.DATE,-1);

        Probability probability1 = new Probability();
        probability1.setName("50%");
        probability1.setCreatedAt(today);
        probability1.setId(1L);

        Probability probability2 = new Probability();
        probability2.setName("50%");
        probability2.setCreatedAt(yesterday);
        probability2.setId(1L);

        Set<Probability> probabilities = new HashSet<Probability>();
        probabilities.add(probability1);

        System.out.println("Probability = " + probability1);

        assertThat(probability1, equalTo(probability2));
        assertThat(probabilities, hasItem(probability2));

    }



}
