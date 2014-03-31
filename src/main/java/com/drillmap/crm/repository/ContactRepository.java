package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by sfrensley on 3/29/14.
 */
public interface ContactRepository extends JpaRepository<Contact,Long> {

    public List<Contact> findByFirstName(String firstName);
    public List<Contact> findByLastName(String lastName);
}
