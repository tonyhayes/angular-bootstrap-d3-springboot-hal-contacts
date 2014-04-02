package com.drillmap.crm.service;

import com.drillmap.crm.domain.entities.Contact;
import com.drillmap.crm.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;

import java.util.Iterator;
import java.util.List;

/**
 * Created by sfrensley on 3/29/14.
 */
@Controller
public class CRMService {

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    private ContactRepository contactRepository;


    public List<Contact> findAllContacts() {
        return contactRepository.findAll();
    }

    public Page<Contact> findAllContacts(Pageable pageable) {
        return contactRepository.findAll(pageable);
    }

    public void setContactRepository(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }
}
