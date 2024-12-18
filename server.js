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
