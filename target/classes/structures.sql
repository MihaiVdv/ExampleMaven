create table PERSON (id_person identity,
                                                first_name varchar not null,
                                                last_name varchar not null,
                                                primary key (id_person));

create table Account (id_account identity,
                                                user_name varchar unique,
                                                password varchar not null,
                                                email varchar,
                                                id_person integer,
                                                primary key (id_account));