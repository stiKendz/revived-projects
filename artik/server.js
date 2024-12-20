import express from 'express';
import pg from 'pg';
import { hash, compare } from 'bcrypt';
import { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Загружаем переменные окружения из .env файла
config();

const app = express();
const PORT = process.env.PORT || 5000;

const { Pool } = pg;
const SECRET_KEY = 'my_secret_key';

const pool = new Pool({
    user: 'postgres',
    database: 'artemdb',
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
    const { name, email, password } = req.body;

    // Хэшируем пароль с помощью bcrypt
    const hashedPassword = await hash(password, 10);

    try {
        const client = await pool.connect();

        if (!name || !email || !password) {
            return res.status(400).json({message: 'Все поля должны быть заполнены'});
        };

        const result = await client.query(
            'INSERT INTO users_table (name, email, password) VALUES ($1, $2, $3) RETURNING user_id',
            [name, email, hashedPassword]
        );

        res.status(201).json({ 
            message: 'Пользователь успешно зарегистрирован',
            userId: result.rows[0].user_id
        });

    } catch (error) {
        console.error('Ошибка в регистрации пользователя' + error);
        res.status(500).send('Ошибка при регистрации');
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

// Оформение заказа
app.post('/addorder', async (req, res) => {
    const {
        user_id,
        company_name,
        contact_name,
        phone,
        email,
        cargo_name,
        cargo_weight,
        dimensions,
        required_transport
    } = req.body;

    const orderParams = {
        user_id,
        company_name,
        contact_name,
        phone,
        email,
        cargo_name,
        cargo_weight,
        dimensions,
        required_transport
    };

    for (let key in orderParams) {
        if (!orderParams[key]) {
            return res.status(400).json({ message: 'Все поля должны быть заполнены' });
        }
    }

    try {
        const client = await pool.connect();

        try {
            const result = await client.query(
                'INSERT INTO orders_table (user_id, company_name, contact_name, phone, email, cargo_name, cargo_weight, dimensions, required_transport) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING order_id',
                [user_id, company_name, contact_name, phone, email, cargo_name, cargo_weight, dimensions, required_transport]
            );
            const orderId = result.rows[0].order_id;

            res.status(201).json({
                message: 'Заказ успешно оформлен',
                orderId: orderId
            });
        } catch (err) {
            console.error(`Произошла ошибка при добавлении заказа: ${err.message}`);
            res.status(500).json({ message: 'Ошибка при добавлении заказа из-за ошибки в запросе' });
        }
    } catch (err) {
        console.error(`Произошла ошибка при добавлении заказа: ${err.message}`);
        res.status(500).json({ message: 'Произошла ошибка при добавлении заказа из-за ошибки на сервере' });
    }
});

// получение списка всех заказов
app.get('/getorders', async (req, res) => {
    try {
        const client = await pool.connect();

        try {
            const response = await client.query(
                'SELECT * FROM orders_table'
            );

            const result = response.rows;

            res.json({
                message: 'Все заказы',
                allOrders: result
            });
        } catch (err) {
            console.log(`Ошибка вывода всех заказов: ${err.message}`);
            res.status(500).json({ message: 'Ошибка вывода всех заказов на стороне запроса' });
        }
    } catch (err) {
        console.log(`Ошибка вывода всех заказов: ${err.message}`);
        res.status(500).json({ message: 'Ошибка вывода всех заказов на стороне сервера' });
    }
});