-- Database: postgres

-- DROP DATABASE IF EXISTS postgres;

CREATE DATABASE postgres
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'

-- Table: public.brands

-- DROP TABLE IF EXISTS public.brands;

CREATE TABLE IF NOT EXISTS public.brands
(
    id integer NOT NULL DEFAULT nextval('brands_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT brands_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.brands
    OWNER to postgres;

-- Table: public.categories

-- DROP TABLE IF EXISTS public.categories;

CREATE TABLE IF NOT EXISTS public.categories
(
    id integer NOT NULL DEFAULT nextval('categories_id_seq'::regclass),
    name text COLLATE pg_catalog."default",
    CONSTRAINT categories_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.categories
    OWNER to postgres;

-- Table: public.products

-- DROP TABLE IF EXISTS public.products;

CREATE TABLE IF NOT EXISTS public.products
(
    id bigint NOT NULL DEFAULT nextval('products_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    description character varying(255) COLLATE pg_catalog."default",
    price double precision,
    "categoryId" integer,
    "subcategoryId" integer,
    "brandId" integer,
    CONSTRAINT products_pkey PRIMARY KEY (id),
    CONSTRAINT "products_brandId_fkey" FOREIGN KEY ("brandId")
        REFERENCES public.brands (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId")
        REFERENCES public.categories (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "products_subcategoryId_fkey" FOREIGN KEY ("subcategoryId")
        REFERENCES public.subcategories (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;

-- Table: public.subcategories

-- DROP TABLE IF EXISTS public.subcategories;

CREATE TABLE IF NOT EXISTS public.subcategories
(
    id integer NOT NULL DEFAULT nextval('subcategories_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    "categoryId" integer,
    CONSTRAINT subcategories_pkey PRIMARY KEY (id),
    CONSTRAINT "subcategories_categoryId_fkey" FOREIGN KEY ("categoryId")
        REFERENCES public.categories (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.subcategories
    OWNER to postgres;

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id bigint NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    firstname character varying(255) COLLATE pg_catalog."default",
    lastname character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "isAdmin" boolean NOT NULL DEFAULT false,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;