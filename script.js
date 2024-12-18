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

            visibleCatalogue();
        } else {
            alert('Ошибка при входе в аккаунт');
        }

        console.log(data);
    });
    
    window.onclick = function(event) {
        if ( event.target == authModal || event.target == registerModal) {
            authModal.style.display = 'none';
            registerModal.style.display = 'none';
        }
    };
}); 

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
    visibleCatalogue();

    alert('Вы успешно вышли из аккаунта');
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

// отображение каталога
const visibleCatalogue = () => {
    const token = window.localStorage.getItem('token');
    const catalogue = document.getElementById('catalog');
    const navCatalogue = document.getElementById('nav-catalog');

    if (token && token !== 'undefined') {
        catalogue ? catalogue.style.display = 'block' : null;
        navCatalogue ? navCatalogue.style.display = 'block' : null;
    } else {
        catalogue ? catalogue.style.display = 'none' : null;
        navCatalogue ? navCatalogue.style.display = 'none' : null;
    }
}

window.addEventListener('DOMContentLoaded', visibleCatalogue)


