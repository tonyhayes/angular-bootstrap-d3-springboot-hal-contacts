package com.drillmap.crm.domain.entities;

import org.junit.Test;

import java.util.Calendar;
import java.util.HashSet;
import java.util.Set;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;
/**
 * Created by sfrensley on 3/29/14.
 */
public class ContactTest {

    @Test
    public void checkEquality() {
        //different create and update dates should not affect equality.
        Calendar today = Calendar.getInstance();
        Calendar yesterday = Calendar.getInstance();
        yesterday.add(Calendar.DATE,-1);

        Contact person1 = new Contact();
        person1.setFirstName("shane");
        person1.setLastName("frensley");
        person1.setCreatedAt(today);
        person1.setId(1L);

        Contact person2 = new Contact();
        person2.setFirstName("shane");
        person2.setLastName("frensley");
        person2.setCreatedAt(yesterday);
        person2.setId(1L);

        Set<Contact> people = new HashSet<Contact>();
        people.add(person1);

        System.out.println("Contact = " + person1);

        assertThat(person1, equalTo(person2));
        assertThat(people, hasItem(person2));

    }
}
