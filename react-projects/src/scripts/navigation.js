document.addEventListener('DOMContentLoaded', () => {
    const toLoginButton = document.querySelector('.login-button');
    const toRegistrationButton = document.querySelector('.to-registration-button');
    const logInSubmitButton = document.getElementById('log-in-button');
    const closeButtons = document.querySelectorAll('.close');

    const loginWindow = document.getElementById('authModal');
    const registerModal = document.getElementById('registerModal');

    // Функция для открытия модального окна
    function openModal(modal) {
        modal.style.display = 'block';
    }

    // Функция для закрытия модального окна
    function closeModal(modal) {
        modal.style.display = 'none';
    }

    // Открытие окна входа
    if (toLoginButton) {
        toLoginButton.addEventListener('click', () => {
            closeModal(registerModal); // Закрыть окно регистрации, если оно открыто
            openModal(loginWindow);
        });
    }

    // Показать окно регистрации при нажатии на кнопку "Зарегистрироваться"
    if (toRegistrationButton) {
        toRegistrationButton.addEventListener('click', () => {
            closeModal(loginWindow); // Закрыть окно входа, если оно открыто
            openModal(registerModal);
        });
    }

    // Закрытие модальных окон при клике на "X"
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(loginWindow);
            closeModal(registerModal);
        });
    });

    // Закрытие модальных окон при клике вне их содержимого
    window.addEventListener('click', event => {
        if (event.target === loginWindow) {
            closeModal(loginWindow);
        } else if (event.target === registerModal) {
            closeModal(registerModal);
        }
    });

    // Если необходимо, добавить дополнительные действия при отправке формы
    if (logInSubmitButton) {
        logInSubmitButton.addEventListener('click', (event) => {
            event.preventDefault(); // Предотвращаем стандартное поведение формы
            // Обработка логина
        });
    }
});
