import express from 'express';
import pg from 'pg';
import { hash, compare } from 'bcrypt';
import { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


config();

const app = express();
const PORT = process.env.PORT || 5000;

const { Pool } = pg;
const SECRET_KEY = 'my_secret_key';

const pool = new Pool({
    user: 'postgres',
    database: 'delecmarried',
    password: '12345',
    host: 'localhost',
    port: 5432
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

pool.connect((err) => {
    if (err) {
        console.error(`Error connecting to database: ${err.stack}`);
        return;
    } 
    console.log('Connected to database');
});

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Позволяет парсить JSON запросы

// Регистрация нового пользователя
app.post('/register', async (req, res) => {
    const { name, surname, password, email, about_user, phone_number } = req.body;

    if ( !name || !email || !password ) {
        return res.status(400).json({message: 'Все поля должны быть заполнены'});
    };

    // Хэшируем пароль с помощью bcrypt
    const hashedPassword = await hash(password, 10);

    try {
        const client = await pool.connect();

        try {
            const exitinguUser = await client.query(
                'SELECT * FROM users_table where email = $1', [email]
            )
            if (exitinguUser.rowCount > 0) {
                return res.status(400).json({message: `Пользователь с таким адресом электронной почты уже зарегистророван: ${email}`})
            }

            const result = await client.query(
                'INSERT INTO users_table ( name, surname, password, email, about_user, phone_number ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id',
                [name, surname, hashedPassword, email, about_user, phone_number]
            );
            const userId = result.rows[0].user_id;
            const userEmail = result.rows[0].email;

            if (email === 'admin@yandex.ru') {
                const role_name = 'admin';
                await client.query(
                    'INSERT INTO roles_table (role_name, user_id) VALUES ($1, $2)',
                    [role_name, userId]
                )
            } else {
                await client.query(
                    'INSERT INTO roles_table (user_id) VALUES ($1)', [userId]
                )
            }

            await client.query(
                'COMMIT'
            );
    
            res.status(201).json({ 
                message: 'Пользователь успешно зарегистрирован',
                userId: userId,
                userEmail: userEmail 
            });

        } catch(err) {
            console.error('Ошибка в регистрации пользователя из-за ошибки в запросе' + err);
            res.status(500).send('Ошибка в регистрации пользователя из-за ошибки в запросе');
        }
    } catch (error) {
        console.error('Ошибка в регистрации пользователя из-за ошибки на сервере или в базе данных' + error);
        res.status(500).send('Ошибка в регистрации пользователя из-за ошибки на сервере или в базе данных');
    }
});

// Вход пользователя
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({message: 'Все поля должны быть заполнены'});
    }

    try {
        const client = await pool.connect();

        try {
            const result = await client.query(
                'SELECT * FROM users_table WHERE email = $1', [email]
            )
            const user = result.rows[0];

            if (!user) {
                return res.status(401).json({message: 'Неверный логин или пароль'})
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(401).json({message: 'Неверный логин или пароль'})
            }

            const roleSearch = await pool.query(
                'SELECT * FROM roles_table WHERE user_id = $1', [user.user_id]
            )
            const role = roleSearch.rows[0] ? roleSearch.rows[0].role_name : 'user';

            const token = jwt.sign({
                userId: user.user_id,
                email: user.email,
                role: role
            }, SECRET_KEY)
            res.json({token, email, role});

        } catch (err) {
            console.error('Ошибка входа в аккаунт пользователя из-за ошибки в запросе' + err);
            res.status(500).send('Ошибка входа в аккаунт пользователя из-за ошибки в запросе');
        }
    } catch (err) {
        console.error('Ошибка входа в аккаунт пользователя из-за ошибки на сервере или в базе данных' + err);
        res.status(500).send('Ошибка входа в аккаунт пользователя из-за ошибки на сервере или в базе данных'); 
    }
});

// вывод информации о пользователе
app.get('/userinfo', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if(!token) {
        return res.status(401).json({message: 'Вы не авторизованы'});
    }

    try {
        const client = await pool.connect();

        try {
            const decodedToken = jwt.verify(token, SECRET_KEY);
            const userId = decodedToken.userId;

            const response = await client.query(
                'SELECT * FROM users_table where user_id = $1', [userId]
            )
            const result = response.rows;

            res.status(201).json({
                message: 'Информация о пользователе',
                userInfo: result
            });
        } catch (err) {
            console.error('Ошибка вывода информации о пользователе из-за ошибки в запросе ' + err);
            res.status(500).send('Ошибка вывода информации о пользователе из-за ошибки в запросе');
        }
    } catch (err) {
        console.error('Ошибка вывода информации о пользователе из-за ошибки на сервере или в базе данных' + err);
        res.status(500).send('Ошибка вывода информации о пользователе из-за ошибки на сервере или в базе данных'); 
    }
});

// обновление инсформации о пользователе
app.put('/updateuser', async (req, res) => {
    const {name, surname, email, about_user, phone_number} = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({message: 'Пользователь не зарегистророван'});
    }

    try {
        const client = await pool.connect();

        try {
            const decodedToken = jwt.verify(token, SECRET_KEY);
            const userId = decodedToken.userId;

            // имя
            const updateUserName = await client.query(
                'UPDATE users_table SET name = $2 WHERE user_id = $1', [userId, name]
            )

            // фамилия
            const updateUserSurname = await client.query(
                'UPDATE users_table SET surname = $2 WHERE user_id = $1', [userId, surname]
            )

            // адрес электронной почты
            const updateUserEmail = await client.query(
                'UPDATE users_table SET email = $2 WHERE user_id = $1', [userId, email]
            )

            // описание пользователя
            const updateAboutUser = await client.query(
                'UPDATE users_table SET about_user = $2 WHERE user_id = $1', [userId, about_user]
            )

            // номер телефона
            const updatePhoneNumber = await client.query(
                'UPDATE users_table SET phone_number = $2 WHERE user_id = $1', [userId, phone_number]
            )

            res.status(200).json({message: 'Обновленные данные сохранены'});

        } catch (err) {
            console.error('Ошибка обновления информации о пользователе из-за ошибки в запросе' + err);
            res.status(500).send('Ошибка обновления информации о пользователе из-за ошибки в запросе');
        }
    } catch (err) {
        console.error('Ошибка обновления информации о пользователе из-за ошибки на сервере или в базе данных' + err);
        res.status(500).send('Ошибка обновления информации о пользователе из-за ошибки на сервере или в базе данных'); 
    }
});

// Добавление новой карточки
app.post('/addcard', async (req, res) => {
    const { card_name, card_description, card_price } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({message: 'Для данного действия требуется авторизация'})
    }

    if ( !card_name || !card_description || !card_price ) {
        return res.status(400).json({message: 'Все поля должны быть заполнены'});
    };

    try {
        const client = await pool.connect();

        try {
            const decodedToken = jwt.verify(token, SECRET_KEY);
            const userId = decodedToken.userId;

            const exitingCard = await client.query(
                'SELECT * FROM cards_table WHERE card_name = $2 AND user_id = $1', [userId, card_name]
            )
            if (exitingCard.rowCount > 0) {
                return res.status(400).json({message: `Карточка с таким названием уже существует: ${card_name}`})
            }

            const result = await client.query(
                'INSERT INTO cards_table ( user_id, card_name, card_description, card_price ) VALUES ($1, $2, $3, $4) RETURNING card_name',
                [userId, card_name, card_description, card_price]
            );
            const cardName = result.rows[0].card_name;
            const cardPrice = result.rows[0].card_price;
    
            res.status(201).json({ 
                message: 'Карточка успешно добавлена',
                cardName: cardName,
                cardPrice: cardPrice 
            });

        } catch(err) {
            console.error('Ошибка в регистрации пользователя из-за ошибки в запросе ' + err);
            res.status(500).send('Ошибка в регистрации пользователя из-за ошибки в запросе');
        }
    } catch (error) {
        console.error('Ошибка в регистрации пользователя из-за ошибки на сервере или в базе данных ' + error);
        res.status(500).send('Ошибка в регистрации пользователя из-за ошибки на сервере или в базе данных');
    }
});

// Вывод всех карточек пользователя
app.get('/getcards', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({message: 'Для данного действия требуется авторизация'})
    }

    try {
        const client = await pool.connect();

        try {
            const decodedToken = jwt.verify(token, SECRET_KEY);
            const userId = decodedToken.userId;

            const response = await client.query(
                'SELECT * FROM cards_table WHERE user_id = $1', [userId]
            )
            const result = response.rows;

            res.status(201).json({
                message: 'Просмотрите свои карточки', 
                cards: result
            });
        } catch (err) {
            console.error('Ошибка при выводе всех карточек пользователя из-за ошибки в запросе' + err);
            res.status(500).send('Ошибка при выводе всез карточек пользователя из-за ошибки в запросе');
        }
    } catch (err) {
        console.error('Ошибка при выводе всез карточек пользователя из-за ошибки на сервере или в базе данных' + error);
        res.status(500).send('Ошибка при выводе всез карточек пользователя из-за ошибки на сервере или в базе данных');
    }
});
