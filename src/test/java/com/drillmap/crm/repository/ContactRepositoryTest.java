package com.drillmap.crm.repository;

import com.drillmap.crm.TestConfig;
import com.drillmap.crm.domain.entities.Contact;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;


/**
 * Created by sfrensley on 3/29/14.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ActiveProfiles("test")
@SpringApplicationConfiguration(classes = TestConfig.class)
public class ContactRepositoryTest {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    ContactRepository contactRepository;

    @Test
    public void testFind() {

        //create a contact
        Contact c = new Contact();
        c.setFirstName("Shane");
        c.setLastName("Frensley");

        //save a contact
        contactRepository.save(c);
        List<Contact> contacts = contactRepository.findAll();
        assertThat(contacts.size(), is(greaterThan(0)));
        assertThat(contacts.get(0).getId(), is(greaterThan(0L)));
    }

}
