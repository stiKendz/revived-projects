document.addEventListener('DOMContentLoaded', () => {

    const openAuthModalButtons = document.querySelectorAll('#openAuthModal, #openAuthModal2');
    const authModal = document.getElementById('authModal');
    const closeAuthModalButton = authModal.querySelector('.close');
    
    const registerModal = document.getElementById('registerModal');
    const toggleToRegisterButton = document.getElementById('toggleToRegister');
    const closeRegisterModalButton = registerModal.querySelector('.close');

    // Открытие и закрытие модальных окон    
    openAuthModalButtons.forEach(button => {
        button.onclick = () => {
            authModal.style.display = 'block';
            registerModal.style.display = 'none'; // Закрыть окно регистрации при открытии входа
        };
    });

    closeAuthModalButton.onclick = () => {
        authModal.style.display = 'none';
    };

    toggleToRegisterButton.onclick = (e) => {
        e.preventDefault();
        authModal.style.display = 'none'; // Закрыть окно входа
        registerModal.style.display = 'block'; // Открыть окно регистрации
    };

    closeRegisterModalButton.onclick = () => {
        registerModal.style.display = 'none';
    };

    document.getElementById('submitRegistration').addEventListener('click', async function(event) {
        event.preventDefault();
        const name = document.getElementById('regUsername').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const data = await response.json();
            
        if (response.ok) {
            alert('Вы успешно зарегистрировались');
            registerModal.style.display = 'none';
        } else {
            alert('Ошибка при регистрации')
        }

        console.log(data);
    });
    
    // Вход
      document.getElementById('authForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const data = await response.json();
            
        if (response.ok) {
            alert('Вы успешно вошли в аккаунт');
            authModal.style.display = 'none';
            document.getElementById('openAuthModal').style.display = 'none'; // Скрыть кнопку входа
            document.getElementById('userProfile').style.display = 'block'; // Показать профиль

            window.localStorage.setItem('token', data.token);
            window.localStorage.setItem('email', data.email);
            window.localStorage.setItem('role', data.role);

            
        } else {
            alert('Ошибка при входе в аккаунт');
        }

        console.log(data);
    });
    
    // Просмотр профиля пользователя
    const profileContainer = document.getElementById('profile');
    async function loadProfile(){
        const name = document.querySelector('.user-name-output');
        const surname = document.querySelector('.user-surname-output');
        const email = document.querySelector('.user-email-output');
        const about_user = document.querySelector('.about-me-output');
        const phone_number = document.querySelector('.phone-number-output');
        const usernameSpan = document.getElementById('profileUsername');

        const token = window.localStorage.getItem('token');

        const response = await fetch('http://localhost:5000/userinfo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json();

        if(data && data.userInfo && data.userInfo.length) {
            const userInfo = data.userInfo[0];

            usernameSpan.textContent = userInfo.name ?? 'Нет данных';

            name.innerHTML = `Имя: <p>${userInfo.name ?? 'Нет данных'}</p>`;
            surname.innerHTML = `Фамилия: <p>${userInfo.surname ?? 'Нет данных'}</p>`;
            email.innerHTML = `Адрес электронной почты: <p>${userInfo.email ?? 'Нет данных'}</p>`;
            about_user.innerHTML = `Обо мне: <p>${userInfo.about_user ?? 'Нет данных'}</p>`;
            phone_number.innerHTML = `Номер телефона: <p>${userInfo.phone_number ?? 'Нет данных'}</p>`;
        } 
        console.log(data);
    }

    // Обновление профиля пользователя
    document.getElementById('saveProfile').addEventListener('click', async () => {
        const name = document.getElementById('user-name').value;
        const surname = document.getElementById('user-surname').value;
        const email = document.getElementById('user-email').value;
        const about_user = document.getElementById('about-me').value;
        const phone_number = document.getElementById('phone-number').value;
        const usernameSpan = document.getElementById('profileUsername');

        const token = window.localStorage.getItem('token');

        const response = await fetch('http://localhost:5000/updateuser', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({name, surname, email, about_user, phone_number})
        })
        const data = await response.json();

        console.log(data);
    })

    window.onclick = function(event) {
        if ( event.target == authModal || event.target == registerModal) {
            authModal.style.display = 'none';
            registerModal.style.display = 'none';
        }
    };

    document.getElementById('openAuthModal').addEventListener('click', function() {
        document.getElementById('authModal').style.display = 'block';
    });
    
    // кнопка выхода из аккаунта
    document.getElementById('logoutButton').addEventListener('click', function() {
        document.getElementById('userProfile').style.display = 'none';
        document.getElementById('profile').style.display = 'none';
    
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('role');
        
    
        alert('Вы успешно вышли из аккаунта');
    });

    // добавление карточки
    document.getElementById('addCardButton').addEventListener('click', async () => {
        const addCarButton = document.getElementById('addCardButton');
        const card_name = document.getElementById('cardTitle').value;
        const card_price = document.getElementById('cardPrice').value;
        const card_description = document.getElementById('cardText').value;

        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:5000/addcard', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({card_name, card_price, card_description})
        });
        const data = await response.json();

        console.log(data);
    });

    // просмотр всех карточек
    document.getElementById('showCardButton').addEventListener('click', async () => {
        const cardsContainer = document.querySelector('.card-container');
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:5000/getcards', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        if(data && data.cards && data.cards.length > 0) {
            cardsContainer.innerHTML = '';

            data.cards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');

                cardElement.innerHTML = `
                    <h3>Название: ${card.card_name}</h3>
                    <p>Описание: ${card.card_description}</p>
                    <p>Цена: ${card.card_price}.p</p>
                `;
                cardsContainer.appendChild(cardElement);
            });
        } else {
            cardsContainer.innerHTML = `<p>Нет доступных карточек.</p>`;
        }
        
        console.log(data);
    });
    
    // Пример функции для успешного входа
    function onLoginSuccess(username) {
        document.getElementById('profileUsername').innerText = username;
        document.getElementById('userProfile').style.display = 'block';
        document.getElementById('profile').style.display = 'block';
    }
    
    // Обработчик для кнопки "Профиль"
    document.getElementById('userProfile').addEventListener('click', function() {
        var profileContainer = document.getElementById('profile');
        if (profileContainer.style.display === 'none') {
            profileContainer.style.display = 'block';
        } else {
            profileContainer.style.display = 'none';
        }
    });
    
    
    // Закрытие модальных окон при нажатии вне их
    window.onclick = function(event) {
        if ( event.target == authModal || event.target == registerModal) {
            authModal.style.display = 'none';
            registerModal.style.display = 'none';
        }
    };

    // отображение каталога, профиля пользователя
    const checkAuthorize = () => {
        const logoutButton = document.getElementById('logoutButton');
        const logInButton = document.getElementById('log-in-button');

        const token = window.localStorage.getItem('token');
        const catalogue = document.getElementById('catalog');
        const navCatalogue = document.getElementById('nav-catalog');
        const profileWindow = document.getElementById('profile');
        
        if (token && token !== 'undefined') {
            catalogue ? catalogue.style.display = 'block' : null;
            navCatalogue ? navCatalogue.style.display = 'block' : null;
            profileWindow ? profileWindow.style.display = 'block': null;

            loadProfile();
        } else {
            catalogue ? catalogue.style.display = 'none' : null;
            navCatalogue ? navCatalogue.style.display = 'none' : null;
            profileWindow ? profileWindow.style.display = 'none': null;
        }
        
        logoutButton.addEventListener('click', () => {
            window.location.reload()
        });
        logInButton.addEventListener('click', () => {
            setTimeout(() => window.location.reload(), 1000)
        });
    }   
    window.addEventListener('DOMContentLoaded', checkAuthorize)
}); 




