PGDMP  
                    |            golf_postgres    16.2    16.2 &               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16620    golf_postgres    DATABASE     �   CREATE DATABASE golf_postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE golf_postgres;
                postgres    false            �            1259    16631 	   favorites    TABLE     �   CREATE TABLE public.favorites (
    favorite_id integer NOT NULL,
    item_id integer,
    title character varying(255),
    subtitle character varying(255),
    price numeric(10,2),
    imageurl character varying(255)
);
    DROP TABLE public.favorites;
       public         heap    postgres    false            �            1259    16630    favorites_favorite_id_seq    SEQUENCE     �   CREATE SEQUENCE public.favorites_favorite_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.favorites_favorite_id_seq;
       public          postgres    false    218                       0    0    favorites_favorite_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.favorites_favorite_id_seq OWNED BY public.favorites.favorite_id;
          public          postgres    false    217            �            1259    16705    order_items    TABLE     R   CREATE TABLE public.order_items (
    order_id integer,
    product_id integer
);
    DROP TABLE public.order_items;
       public         heap    postgres    false            �            1259    16699    orders    TABLE     `   CREATE TABLE public.orders (
    id integer NOT NULL,
    total_price numeric(10,2) NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    16698    orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public          postgres    false    220                       0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public          postgres    false    219            �            1259    16622    products    TABLE     �   CREATE TABLE public.products (
    id integer NOT NULL,
    title character varying(255),
    subtitle character varying(255),
    price numeric(10,2),
    imageurl character varying(255)
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    16621    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    216                       0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    215            �            1259    16719    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    is_admin boolean DEFAULT false NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16718    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    223                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    222            d           2604    16634    favorites favorite_id    DEFAULT     ~   ALTER TABLE ONLY public.favorites ALTER COLUMN favorite_id SET DEFAULT nextval('public.favorites_favorite_id_seq'::regclass);
 D   ALTER TABLE public.favorites ALTER COLUMN favorite_id DROP DEFAULT;
       public          postgres    false    217    218    218            e           2604    16702 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            c           2604    16625    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            f           2604    16722    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223                      0    16631 	   favorites 
   TABLE DATA           [   COPY public.favorites (favorite_id, item_id, title, subtitle, price, imageurl) FROM stdin;
    public          postgres    false    218   C)       
          0    16705    order_items 
   TABLE DATA           ;   COPY public.order_items (order_id, product_id) FROM stdin;
    public          postgres    false    221   �)       	          0    16699    orders 
   TABLE DATA           1   COPY public.orders (id, total_price) FROM stdin;
    public          postgres    false    220    *                 0    16622    products 
   TABLE DATA           H   COPY public.products (id, title, subtitle, price, imageurl) FROM stdin;
    public          postgres    false    216   :*                 0    16719    users 
   TABLE DATA           D   COPY public.users (id, name, email, password, is_admin) FROM stdin;
    public          postgres    false    223   ,                  0    0    favorites_favorite_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.favorites_favorite_id_seq', 19, true);
          public          postgres    false    217                       0    0    orders_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.orders_id_seq', 4, true);
          public          postgres    false    219                       0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 10, true);
          public          postgres    false    215                       0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 11, true);
          public          postgres    false    222            k           2606    16638    favorites favorites_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (favorite_id);
 B   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favorites_pkey;
       public            postgres    false    218            m           2606    16704    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    220            i           2606    16629    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    216            o           2606    16727    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    223            q           2606    16725    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    223            r           2606    16639     favorites favorites_item_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.products(id);
 J   ALTER TABLE ONLY public.favorites DROP CONSTRAINT favorites_item_id_fkey;
       public          postgres    false    216    4713    218            s           2606    16708 %   order_items order_items_order_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);
 O   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_order_id_fkey;
       public          postgres    false    4717    221    220            t           2606    16713 '   order_items order_items_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);
 Q   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_product_id_fkey;
       public          postgres    false    216    221    4713               {   x�M̱�  �����:As��ua�]]09��B�u��M:?�=���5͌ϩⴖ��|Y�x	�u�uЦ���>BMf�Q� �_�ჄMG#�Fpo�Wa�G3�"�f���ݍR��&�      
   "   x�3�4�2�4�2� bm�e������� ;F�      	   *   x�3�4�4г4�2�42�37�2�1L8�M�,͹b���� �4�         �  x���O��0��Χx������.��l�5U�	�Z!<d����u��"����fF��Y�{�*x.S��	<��RC�eq���&ܣQD�d#.��h�9.��bᒃ,5VF�%�WT��H�Q�Fa�I�����3��(>�N*ئ���2\�.�ض��D�q�F� �+����o�<[)�Q5��~��y�F��������}Nw�$��&dw�zLNB�1Ӱd�_�.���Fߝ�`�yQ�y��M�#�$3�4nj�ڱ��z�KT�9ә?�Y�Gv\�/��rY��O����W�\�]lu���&�}!��
����bw�÷|6o�s�*{� ti�O*�:g�����L���Ev���z����f:��~�{��w��-�^H���B��5�X�̛��1A�OR�����8Ƕ̭hNFuUG4�Aw���M_h���j?�b��ާ>�         �   x�e��n�0 Eg��4R��� (�5������C�]__"u�r�t�s\���
��0��Vue���ioL7�'��n0�H�D�d^˘����:����CG{y�|�!�`�Z�O:@�xl9�m�[Sm��,Eя2�!	�3R!a[/g��v�ޣy:>��˅�o��<�%e �x��)��$�P���uS/��iyiTUїi=/a����'(٣3ͫ��2�~[�     