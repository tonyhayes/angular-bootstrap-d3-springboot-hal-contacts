package com.drillmap.crm.security.legacy.domain;

import com.drillmap.crm.security.TenantAwareUser;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collections;
import java.util.Date;
import java.util.Set;

/**
 * Created by sfrensley on 8/12/14.
 */
@Entity
@Table(name = "app_users")
@Data
public class CRMUser implements TenantAwareUser, UserDetails {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "id")
    private Integer id;
    private Integer owner;
    private String orgId;
    private String email;
    private String compname;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String title;
    private String address1;
    private String address2;
    private String city;
    private String state;
    private String zip;
    private String country;
    private String tel;
    private String phoneMobile;
    private String fax;
    private boolean billable = true;
    private String notes;
    private Date start_date;
    private Date end_date;
    private Date create_date;
    private Date updated_date;
    private boolean accountNonExpired = false;
    private boolean accountNonLocked = false;
    private boolean credentialsNonExpired = false;
    private boolean enabled = false;
    private boolean trial = false;
    private String status = "Unknown";

    @Transient
    private Set<? extends GrantedAuthority> authorities = Collections.emptySet();

    @Override
    public Serializable getTenantId() {
        return owner.longValue();
    }

    @Override
    public void setTenantId(Serializable id) {
        owner = (Integer) id;
    }

}
