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

// function showLoader() {
//     document.getElementById('loader').style.display = 'block'; // показать прелоадер
// }
// function hideLoader() {
//     document.getElementById('loader').style.display = 'none'; // скрыть прелоадер
// }

// // Пример использования
// showLoader();
// // После загрузки данных
// hideLoader();



if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(`Ваши координаты: ${lat}, ${lon}`);
        // Логика для автозаполнения города или адреса
    });
}


const revievForm = document.getElementById('review-form');
if (revievForm) {
    revievForm.addEventListener('submit', function(event) {
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
    })
}
// document.getElementById('review-form').addEventListener('submit', function(event) {
//     event.preventDefault(); // предотвращаем стандартное поведение формы

//     const name = document.getElementById('reviewer-name').value;
//     const rating = document.getElementById('review-rating').value;
//     const comment = document.getElementById('review-comment').value;

//     if (name && rating && comment) {
//         const reviewItem = document.createElement('div');
//         reviewItem.classList.add('review-item');
//         reviewItem.innerHTML = `
//             <h5>${name} <span class="review-rating">${'⭐'.repeat(rating)}</span></h5>
//             <p>${comment}</p>
//         `;

//         document.getElementById('reviews-list').appendChild(reviewItem);

//         // Очистка полей после отправки
//         document.getElementById('reviewer-name').value = '';
//         document.getElementById('review-rating').value = '';
//         document.getElementById('review-comment').value = '';
//     }
// });




    const openAuthModalButtons = document.querySelectorAll('#openAuthModal, #openAuthModal2');
    const authModal = document.getElementById('authModal');
    if (authModal) {
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
    }

    const submitRegistration = document.getElementById('submitRegistration');

    // Регистрация пользователя
    if (submitRegistration) {
        submitRegistration.addEventListener('click', async function(event) {
            event.preventDefault();
            const name = document.getElementById('reg-username').value;
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
    
            
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, email, password})
            });
            const data = await response.json();
                
            if (data) {
                registerModal.style.display = 'none';
            }
            console.log(data)
        });
    }
    
    const authForm = document.getElementById('authForm');
    // Вход пользователя
    if( authForm ) {
        authForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const email = document.getElementById('user-email').value;
            const password = document.getElementById('password').value;
        
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
                })
                const data = await response.json();
                
                if (data) {
                    authModal.style.display = 'none';
    
                    window.localStorage.setItem('token', data.token);
                    window.localStorage.setItem('email', data.email);
                    window.localStorage.setItem('role', data.role);
                } 
                console.log(data);
        });
    };
    

        const submitOrderButton = document.querySelector('.submit-order');
        // Оформление заказа
        if (submitOrderButton) {
            submitOrderButton.addEventListener('click', async () => {
                const user_id = 1; // Здесь вы можете подставить актуальный ID пользователя
                const company_name = document.querySelector('.company-name-input').value;
                const contact_name = document.querySelector('.contact-name-input').value;
                const phone = document.querySelector('.phone-input').value;
                const email = document.querySelector('.email-input').value;
                const cargo_name = document.querySelector('.cargo-name-input').value;
                const cargo_weight = document.querySelector('.cargo-weight-input').value;
                const dimensions = document.querySelector('.dimensions-input').value;
                const required_transport = document.querySelector('.required-transport-input').value;

                const response = await fetch('http://localhost:5000/addorder', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ user_id, company_name, contact_name, phone, email, cargo_name, cargo_weight, dimensions, required_transport })
                });

                const data = await response.json();

                // Вывод сообщения о результате
                alert(data.message);
            });
        }

        async function fetchAllOrders() {
            const response = await fetch('http://localhost:5000/getorders', {
                method: 'GET'
            });
        
            const data = await response.json();
            const orderCardContainer = document.querySelector('.order-card-container'); // Контейнер для заказов
        
            // Очистка контейнера перед добавлением новых заказов
            orderCardContainer.innerHTML = '';
        
            if (data && data.allOrders && data.allOrders.length > 0) {
                data.allOrders.forEach(order => {
                    const orderCard = document.createElement('div');
                    orderCard.className = 'order-card';
                    orderCard.innerHTML = `
                        <h3>Заказ № ${order.order_id}</h3>
                        <div class="order-details">
                            <p>Название компании: ${order.company_name}</p>
                            <p>Контактное лицо: ${order.contact_name}</p>
                            <p>Телефон: ${order.phone}</p>
                            <p>Email: ${order.email}</p>
                            <p>Название груза: ${order.cargo_name}</p>
                            <p>Вес груза: ${order.cargo_weight} кг</p>
                            <p>Размеры: ${order.dimensions}</p>
                            <p>Тип транспорта: ${order.required_transport}</p>
                        </div>
                    `;
                    orderCardContainer.appendChild(orderCard);
                });
            } else {
                orderCardContainer.innerHTML = '<p>Нет заказов.</p>';
            }
        }
        
        const showOrdersButton = document.querySelector('.show-orders-button');
        // Вызов функции для получения заказов по нажатию кнопки
        if (showOrdersButton) {
            showOrdersButton.addEventListener('click', fetchAllOrders);
        }
    // // Закрытие модальных окон при нажатии вне их
    // window.onclick = function(event) {
    //     if ( event.target == authModal || event.target == registerModal) {
    //         authModal.style.display = 'none';
    //         registerModal.style.display = 'none';
    //     }
    // };
