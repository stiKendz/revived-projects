function calculateCost() {
    const cityFrom = document.getElementById('cityFrom').value;
    const cityTo = document.getElementById('cityTo').value;

    const distanceMap = {
        'Москва': { 'Санкт-Петербург': 700, 'Казань': 800, 'Екатеринбург': 1400, 'Нижний Новгород': 450, 'Новосибирск': 3000, 'Челябинск': 1700 },
        'Санкт-Петербург': { 'Москва': 700, 'Казань': 1130, 'Екатеринбург': 2200, 'Нижний Новгород': 1200, 'Новосибирск': 3500, 'Челябинск': 2500 },
        'Казань': { 'Москва': 800, 'Санкт-Петербург': 1130, 'Екатеринбург': 600, 'Нижний Новгород': 400, 'Новосибирск': 2400, 'Челябинск': 800 },
        'Екатеринбург': { 'Москва': 1400, 'Санкт-Петербург': 2200, 'Казань': 600, 'Нижний Новгород': 1000, 'Новосибирск': 1700, 'Челябинск': 200 },
        'Нижний Новгород': { 'Москва': 450, 'Санкт-Петербург': 1200, 'Казань': 400, 'Екатеринбург': 1000, 'Новосибирск': 2600, 'Челябинск': 1100 },
        'Новосибирск': { 'Москва': 3000, 'Санкт-Петербург': 3500, 'Казань': 2400, 'Екатеринбург': 1700, 'Нижний Новгород': 2600, 'Челябинск': 2300 },
        'Челябинск': { 'Москва': 1700, 'Санкт-Петербург': 2500, 'Казань': 800, 'Екатеринбург': 200, 'Нижний Новгород': 1100, 'Новосибирск': 2300 }
    };

    if (cityFrom && cityTo) {
        const distance = distanceMap[cityFrom][cityTo];
        if (distance) {
            const cost = distance * 15; // Расчет стоимости (например, 1 рублей за километр)
            document.getElementById('result').innerText = `Стоимость доставки из ${cityFrom} в ${cityTo}: ${cost} рублей`;
        } else {
            document.getElementById('result').innerText = 'Расстояние не определено.';
        }
    } else {
        document.getElementById('result').innerText = 'Пожалуйста, выберите оба города.';
    }
}
function scrollToSupport() {

document.getElementById('support-block').scrollIntoView({
behavior: 'smooth' 
});
}
//Валадиция формы обратной связи

document.getElementById('request-form').addEventListener('submit', function(event) {
    let isValid = true;
    const requiredFields = [
        'company-name',
        'contact-name',
        'phone',
        'cargo-name',
        'weight',
        'dimensions',
        'transport'
    ];

    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value) {
            isValid = false;
            input.classList.add('error'); // добавляем класс для выделения ошибки
        } else {
            input.classList.remove('error');
        }
    });

    if (!isValid) {
        event.preventDefault(); // отменяем отправку формы
        alert("Пожалуйста, заполните все обязательные поля.");
    }
});



document.getElementById('weight').addEventListener('input', calculateCost);



const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 200);
    });
}); 



//статус заказов

function notifyUser(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;

    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000); // исчезнет через 3 секунды
}

// Пример вызова
notifyUser("Ваш заказ был успешно оформлен!");




function showLoader() {
    document.getElementById('loader').style.display = 'block'; // показать прелоадер
}
function hideLoader() {
    document.getElementById('loader').style.display = 'none'; // скрыть прелоадер
}

// Пример использования
showLoader();
// После загрузки данных
hideLoader();



if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(`Ваши координаты: ${lat}, ${lon}`);
        // Логика для автозаполнения города или адреса
    });
}



document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault(); // предотвращаем стандартное поведение формы

    const name = document.getElementById('reviewer-name').value;
    const rating = document.getElementById('review-rating').value;
    const comment = document.getElementById('review-comment').value;

    if (name && rating && comment) {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `
            <h5>${name} <span class="review-rating">${'⭐'.repeat(rating)}</span></h5>
            <p>${comment}</p>
        `;

        document.getElementById('reviews-list').appendChild(reviewItem);

        // Очистка полей после отправки
        document.getElementById('reviewer-name').value = '';
        document.getElementById('review-rating').value = '';
        document.getElementById('review-comment').value = '';
    }
});



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

    // // Простой фейковый вход и регистрация
    // document.getElementById('authForm').addEventListener('submit', function(event) {
    //     event.preventDefault();
    //     const username = document.getElementById('username').value;
    //     const password = document.getElementById('password').value;

    //     if (username && password) {
    //         // Логика проверки данных
    //         alert(`Вход как: ${username}`);
    //         authModal.style.display = 'none';
    //     } else {
    //         alert('Пожалуйста, заполните все поля.');
    //     }
    // });

    document.getElementById('submitRegistration').addEventListener('click', async function(event) {
        event.preventDefault();
        const regUsername = document.getElementById('regUsername').value;
        const regEmail = document.getElementById('regEmail').value;
        const regPassword = document.getElementById('regPassword').value;

        
        if (regUsername && regEmail && regPassword) {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: regUsername,
                    email: regEmail,
                    password: regPassword
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                alert(`Вы успешно зарегистрировались под именем ${regUsername}`);
                registerModal.style.display = 'none';
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } else {
            alert('Пожалуйста, заполните все поля.');
        }
    });
    
    // Пример с использованием fetch API для входа
    document.getElementById('authForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        if (username && password) {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                authModal.style.display = 'none';
            } else {
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        } else {
            alert('Пожалуйста, заполните все поля.');
        }
    });

    // Закрытие модальных окон при нажатии вне их
    window.onclick = function(event) {
        if ( event.target == authModal || event.target == registerModal) {
            authModal.style.display = 'none';
            registerModal.style.display = 'none';
        }
    };
}); 
