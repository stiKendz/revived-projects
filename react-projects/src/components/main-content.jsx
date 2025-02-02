import '../styles/styles.css'

export default function MainContentComponent() {
    function closeAuthModal() {
        const authModal = document.getElementById('authModal');
        authModal.style.display = 'none';
    }
    function openRegistrationModal() {
        const authModal = document.getElementById('authModal');
        authModal.style.display = 'none';

        const registrationModal = document.getElementById('registerModal');
        registrationModal.style.display = 'block';
    }
    function closeRegistrationModal() {
        const registrationModal = document.getElementById('registerModal');
        registrationModal.style.display = 'none';
    }

    return (
        <>
            <div id="authModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={ closeAuthModal }>&times;</span>
                    <h2 id="modalTitle">Вход</h2>
                    <form id="authForm">
                        <input type="text" id="username" placeholder="Email пользователя" required />
                        <input type="password" id="password" placeholder="Пароль" required />
                        <button id="log-in-button" type="button">Подтвердить</button>
                        <p id="toggleAuthText">У вас нет аккаунта?
                            <button type="button" className="to-registration-button in-nav" onClick={ openRegistrationModal }>
                                Зарегистрироваться
                            </button>
                        </p>
                    </form>
                </div>
            </div>
            <div id="registerModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={ closeRegistrationModal }>&times;</span>
                    <h2>Регистрация</h2>
                    <form id="registerForm">
                        <input type="text" id="regUsername" placeholder="Имя пользователя" required />
                        <input type="email" id="regEmail" placeholder="Email" required />
                        <input type="password" id="regPassword" placeholder="Пароль" required />
                        <button type="submit" id="submitRegistration" className="registraiton-button in-nav">Зарегистрироваться</button>
                    </form>
                </div>
            </div>
            <div className="container" id="profile" style={{display: 'none'}}>
                <h2>Профиль пользователя</h2>
                <p>Добро пожаловать, <span id="profileUsername"></span>!</p>
                <div className="user-name-output"></div>
                <input type="text" id="user-name" placeholder="Измените ваше имя" />
                <br></br>
                <div className="user-surname-output"></div>
                <input type="text" id="user-surname" placeholder="Измените вашу фамилию" />
                <br></br>
                <div className="user-email-output"></div>
                <input type="email" id="user-email" placeholder="Измените вашу электронную почту" />
                <br></br>
                <div className="about-me-output"></div>
                <textarea id="about-me" placeholder="Измените информацию о себе"></textarea>
                <br></br>
                <div className="phone-number-output"></div>
                <input type="text" id="phone-number" placeholder="Измените свой номер телефона" />
                <br></br>
                <button id="saveProfile">Сохранить профиль</button>
                <button id="logoutButton">Выйти</button>
            </div>
            <section>
                <div className="content">
                    <div className="text-block">
                        <p className="text-black1">Молодые копят,</p>
                        <p className="text-pink"> а ты им помогаешь</p>
                        <p className="text-black">делать покупки</p>
                        <p className="text-pink2">с WeddingBox!</p>
                        <button type="button" className="start-button">Начать</button>
                    </div>
                    <div className="image-block">
                        <div className="circle"></div>
                        <img
                            src="output-onlinegiftools.gif"
                            height="200px"
                            width="200px"
                        />
                    </div>
                </div>
                <hr className="divider" />
                <div className="description">
                    <h2>WeddingBox</h2>
                    <p className="ds1">Простой сервис, чтобы накопить деньги </p>
                    <p className="ds2">и</p>
                    <p className="ds3">воплотить свою мечту в жизнь!</p>
                </div>
                <hr className="divider" />
                <div id="about" className="additional-content">
                    <div className="image-float-block">
                        <img src="bag.gif" alt="Floating Image" />
                    </div>
                    <div className="circle2"></div>
                    <div className="text-float-block">
                        <p>Мы создали понятный и лёгкий сервис в использовании и добавили в него самое необходимое, чтобы любой человек мог быстрее достигать желаемого благодаря накоплениям.</p>
                    </div>
                </div>
                <hr className="divider" />
                <div className="user-section">
                    <p className="text-pink centered-text">
                        Пользователи WeddingBox собирают на:
                    </p>
                </div>
                <div className="image-grid">
                    <div className="image-item">
                        <img src="phone.gif" alt="Смартфоны" />
                        <p>Смартфоны</p>
                    </div>
                    <div className="image-item">
                        <img src="car.gif" alt="Личный транспорт" />
                        <p>Личный транспорт</p>
                    </div>
                    <div className="image-item">
                        <img src="plane.gif" alt="Путешествия" />
                        <p>Путешествия</p>
                    </div>
                    <div className="image-item">
                        <img src="other.gif" alt="Другое" />
                        <p>Другое</p>
                    </div>
                </div>
                <hr className="divider" />
                <div className="middle-text">
                    <h2>Функционал продуман, чтобы вам было комфортно собирать</h2>
                </div>
                <div id="services" className="features">
                    <div className="feature">
                        <img src="click.gif" alt="Отмечай свою цель" />
                        <h3>Отмечай свою цель</h3>
                    </div>
                    <div className="feature">
                        <img src="notes.gif" alt="Введите подробное описание" />
                        <h3>Вводи подробное описание</h3>
                    </div>
                    <div className="feature">
                        <img src="subm.gif" alt="Добавляй что хочешь" />
                        <h3>Добавляй что хочешь</h3>
                    </div>
                    <div className="feature">
                        <img src="rec.gif" alt="Деньги будут собираться" />
                        <h3>Собирай деньги и наблюдай за процессом</h3>
                    </div>
                </div>
                <div id="catalog" className="catalog">
                    <h2>Каталог WeddingBox</h2>
                    <button id="createCardButton" className="create-card-button">Создать карточку</button>
                    <button id="showCardButton" className="show-card-button">Показать карточки</button>
                    <pre className="card-container"></pre>
                </div>
                <div id="modal" className="modal">
                    <div className="modal-content">
                        <span className="close-button">&times;</span>
                        <h2>Создать карточку</h2>
                        <label htmlFor="cardTitle">Название товара:</label>
                        <input type="text" id="cardTitle" placeholder="Введите название товара" required />
                        <label htmlFor="cardPrice">Цена товара:</label>
                        <input type="text" id="cardPrice" placeholder="Введите цену товара" required />
                        <label htmlFor="cardImageUrl">Описание товара:</label>
                        <input type="text" id="cardText" placeholder="Введите краткое описание товара" required />
                        <label htmlFor="cardImageUrl">URL изображения:</label>
                        <input type="text" id="cardImageUrl" placeholder="Введите URL изображения" required />
                        <button id="addCardButton">Добавить карточку</button>
                    </div>
                </div>
                <div id="paymentModal" className="modal" style={{ display: 'none' }}>
                    <div className="modal-content">
                        <span className="close-button">&times;</span>
                        <h2>Оплата товара</h2>
                        <form id="paymentForm">
                            <label htmlFor="cardholderName">ФИО владельца карты:</label>
                            <input type="text" id="cardholderName" placeholder="Введите ваше имя" required />
                            <br />
                            <label htmlFor="cardNumber">Номер карты:</label>
                            <input type="text" id="cardNumber" placeholder="XXXX-XXXX-XXXX-XXXX" required pattern="\d{4}-\d{4}-\d{4}-\d{4}" />
                            <br />
                            <label htmlFor="expiryDate">Срок действия:</label>
                            <input type="text" id="expiryDate" placeholder="MM/YY" required />
                            <br />
                            <label htmlFor="cvv">CVV:</label>
                            <input type="text" id="cvv" placeholder="secret" required pattern="\d{3}" />
                            <br />
                            <button type="submit">Подтвердить оплату</button>
                        </form>
                    </div>
                </div>
                <div className="parent">
                    <div className="son">
                        <div className="container">
                            <div className="left">
                                <div className="img"></div>
                                <div className="info">
                                    <ul>
                                        <li></li>
                                        <li>Сбор</li>
                                        <li>$500</li>
                                    </ul>
                                    <ul>
                                        <li>времени осталось</li>
                                        <li>25 дней</li>
                                        <li>Требуется собрать</li>
                                        <li>$50000</li>
                                    </ul>
                                </div>
                                <div className="circle4">
                                    <div className="circle5">
                                        <span>Собрано</span>
                                        <span>49,8%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="right">
                                <div className="up">
                                    <ul>
                                        <li>
                                            <h3>Закидывай молодым монету</h3>
                                        </li>
                                        <li>Заполни поля ниже </li>
                                    </ul>
                                </div>
                                <div className="down">
                                    <div className="payment">
                                        <form>
                                            <div className="form-group">
                                                <label className="cardNumber">Номер карты</label>
                                                <input type="number" className="form-control1" />
                                            </div>
                                            <div className="form-group1" id="expiration-date">
                                                <div className="lab">
                                                    <label>Дата выпуска</label>
                                                    <select>
                                                        <option value="01">Январь</option>
                                                        <option value="02">Февраль</option>
                                                        <option value="03">Март</option>
                                                        <option value="04">Апрель</option>
                                                        <option value="05">Май</option>
                                                        <option value="06">Июнь</option>
                                                        <option value="07">Июль</option>
                                                        <option value="08">Август</option>
                                                        <option value="09">Сентябрь</option>
                                                        <option value="10">Октябрь</option>
                                                        <option value="11">Ноябрь</option>
                                                        <option value="12">Декабрь</option>
                                                    </select>
                                                    <select className="year">
                                                        <option value="16">2016</option>
                                                        <option value="17">2017</option>
                                                        <option value="18">2018</option>
                                                        <option value="19">2019</option>
                                                        <option value="20">2020</option>
                                                        <option value="21">2021</option>
                                                        <option value="22">2022</option>
                                                        <option value="23">2023</option>
                                                        <option value="24">2024</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group CVV">
                                                <label htmlFor="cvv">CVV</label>
                                                <input type="number" className="form-control" id="cvvv" />
                                            </div>
                                            <div className="form-group btn" id="pay-now">
                                                <button type="submit" className="btn btn-default" id="confirm-purchase">Donate</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>;
        </>
    )
}