CREATE TABLE users_table (
	user_id serial primary key,
	name varchar(64) not null,
	surname varchar(64) null,
    email varchar(64) unique not null,
	password varchar(128) not null,
	about_user text null,
	phone_number varchar(64) null
);

CREATE TABLE roles_table (
	role_id serial primary key,
	role_name varchar(64) not null default 'user',
	user_id int unique,
	foreign key (user_id) references users_table (user_id) on delete cascade on update cascade
);

CREATE TABLE cards_table (
	card_id serial primary key,
	user_id int not null,
	card_name varchar(128) not null,
	card_description text not null,
	card_price varchar(128) not null,
	foreign key (user_id) references users_table (user_id) on delete cascade on update cascade
);

SELECT * FROM cards_table;
SELECT * FROM users_table;