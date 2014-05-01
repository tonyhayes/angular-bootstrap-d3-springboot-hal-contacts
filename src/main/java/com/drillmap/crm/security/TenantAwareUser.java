package com.drillmap.crm.security;

import java.io.Serializable;

/**
 * Created by sfrensley on 4/27/14.
 */
public interface TenantAwareUser {

    public Serializable getTenantId();
    public void setTenantId(Serializable id);
}
