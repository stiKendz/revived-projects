CREATE TABLE users_table (
	user_id serial primary key,
	name unique varchar(64) not null,
    email varchar(64) unique not null,
	password varchar(128) not null
);

CREATE TABLE roles_table (
	role_id serial primary key,
	role_name varchar(64) not null default 'user',
	user_id int unique,
	foreign key (user_id) references users_table (user_id) on delete cascade on update cascade
);

CREATE TABLE orders_table (
    order_id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    phone VARCHAR(64) NOT NULL,
    email VARCHAR(255)  NOT NULL,
    cargo_name VARCHAR(255) NOT NULL, -- наименование груза
    cargo_weight VARCHAR(255), 
    dimensions VARCHAR(100), -- Например, "Длина x Ширина x Высота"
    required_transport VARCHAR(100),-- требуемый транспорт
	foreign key (user_id) references users_table (user_id) on delete cascade on update cascade
);

CREATE TABLE reviews_table (
    review_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    rating INT NOT NULL,
    comment TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users_table (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT * FROM orders_table;
SELECT * FROM users_table;




