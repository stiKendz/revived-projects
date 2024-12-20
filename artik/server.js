import express from 'express';
import pg from 'pg';
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
    const {name, email, password} = req.body;
    const client = await pool.connect();

    if (!name || !email || !password) {
        return res.status(400).json({message: 'Все поля должны быть заполнены'});
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        // втавка данных в таблицу users_table
        const exitingUser = await client.query('SELECT user_id FROM users_table WHERE email = $1', [email]);
        if (exitingUser.rowCount > 0) {
            return res.status(409).json({message: 'Пользователь с таким адресом электронной почты уже зарегистрирован'})
        }
        const result = await client.query(
            'INSERT INTO users_table (name, email, password) VALUES ($1, $2, $3) RETURNING user_id',
            [name, email, hashedPassword]
        ); // возращает user_id
        // вcтака данных в таблицу roles_table, где role_name имеет default 'user'
        const userId = result.rows[0].user_id;
        if (email === 'admin@yandex.ru') {
            const role_name = 'admin';
            await client.query(
                'INSERT INTO roles_table (role_name, user_id) VALUES ($1, $2)',
                [role_name, userId]
            );
        } else {
            await client.query(
                'INSERT INTO roles_table (user_id) VALUES ($1)',
                [userId]
            );
        };
        // завершение транзацкии
        await client.query(
            'COMMIT'
        );
        res.status(201).json({
            message: 'Пользователь успешно зарегистрирован',
            userId: result.rows[0].user_id,
        });
    // обработка ошибки вставки данных, и отмена транзакции
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release()
    }
});

// Вход пользователя
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const client = await pool.connect();

    if (!email || !password) {
        return res.status(400).json({message: 'Все поля должны быть заполнены'});
    }

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
    } finally {
        client.release();
    }
});

// Оформение заказа
app.post('/addorder', async (req, res) => {
    const client = await pool.connect();
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
    } finally {
        client.release();
    }
});

// получение списка всех заказов
app.get('/getorders', async (req, res) => {
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
    } finally {
        client.release();
    }
});