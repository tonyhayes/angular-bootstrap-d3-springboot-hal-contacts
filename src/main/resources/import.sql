-- Companies
insert into app_crm_company (company_name, created_at, updated_at) values ('Frensley Co, Inc.', now(), now());
insert into app_crm_company (company_name, created_at, updated_at) values ('Hayes Co, Inc.', now(), now());

-- Contacts
insert into app_crm_contacts(first_name, last_name, company_id, created_at, updated_at) values ('Shane', 'Frensley', 1, now(), now());
insert into app_crm_contacts(first_name, last_name, company_id, created_at, updated_at) values ('Tony', 'Hayes', 2, now(), now());

-- Salesperson
insert into app_crm_sales_people (first_name, last_name, created_at, updated_at) values ('Chad','Gardner', now(), now());
insert into app_crm_sales_people (first_name, last_name, created_at, updated_at) values ('Bob', 'Richards', now(), now());


-- Probabilities
insert into app_crm_probabilities (name, percentage, created_at, updated_at) values ('50%', 50, now(), now());


-- States
insert into app_crm_states (state_Abbr, name, created_at, updated_at) values ('TX', 'Texas', now(), now());


-- opportunity
insert into app_crm_opportunities(company_id, sales_id, contact_id, probability_id, discussion,created_at, updated_at) values (1, 1, 1, 1, 'call back after christmas', now(), now());


-- opportunity form
insert into app_crm_opportunity_form_values (name, value, opportunity_id, created_at, updated_at) values ('location', '15', 1, now(), now());
insert into app_crm_opportunity_form_values (name, value, opportunity_id, created_at, updated_at) values ('revenueSchedule', '1', 1, now(), now());
insert into app_crm_opportunity_form_values (name, value, opportunity_id, created_at, updated_at) values ('status', '1', 1, now(), now());
insert into app_crm_opportunity_form_values (name, value, opportunity_id, created_at, updated_at) values ('dealDate', '2014-03-13', 1, now(), now());
insert into app_crm_opportunity_form_values (name, value, opportunity_id, created_at, updated_at) values ('typeConversation', '1', 1, now(), now());
insert into app_crm_opportunity_form_values (name, value, opportunity_id, created_at, updated_at) values ('region', '15', 1, now(), now());


-- opportunity details
insert into app_crm_opportunity_details(sales_id, follow_update, opportunity_id, action, created_at, updated_at) values (1, now(), 1, 'call back after christmas', now(), now());

-- form component
insert into app_crm_form_component(field_id, field_title, field_type, field_value, field_placeholder, field_required,created_at, updated_at) values ('dealDate','Deal Date','date','','date',false, now(), now());
insert into app_crm_form_component(field_id, field_title, field_type, field_value, field_placeholder, field_required,created_at, updated_at) values ('status','Status','dropdown','nothing selected','',false, now(), now());
insert into app_crm_form_component(field_id, field_title, field_type, field_value, field_placeholder, field_required,created_at, updated_at) values ('location','Location','dropdown','nothing selected','',false, now(), now());
insert into app_crm_form_component(field_id, field_title, field_type, field_value, field_placeholder, field_required,created_at, updated_at) values ('typeConversation','Type of Conversation','dropdown','nothing selected','',false, now(), now());
insert into app_crm_form_component(field_id, field_title, field_type, field_value, field_placeholder, field_required,created_at, updated_at) values ('revenueSchedule','Revenue Schedule','dropdown','nothing selected','',false, now(), now());
insert into app_crm_form_component(field_id, field_title, field_type, field_value, field_placeholder, field_required,created_at, updated_at) values ('region','Region','checklist','','',false, now(), now());

-- form component option
--status
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (1, 'won', 1, 2, now(), now());
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (2, 'loss', 2, 2, now(), now());
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (3, 'pending', 3, 2, now(), now());

--location
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (15, 'London', 15, 3, now(), now());
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (2, 'Houston', 2, 3, now(), now());
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (3, 'Boston', 3, 3, now(), now());

--typeConversation
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (1, 'New Business', 15, 4, now(), now());
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (2, 'Proposal', 2, 4, now(), now());
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (3, 'Continuing Business', 3, 4, now(), now());
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (4, 'Follow-up', 4, 4, now(), now());
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (5, 'Meeting', 5, 4, now(), now());

--revenueSchedule
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (1, 'daily', 1, 5, now(), now());
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (2, 'weekly', 2, 5, now(), now());
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (3, 'monthly', 3, 5, now(), now());
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (4, 'yearly', 4, 5, now(), now());

--region
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (1, 'North East', 1, 6, now(), now());
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (2, 'All', 2, 6, now(), now());
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (3, 'South Texas', 3, 6, now(), now());
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (4, 'Permian', 4, 6, now(), now());
insert into app_crm_form_component_option(option_id, option_title, option_value, component_id, created_at, updated_at) values (5, 'Mid Continent', 5, 6, now(), now());
