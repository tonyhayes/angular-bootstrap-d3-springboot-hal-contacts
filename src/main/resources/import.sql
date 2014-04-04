-- Companies
insert into app_crm_company (company_name, created_at, updated_at) values ('Frensley Co, Inc.', now(), now());
insert into app_crm_company (company_name, created_at, updated_at) values ('Hayes Co, Inc.', now(), now());

-- Contacts
insert into app_crm_contacts(first_name, last_name, company_id, created_at, updated_at) values ('Shane', 'Frensley', 1, now(), now());
insert into app_crm_contacts(first_name, last_name, company_id, created_at, updated_at) values ('Tony', 'Hayes', 2, now(), now());