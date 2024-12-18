CREATE TABLE users_table (
	user_id serial primary key,
	name varchar(64) not null,
	surname varchar(64) null,
    email varchar(64) not null,
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

CREATE TABLE user_cards (
	card_id serial primary key,
	user_id int not null,
	card_name varchar(128) not null,
	card_description text null,
	foreign key (user_id) references users_table (user_id) on delete cascade on update cascade
);