--
-- PostgreSQL database dump
--

-- Dumped from database version 12.18
-- Dumped by pg_dump version 12.17

-- Started on 2024-03-02 11:29:11 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3140 (class 1262 OID 13524)
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3141 (class 0 OID 0)
-- Dependencies: 3140
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 210 (class 1259 OID 16660)
-- Name: brands; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.brands (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public.brands OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16658)
-- Name: brands_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.brands_id_seq OWNER TO postgres;

--
-- TOC entry 3142 (class 0 OID 0)
-- Dependencies: 209
-- Name: brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;


--
-- TOC entry 206 (class 1259 OID 16636)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16634)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 3143 (class 0 OID 0)
-- Dependencies: 205
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 214 (class 1259 OID 16694)
-- Name: imgs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.imgs (
    id integer NOT NULL,
    name character varying(255),
    "productId" bigint
);


ALTER TABLE public.imgs OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16692)
-- Name: imgs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.imgs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.imgs_id_seq OWNER TO postgres;

--
-- TOC entry 3144 (class 0 OID 0)
-- Dependencies: 213
-- Name: imgs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.imgs_id_seq OWNED BY public.imgs.id;


--
-- TOC entry 220 (class 1259 OID 16728)
-- Name: prod_sizes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prod_sizes (
    id bigint NOT NULL,
    count integer,
    "sizeId" integer,
    "productId" bigint
);


ALTER TABLE public.prod_sizes OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16726)
-- Name: prod_sizes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.prod_sizes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.prod_sizes_id_seq OWNER TO postgres;

--
-- TOC entry 3145 (class 0 OID 0)
-- Dependencies: 219
-- Name: prod_sizes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.prod_sizes_id_seq OWNED BY public.prod_sizes.id;


--
-- TOC entry 202 (class 1259 OID 16460)
-- Name: product_size; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_size (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "sizeId" integer NOT NULL,
    "productId" bigint NOT NULL
);


ALTER TABLE public.product_size OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16668)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id bigint NOT NULL,
    name character varying(255),
    description character varying(255),
    price double precision,
    "categoryId" integer,
    "subcategoryId" integer,
    "brandId" integer
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16666)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 3146 (class 0 OID 0)
-- Dependencies: 211
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 216 (class 1259 OID 16707)
-- Name: sizegroups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sizegroups (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public.sizegroups OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16705)
-- Name: sizegroups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sizegroups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sizegroups_id_seq OWNER TO postgres;

--
-- TOC entry 3147 (class 0 OID 0)
-- Dependencies: 215
-- Name: sizegroups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sizegroups_id_seq OWNED BY public.sizegroups.id;


--
-- TOC entry 218 (class 1259 OID 16715)
-- Name: sizes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sizes (
    id integer NOT NULL,
    name character varying(255),
    "sizegroupId" integer
);


ALTER TABLE public.sizes OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16713)
-- Name: sizes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sizes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sizes_id_seq OWNER TO postgres;

--
-- TOC entry 3148 (class 0 OID 0)
-- Dependencies: 217
-- Name: sizes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sizes_id_seq OWNED BY public.sizes.id;


--
-- TOC entry 208 (class 1259 OID 16647)
-- Name: subcategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subcategories (
    id integer NOT NULL,
    name character varying(255),
    "categoryId" integer
);


ALTER TABLE public.subcategories OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16645)
-- Name: subcategories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subcategories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subcategories_id_seq OWNER TO postgres;

--
-- TOC entry 3149 (class 0 OID 0)
-- Dependencies: 207
-- Name: subcategories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subcategories_id_seq OWNED BY public.subcategories.id;


--
-- TOC entry 204 (class 1259 OID 16622)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "isAdmin" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16620)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3150 (class 0 OID 0)
-- Dependencies: 203
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2952 (class 2604 OID 16663)
-- Name: brands id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);


--
-- TOC entry 2950 (class 2604 OID 16639)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 2954 (class 2604 OID 16697)
-- Name: imgs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imgs ALTER COLUMN id SET DEFAULT nextval('public.imgs_id_seq'::regclass);


--
-- TOC entry 2957 (class 2604 OID 16731)
-- Name: prod_sizes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prod_sizes ALTER COLUMN id SET DEFAULT nextval('public.prod_sizes_id_seq'::regclass);


--
-- TOC entry 2953 (class 2604 OID 16671)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 2955 (class 2604 OID 16710)
-- Name: sizegroups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sizegroups ALTER COLUMN id SET DEFAULT nextval('public.sizegroups_id_seq'::regclass);


--
-- TOC entry 2956 (class 2604 OID 16718)
-- Name: sizes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sizes ALTER COLUMN id SET DEFAULT nextval('public.sizes_id_seq'::regclass);


--
-- TOC entry 2951 (class 2604 OID 16650)
-- Name: subcategories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategories ALTER COLUMN id SET DEFAULT nextval('public.subcategories_id_seq'::regclass);


--
-- TOC entry 2948 (class 2604 OID 16625)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3124 (class 0 OID 16660)
-- Dependencies: 210
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.brands (id, name) VALUES (1, 'Adidas') ON CONFLICT DO NOTHING;
INSERT INTO public.brands (id, name) VALUES (2, 'Alpha Industries') ON CONFLICT DO NOTHING;
INSERT INTO public.brands (id, name) VALUES (3, 'Nike') ON CONFLICT DO NOTHING;


--
-- TOC entry 3120 (class 0 OID 16636)
-- Dependencies: 206
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories (id, name) VALUES (1, 'Одежда') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name) VALUES (2, 'Обувь') ON CONFLICT DO NOTHING;
INSERT INTO public.categories (id, name) VALUES (3, 'Аксессуары') ON CONFLICT DO NOTHING;


--
-- TOC entry 3128 (class 0 OID 16694)
-- Dependencies: 214
-- Data for Name: imgs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.imgs (id, name, "productId") VALUES (1, 'product-5.jpg', 1) ON CONFLICT DO NOTHING;


--
-- TOC entry 3134 (class 0 OID 16728)
-- Dependencies: 220
-- Data for Name: prod_sizes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3116 (class 0 OID 16460)
-- Dependencies: 202
-- Data for Name: product_size; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3126 (class 0 OID 16668)
-- Dependencies: 212
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products (id, name, description, price, "categoryId", "subcategoryId", "brandId") VALUES (1, 'Bomber Alpha Industries', 'Warm jacket', 31.5, 1, 1, 2) ON CONFLICT DO NOTHING;
INSERT INTO public.products (id, name, description, price, "categoryId", "subcategoryId", "brandId") VALUES (2, 'Nike pants', 'Sport pants', 11.5, 1, 3, 3) ON CONFLICT DO NOTHING;
INSERT INTO public.products (id, name, description, price, "categoryId", "subcategoryId", "brandId") VALUES (3, 'Adidas boots', 'Yeezy', 24.7, 2, 4, 1) ON CONFLICT DO NOTHING;
INSERT INTO public.products (id, name, description, price, "categoryId", "subcategoryId", "brandId") VALUES (4, 'Nike bag', 'Bag', 76.5, 3, 5, 3) ON CONFLICT DO NOTHING;


--
-- TOC entry 3130 (class 0 OID 16707)
-- Dependencies: 216
-- Data for Name: sizegroups; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.sizegroups (id, name) VALUES (1, 'cloths') ON CONFLICT DO NOTHING;
INSERT INTO public.sizegroups (id, name) VALUES (2, 'footwear') ON CONFLICT DO NOTHING;


--
-- TOC entry 3132 (class 0 OID 16715)
-- Dependencies: 218
-- Data for Name: sizes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.sizes (id, name, "sizegroupId") VALUES (1, 's', 1) ON CONFLICT DO NOTHING;
INSERT INTO public.sizes (id, name, "sizegroupId") VALUES (2, 'm', 1) ON CONFLICT DO NOTHING;
INSERT INTO public.sizes (id, name, "sizegroupId") VALUES (3, 'l', 1) ON CONFLICT DO NOTHING;
INSERT INTO public.sizes (id, name, "sizegroupId") VALUES (4, 'xs', 1) ON CONFLICT DO NOTHING;
INSERT INTO public.sizes (id, name, "sizegroupId") VALUES (5, '8', 2) ON CONFLICT DO NOTHING;
INSERT INTO public.sizes (id, name, "sizegroupId") VALUES (6, '10.5', 2) ON CONFLICT DO NOTHING;


--
-- TOC entry 3122 (class 0 OID 16647)
-- Dependencies: 208
-- Data for Name: subcategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.subcategories (id, name, "categoryId") VALUES (1, 'Куртки и пальто', 1) ON CONFLICT DO NOTHING;
INSERT INTO public.subcategories (id, name, "categoryId") VALUES (2, 'Свитеры и толстовки', 1) ON CONFLICT DO NOTHING;
INSERT INTO public.subcategories (id, name, "categoryId") VALUES (3, 'Штаны и брюки', 1) ON CONFLICT DO NOTHING;
INSERT INTO public.subcategories (id, name, "categoryId") VALUES (4, 'Кроссовки и кеды', 2) ON CONFLICT DO NOTHING;
INSERT INTO public.subcategories (id, name, "categoryId") VALUES (5, 'Сумки', 3) ON CONFLICT DO NOTHING;


--
-- TOC entry 3118 (class 0 OID 16622)
-- Dependencies: 204
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, firstname, lastname, email, password, "isAdmin") VALUES (1, 'Dan', 'Ivanov', 'bigbeautyboss1@gmail.com', '$2b$08$0cvErw4tldubAt1BnRgQleXA8WGduPS.D57Z2DO54qPZ4SlgNfyBe', true) ON CONFLICT DO NOTHING;


--
-- TOC entry 3151 (class 0 OID 0)
-- Dependencies: 209
-- Name: brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.brands_id_seq', 3, true);


--
-- TOC entry 3152 (class 0 OID 0)
-- Dependencies: 205
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 3, true);


--
-- TOC entry 3153 (class 0 OID 0)
-- Dependencies: 213
-- Name: imgs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.imgs_id_seq', 1, true);


--
-- TOC entry 3154 (class 0 OID 0)
-- Dependencies: 219
-- Name: prod_sizes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.prod_sizes_id_seq', 1, false);


--
-- TOC entry 3155 (class 0 OID 0)
-- Dependencies: 211
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 4, true);


--
-- TOC entry 3156 (class 0 OID 0)
-- Dependencies: 215
-- Name: sizegroups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sizegroups_id_seq', 2, true);


--
-- TOC entry 3157 (class 0 OID 0)
-- Dependencies: 217
-- Name: sizes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sizes_id_seq', 6, true);


--
-- TOC entry 3158 (class 0 OID 0)
-- Dependencies: 207
-- Name: subcategories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subcategories_id_seq', 5, true);


--
-- TOC entry 3159 (class 0 OID 0)
-- Dependencies: 203
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 2969 (class 2606 OID 16665)
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- TOC entry 2965 (class 2606 OID 16644)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 2973 (class 2606 OID 16699)
-- Name: imgs imgs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imgs
    ADD CONSTRAINT imgs_pkey PRIMARY KEY (id);


--
-- TOC entry 2979 (class 2606 OID 16733)
-- Name: prod_sizes prod_sizes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prod_sizes
    ADD CONSTRAINT prod_sizes_pkey PRIMARY KEY (id);


--
-- TOC entry 2981 (class 2606 OID 16735)
-- Name: prod_sizes prod_sizes_sizeId_productId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prod_sizes
    ADD CONSTRAINT "prod_sizes_sizeId_productId_key" UNIQUE ("sizeId", "productId");


--
-- TOC entry 2959 (class 2606 OID 16464)
-- Name: product_size product_size_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_size
    ADD CONSTRAINT product_size_pkey PRIMARY KEY ("sizeId", "productId");


--
-- TOC entry 2971 (class 2606 OID 16676)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 2975 (class 2606 OID 16712)
-- Name: sizegroups sizegroups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sizegroups
    ADD CONSTRAINT sizegroups_pkey PRIMARY KEY (id);


--
-- TOC entry 2977 (class 2606 OID 16720)
-- Name: sizes sizes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sizes
    ADD CONSTRAINT sizes_pkey PRIMARY KEY (id);


--
-- TOC entry 2967 (class 2606 OID 16652)
-- Name: subcategories subcategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT subcategories_pkey PRIMARY KEY (id);


--
-- TOC entry 2961 (class 2606 OID 16633)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2963 (class 2606 OID 16631)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2986 (class 2606 OID 16700)
-- Name: imgs imgs_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imgs
    ADD CONSTRAINT "imgs_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2989 (class 2606 OID 16741)
-- Name: prod_sizes prod_sizes_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prod_sizes
    ADD CONSTRAINT "prod_sizes_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2988 (class 2606 OID 16736)
-- Name: prod_sizes prod_sizes_sizeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prod_sizes
    ADD CONSTRAINT "prod_sizes_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES public.sizes(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2985 (class 2606 OID 16687)
-- Name: products products_brandId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES public.brands(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2983 (class 2606 OID 16677)
-- Name: products products_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2984 (class 2606 OID 16682)
-- Name: products products_subcategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "products_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES public.subcategories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2987 (class 2606 OID 16721)
-- Name: sizes sizes_sizegroupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sizes
    ADD CONSTRAINT "sizes_sizegroupId_fkey" FOREIGN KEY ("sizegroupId") REFERENCES public.sizegroups(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2982 (class 2606 OID 16653)
-- Name: subcategories subcategories_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategories
    ADD CONSTRAINT "subcategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2024-03-02 11:29:11 UTC

--
-- PostgreSQL database dump complete
--

