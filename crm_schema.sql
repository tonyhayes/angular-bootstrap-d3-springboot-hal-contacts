--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: app_crm_company; Type: TABLE; Schema: public; Owner: jhernandez; Tablespace: 
--

CREATE TABLE app_crm_company (
    id bigint NOT NULL,
    tenant_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    address_line1 character varying(255),
    address_line2 character varying(255),
    cell character varying(255),
    city character varying(255),
    company_name character varying(255),
    contact_name character varying(255),
    email character varying(255),
    notes text,
    phone character varying(255),
    state character varying(255),
    web_page character varying(255),
    zip character varying(255),
    primary_contact_id bigint
);


ALTER TABLE public.app_crm_company OWNER TO jhernandez;

--
-- Name: app_crm_company_id_seq; Type: SEQUENCE; Schema: public; Owner: jhernandez
--

CREATE SEQUENCE app_crm_company_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_crm_company_id_seq OWNER TO jhernandez;

--
-- Name: app_crm_company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jhernandez
--

ALTER SEQUENCE app_crm_company_id_seq OWNED BY app_crm_company.id;


--
-- Name: app_crm_contacts; Type: TABLE; Schema: public; Owner: jhernandez; Tablespace: 
--

CREATE TABLE app_crm_contacts (
    id bigint NOT NULL,
    tenant_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    address_line1 character varying(255),
    address_line2 character varying(255),
    cell character varying(255),
    city character varying(255),
    email character varying(255),
    first_name character varying(255),
    last_name character varying(255),
    notes text,
    phone character varying(255),
    state character varying(255),
    title character varying(255),
    web_page character varying(255),
    zip character varying(255),
    company_id bigint NOT NULL
);


ALTER TABLE public.app_crm_contacts OWNER TO jhernandez;

--
-- Name: app_crm_contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: jhernandez
--

CREATE SEQUENCE app_crm_contacts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_crm_contacts_id_seq OWNER TO jhernandez;

--
-- Name: app_crm_contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jhernandez
--

ALTER SEQUENCE app_crm_contacts_id_seq OWNED BY app_crm_contacts.id;


--
-- Name: app_crm_form_component; Type: TABLE; Schema: public; Owner: jhernandez; Tablespace: 
--

CREATE TABLE app_crm_form_component (
    id bigint NOT NULL,
    tenant_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    field_id character varying(255),
    field_placeholder character varying(255),
    field_required character varying(255),
    field_title character varying(255),
    field_type character varying(255),
    field_value character varying(255)
);


ALTER TABLE public.app_crm_form_component OWNER TO jhernandez;

--
-- Name: app_crm_form_component_id_seq; Type: SEQUENCE; Schema: public; Owner: jhernandez
--

CREATE SEQUENCE app_crm_form_component_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_crm_form_component_id_seq OWNER TO jhernandez;

--
-- Name: app_crm_form_component_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jhernandez
--

ALTER SEQUENCE app_crm_form_component_id_seq OWNED BY app_crm_form_component.id;


--
-- Name: app_crm_form_component_option; Type: TABLE; Schema: public; Owner: jhernandez; Tablespace: 
--

CREATE TABLE app_crm_form_component_option (
    component_id bigint NOT NULL,
    option_id character varying(255),
    option_title character varying(255),
    option_value character varying(255)
);


ALTER TABLE public.app_crm_form_component_option OWNER TO jhernandez;

--
-- Name: app_crm_opportunities; Type: TABLE; Schema: public; Owner: jhernandez; Tablespace: 
--

CREATE TABLE app_crm_opportunities (
    id bigint NOT NULL,
    tenant_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    discussion text,
    opportunity_date timestamp without time zone,
    potential_revenue character varying(255),
    company_id bigint,
    contact_id bigint,
    probability_id bigint,
    sales_id bigint,
    status_id bigint
);


ALTER TABLE public.app_crm_opportunities OWNER TO jhernandez;

--
-- Name: app_crm_opportunities_id_seq; Type: SEQUENCE; Schema: public; Owner: jhernandez
--

CREATE SEQUENCE app_crm_opportunities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_crm_opportunities_id_seq OWNER TO jhernandez;

--
-- Name: app_crm_opportunities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jhernandez
--

ALTER SEQUENCE app_crm_opportunities_id_seq OWNED BY app_crm_opportunities.id;


--
-- Name: app_crm_opportunity_details; Type: TABLE; Schema: public; Owner: jhernandez; Tablespace: 
--

CREATE TABLE app_crm_opportunity_details (
    id bigint NOT NULL,
    tenant_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    action character varying(255),
    follow_update timestamp without time zone,
    opportunity_id bigint,
    sales_id bigint
);


ALTER TABLE public.app_crm_opportunity_details OWNER TO jhernandez;

--
-- Name: app_crm_opportunity_details_id_seq; Type: SEQUENCE; Schema: public; Owner: jhernandez
--

CREATE SEQUENCE app_crm_opportunity_details_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_crm_opportunity_details_id_seq OWNER TO jhernandez;

--
-- Name: app_crm_opportunity_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jhernandez
--

ALTER SEQUENCE app_crm_opportunity_details_id_seq OWNED BY app_crm_opportunity_details.id;


--
-- Name: app_crm_opportunity_form_component; Type: TABLE; Schema: public; Owner: jhernandez; Tablespace: 
--

CREATE TABLE app_crm_opportunity_form_component (
    id bigint NOT NULL,
    tenant_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    field_sequence integer,
    field_id character varying(255),
    field_placeholder character varying(255),
    field_required character varying(255),
    field_title character varying(255),
    field_type character varying(255),
    field_value character varying(255)
);


ALTER TABLE public.app_crm_opportunity_form_component OWNER TO jhernandez;

--
-- Name: app_crm_opportunity_form_component_id_seq; Type: SEQUENCE; Schema: public; Owner: jhernandez
--

CREATE SEQUENCE app_crm_opportunity_form_component_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_crm_opportunity_form_component_id_seq OWNER TO jhernandez;

--
-- Name: app_crm_opportunity_form_component_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jhernandez
--

ALTER SEQUENCE app_crm_opportunity_form_component_id_seq OWNED BY app_crm_opportunity_form_component.id;


--
-- Name: app_crm_opportunity_form_component_option; Type: TABLE; Schema: public; Owner: jhernandez; Tablespace: 
--

CREATE TABLE app_crm_opportunity_form_component_option (
    component_id bigint NOT NULL,
    option_id character varying(255),
    option_title character varying(255),
    option_value character varying(255)
);


ALTER TABLE public.app_crm_opportunity_form_component_option OWNER TO jhernandez;

--
-- Name: app_crm_opportunity_form_values; Type: TABLE; Schema: public; Owner: jhernandez; Tablespace: 
--

CREATE TABLE app_crm_opportunity_form_values (
    id bigint NOT NULL,
    tenant_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(255),
    value character varying(255),
    opportunity_id bigint
);


ALTER TABLE public.app_crm_opportunity_form_values OWNER TO jhernandez;

--
-- Name: app_crm_opportunity_form_values_id_seq; Type: SEQUENCE; Schema: public; Owner: jhernandez
--

CREATE SEQUENCE app_crm_opportunity_form_values_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_crm_opportunity_form_values_id_seq OWNER TO jhernandez;

--
-- Name: app_crm_opportunity_form_values_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jhernandez
--

ALTER SEQUENCE app_crm_opportunity_form_values_id_seq OWNED BY app_crm_opportunity_form_values.id;


--
-- Name: app_crm_probabilities; Type: TABLE; Schema: public; Owner: jhernandez; Tablespace: 
--

CREATE TABLE app_crm_probabilities (
    id bigint NOT NULL,
    tenant_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(255),
    percentage integer
);


ALTER TABLE public.app_crm_probabilities OWNER TO jhernandez;

--
-- Name: app_crm_probabilities_id_seq; Type: SEQUENCE; Schema: public; Owner: jhernandez
--

CREATE SEQUENCE app_crm_probabilities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_crm_probabilities_id_seq OWNER TO jhernandez;

--
-- Name: app_crm_probabilities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jhernandez
--

ALTER SEQUENCE app_crm_probabilities_id_seq OWNED BY app_crm_probabilities.id;


--
-- Name: app_crm_sales_people; Type: TABLE; Schema: public; Owner: jhernandez; Tablespace: 
--

CREATE TABLE app_crm_sales_people (
    id bigint NOT NULL,
    tenant_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    address_line1 character varying(255),
    address_line2 character varying(255),
    cell character varying(255),
    city character varying(255),
    email character varying(255),
    first_name character varying(255),
    last_name character varying(255),
    notes character varying(255),
    phone character varying(255),
    state character varying(255),
    title character varying(255),
    web_page character varying(255),
    zip character varying(255)
);


ALTER TABLE public.app_crm_sales_people OWNER TO jhernandez;

--
-- Name: app_crm_sales_people_id_seq; Type: SEQUENCE; Schema: public; Owner: jhernandez
--

CREATE SEQUENCE app_crm_sales_people_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_crm_sales_people_id_seq OWNER TO jhernandez;

--
-- Name: app_crm_sales_people_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jhernandez
--

ALTER SEQUENCE app_crm_sales_people_id_seq OWNED BY app_crm_sales_people.id;


--
-- Name: app_crm_states; Type: TABLE; Schema: public; Owner: jhernandez; Tablespace: 
--

CREATE TABLE app_crm_states (
    id bigint NOT NULL,
    tenant_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying(255),
    state_abbr character varying(255)
);


ALTER TABLE public.app_crm_states OWNER TO jhernandez;

--
-- Name: app_crm_states_id_seq; Type: SEQUENCE; Schema: public; Owner: jhernandez
--

CREATE SEQUENCE app_crm_states_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_crm_states_id_seq OWNER TO jhernandez;

--
-- Name: app_crm_states_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jhernandez
--

ALTER SEQUENCE app_crm_states_id_seq OWNED BY app_crm_states.id;


--
-- Name: app_crm_status; Type: TABLE; Schema: public; Owner: jhernandez; Tablespace: 
--

CREATE TABLE app_crm_status (
    id bigint NOT NULL,
    tenant_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    description character varying(255),
    name character varying(255)
);


ALTER TABLE public.app_crm_status OWNER TO jhernandez;

--
-- Name: app_crm_status_id_seq; Type: SEQUENCE; Schema: public; Owner: jhernandez
--

CREATE SEQUENCE app_crm_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_crm_status_id_seq OWNER TO jhernandez;

--
-- Name: app_crm_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jhernandez
--

ALTER SEQUENCE app_crm_status_id_seq OWNED BY app_crm_status.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_company ALTER COLUMN id SET DEFAULT nextval('app_crm_company_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_contacts ALTER COLUMN id SET DEFAULT nextval('app_crm_contacts_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_form_component ALTER COLUMN id SET DEFAULT nextval('app_crm_form_component_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_opportunities ALTER COLUMN id SET DEFAULT nextval('app_crm_opportunities_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_opportunity_details ALTER COLUMN id SET DEFAULT nextval('app_crm_opportunity_details_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_opportunity_form_component ALTER COLUMN id SET DEFAULT nextval('app_crm_opportunity_form_component_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_opportunity_form_values ALTER COLUMN id SET DEFAULT nextval('app_crm_opportunity_form_values_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_probabilities ALTER COLUMN id SET DEFAULT nextval('app_crm_probabilities_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_sales_people ALTER COLUMN id SET DEFAULT nextval('app_crm_sales_people_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_states ALTER COLUMN id SET DEFAULT nextval('app_crm_states_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_status ALTER COLUMN id SET DEFAULT nextval('app_crm_status_id_seq'::regclass);


--
-- Name: app_crm_company_pkey; Type: CONSTRAINT; Schema: public; Owner: jhernandez; Tablespace: 
--

ALTER TABLE ONLY app_crm_company
    ADD CONSTRAINT app_crm_company_pkey PRIMARY KEY (id);


--
-- Name: app_crm_contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: jhernandez; Tablespace: 
--

ALTER TABLE ONLY app_crm_contacts
    ADD CONSTRAINT app_crm_contacts_pkey PRIMARY KEY (id);


--
-- Name: app_crm_form_component_pkey; Type: CONSTRAINT; Schema: public; Owner: jhernandez; Tablespace: 
--

ALTER TABLE ONLY app_crm_form_component
    ADD CONSTRAINT app_crm_form_component_pkey PRIMARY KEY (id);


--
-- Name: app_crm_opportunities_pkey; Type: CONSTRAINT; Schema: public; Owner: jhernandez; Tablespace: 
--

ALTER TABLE ONLY app_crm_opportunities
    ADD CONSTRAINT app_crm_opportunities_pkey PRIMARY KEY (id);


--
-- Name: app_crm_opportunity_details_pkey; Type: CONSTRAINT; Schema: public; Owner: jhernandez; Tablespace: 
--

ALTER TABLE ONLY app_crm_opportunity_details
    ADD CONSTRAINT app_crm_opportunity_details_pkey PRIMARY KEY (id);


--
-- Name: app_crm_opportunity_form_component_pkey; Type: CONSTRAINT; Schema: public; Owner: jhernandez; Tablespace: 
--

ALTER TABLE ONLY app_crm_opportunity_form_component
    ADD CONSTRAINT app_crm_opportunity_form_component_pkey PRIMARY KEY (id);


--
-- Name: app_crm_opportunity_form_values_pkey; Type: CONSTRAINT; Schema: public; Owner: jhernandez; Tablespace: 
--

ALTER TABLE ONLY app_crm_opportunity_form_values
    ADD CONSTRAINT app_crm_opportunity_form_values_pkey PRIMARY KEY (id);


--
-- Name: app_crm_probabilities_pkey; Type: CONSTRAINT; Schema: public; Owner: jhernandez; Tablespace: 
--

ALTER TABLE ONLY app_crm_probabilities
    ADD CONSTRAINT app_crm_probabilities_pkey PRIMARY KEY (id);


--
-- Name: app_crm_sales_people_pkey; Type: CONSTRAINT; Schema: public; Owner: jhernandez; Tablespace: 
--

ALTER TABLE ONLY app_crm_sales_people
    ADD CONSTRAINT app_crm_sales_people_pkey PRIMARY KEY (id);


--
-- Name: app_crm_states_pkey; Type: CONSTRAINT; Schema: public; Owner: jhernandez; Tablespace: 
--

ALTER TABLE ONLY app_crm_states
    ADD CONSTRAINT app_crm_states_pkey PRIMARY KEY (id);


--
-- Name: app_crm_status_pkey; Type: CONSTRAINT; Schema: public; Owner: jhernandez; Tablespace: 
--

ALTER TABLE ONLY app_crm_status
    ADD CONSTRAINT app_crm_status_pkey PRIMARY KEY (id);


--
-- Name: fk_1w817wirl085du0eu3qgao6li; Type: FK CONSTRAINT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_opportunity_form_values
    ADD CONSTRAINT fk_1w817wirl085du0eu3qgao6li FOREIGN KEY (opportunity_id) REFERENCES app_crm_opportunities(id);


--
-- Name: fk_1w9ig4yedg8njqamnt0811fbb; Type: FK CONSTRAINT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_opportunity_form_component_option
    ADD CONSTRAINT fk_1w9ig4yedg8njqamnt0811fbb FOREIGN KEY (component_id) REFERENCES app_crm_opportunity_form_component(id);


--
-- Name: fk_40jglwmu9856xjdh5byde5ox7; Type: FK CONSTRAINT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_company
    ADD CONSTRAINT fk_40jglwmu9856xjdh5byde5ox7 FOREIGN KEY (primary_contact_id) REFERENCES app_crm_contacts(id);


--
-- Name: fk_582g1vpy9x9ives9iw648gmjk; Type: FK CONSTRAINT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_opportunities
    ADD CONSTRAINT fk_582g1vpy9x9ives9iw648gmjk FOREIGN KEY (status_id) REFERENCES app_crm_status(id);


--
-- Name: fk_73ejwjebg7sn4n5pinowo0ahm; Type: FK CONSTRAINT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_opportunities
    ADD CONSTRAINT fk_73ejwjebg7sn4n5pinowo0ahm FOREIGN KEY (contact_id) REFERENCES app_crm_contacts(id);


--
-- Name: fk_8gjcjukkg84as06vq5unj31ed; Type: FK CONSTRAINT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_opportunities
    ADD CONSTRAINT fk_8gjcjukkg84as06vq5unj31ed FOREIGN KEY (probability_id) REFERENCES app_crm_probabilities(id);


--
-- Name: fk_dlg1u52b27odjp5qx6xn7f56f; Type: FK CONSTRAINT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_opportunities
    ADD CONSTRAINT fk_dlg1u52b27odjp5qx6xn7f56f FOREIGN KEY (company_id) REFERENCES app_crm_company(id);


--
-- Name: fk_lg1529m79a1w7doln5pm8lc8w; Type: FK CONSTRAINT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_form_component_option
    ADD CONSTRAINT fk_lg1529m79a1w7doln5pm8lc8w FOREIGN KEY (component_id) REFERENCES app_crm_form_component(id);


--
-- Name: fk_od5jj3dtxfbu2m5yc02yl7w87; Type: FK CONSTRAINT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_opportunity_details
    ADD CONSTRAINT fk_od5jj3dtxfbu2m5yc02yl7w87 FOREIGN KEY (sales_id) REFERENCES app_crm_sales_people(id);


--
-- Name: fk_oqttv90b6pngn29h5qy95xbvr; Type: FK CONSTRAINT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_opportunity_details
    ADD CONSTRAINT fk_oqttv90b6pngn29h5qy95xbvr FOREIGN KEY (opportunity_id) REFERENCES app_crm_opportunities(id);


--
-- Name: fk_prcbiivkvkvmkgf5g1qk3ek6p; Type: FK CONSTRAINT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_opportunities
    ADD CONSTRAINT fk_prcbiivkvkvmkgf5g1qk3ek6p FOREIGN KEY (sales_id) REFERENCES app_crm_sales_people(id);


--
-- Name: fk_t3t3jw71m3c8yhvig6nb4e6n5; Type: FK CONSTRAINT; Schema: public; Owner: jhernandez
--

ALTER TABLE ONLY app_crm_contacts
    ADD CONSTRAINT fk_t3t3jw71m3c8yhvig6nb4e6n5 FOREIGN KEY (company_id) REFERENCES app_crm_company(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: jhernandez
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM jhernandez;
GRANT ALL ON SCHEMA public TO jhernandez;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

