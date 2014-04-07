package com.drillmap.crm.repository;

import com.drillmap.crm.domain.entities.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by sfrensley on 3/29/14.
 */
public interface ContactRepository extends JpaRepository<Contact,Long> {

    public List<Contact> findByFirstName(@Param(value = "firstName") String firstName);
    public List<Contact> findByLastName(@Param(value = "lastName") String lastName);
}
