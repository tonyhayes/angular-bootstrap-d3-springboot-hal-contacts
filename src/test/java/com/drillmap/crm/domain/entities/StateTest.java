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
public class StateTest {

    @Test
    public void checkEquality() {
        //different create and update dates should not affect equality.
        Calendar today = Calendar.getInstance();
        Calendar yesterday = Calendar.getInstance();
        yesterday.add(Calendar.DATE,-1);

        State state1 = new State();
        state1.setName("Texas");
        state1.setCreatedAt(today);
        state1.setId(1L);

        State state2 = new State();
        state2.setName("Texas");
        state2.setCreatedAt(yesterday);
        state2.setId(1L);

        Set<State> states = new HashSet<State>();
        states.add(state1);

        System.out.println("State = " + state1);

        assertThat(state1, equalTo(state2));
        assertThat(states, hasItem(state2));

    }


}
